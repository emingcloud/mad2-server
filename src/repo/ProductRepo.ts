import { database } from "../core/service/database";
import type { REST } from "../REST";
import { QUERY } from "../QUERY";
export default class ProductRepo {
  static async getBatches() {
    const [rows] = await database.execute("select * from batch");
    return rows as REST.GET.Batch[];
  }
  static async getActiveBatches() {
    const [rows] = await database.execute(
      `select * from batch where status = ? `,
      ["ACTIVE"]
    );
    return rows as REST.GET.Batch[];
  }
  static async getExpiredBatches() {
    const [rows] = await database.execute(
      `select * from batch where status = ? `,
      ["EXPIRED"]
    );
    return rows as REST.GET.Batch[];
  }
  static async getLowStockBatches() {
    const [rows] = await database.execute(
      `select * from batch where quantity < 10`
    );
    return rows as REST.GET.Batch[];
  }
  static async createBatch(data: any): Promise<REST.GET.Batch> {
    const batch: REST.POST.Batch = {
      name: data.name,
      quantity: data.quantity,
      unit_price: data.unit_price,
      mfg: new Date(data.mfg),
      exp: new Date(data.exp),
    };
    const id = `${
      batch.name
    }${batch.exp.getDate()}${batch.exp.getMonth()}${batch.exp.getFullYear()}`;
    try {
      await database.execute(QUERY.CreateBatch, [
        id,
        batch.name,
        batch.quantity,
        batch.unit_price,
        batch.mfg,
        batch.exp,
      ]);

      return {
        ...batch,
        id,
        status: "ACTIVE",
      };
    } catch (err: any) {
      if (err.code === "ER_DUP_ENTRY") {
        console.log(err);
        throw Error("batch exist");
      }
      throw Error("cannot create batch");
    }
  }
}
