import e from "express";
import { batchRouter } from "./batch";
import { tenantRouter } from "./tenent";

const router = e.Router();

router.use("/batches", batchRouter);
router.use("/tenant", tenantRouter);

export default router;
