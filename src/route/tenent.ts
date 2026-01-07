import e from "express";
import hashPassword from "../helper/hashPassword";
import TenantRepo from "../repo/TenantRepo";
import type { REST } from "../REST";
import verifyPassword from "../helper/verifyPassword";
import generateToken from "../helper/generateToken";

const router = e.Router();

router.post("/signup", async (req, res) => {
  const tenant: REST.POST.Signup = req.body;
  const hashed = await hashPassword(tenant.password);
  const result = await TenantRepo.createTenant({ ...tenant, password: hashed });
  if (result.affectedRows > 0) {
    return res.json({
      success: true,
    });
  } else {
    return res.json({
      success: false,
    });
  }
});
router.post("/login", async (req, res) => {
  const variables: REST.POST.Login = req.body;
  const tenant = await TenantRepo.getTenantByEmail(variables.email);
  if (tenant) {
    const verified = await verifyPassword(variables.password, tenant.password);
    if (verified) {
      const token = generateToken({ tenant: tenant });
      return res.json({
        success: true,
        message: "logged in",
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "password incorrect",
      });
    }
  } else {
    return res.json({
      success: false,
      message: "email has not been registered",
    });
  }
});

export const tenantRouter = router;
