import express from "express";
import ProductRepo from "../repo/ProductRepo";
import type { REST } from "../REST";
import qr from "qrcode";
import { database } from "../core/service/database";
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await ProductRepo.getBatches();
  return res.json({
    batches: data,
  });
});
router.get("/qr", async (req, res) => {
  const query = req.query;
  qr.toDataURL(query.batch_id as any, function (err, url) {
    return res.json({
      qr: url,
    });
  });
});
router.get("/active", async (req, res) => {
  const data = await ProductRepo.getActiveBatches();
  return res.json(data);
});
router.post("/scan", async (req, res) => {
  const [rows] = await database.query(
    "select quantity from batch where id = ?",
    [req.body.id]
  );
  const batches = rows as any;
  console.log(batches[0].quantity - 1, req.body.id);
  await database.query("update batch set quantity = ? where id = ?", [
    batches[0].quantity - 1,
    req.body.id,
  ]);
  res.json({});
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
