import express from "express";
import ProductRepo from "../repo/ProductRepo";
import type { REST } from "../REST";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await ProductRepo.getBatches();
  return res.json({
    batches: data,
  });
});
router.get("/active", async (req, res) => {
  const data = await ProductRepo.getActiveBatches();
  return res.json(data);
});
router.get("/expired", async (req, res) => {
  const data = await ProductRepo.getExpiredBatches();
  return res.json(data);
});
router.get("/low-stock", async (req, res) => {
  const data = await ProductRepo.getLowStockBatches();
  return res.json(data);
});
router.get("/:id", (req, res) => {
  return res.json({
    batch: {
      id: req.params.id,
    },
  });
});
router.post("/", async (req, res) => {
  const batch: REST.POST.Batch = req.body;
  try {
    const result = await ProductRepo.createBatch(batch);
    return res.json(result);
  } catch (e: any) {
    return res.json({
      message: e.message,
    });
  }
});
export const batchRouter = router;
