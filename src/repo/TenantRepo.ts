import { database } from "../core/service/database";
import type { REST } from "../REST";

export default class TenantRepo {
  static async createTenant(tenant: REST.POST.Signup) {
    try {
      const [result] = await database.execute(
        `
                insert into tenant (name, email, password) values (?, ?, ?)`,
        [tenant.name, tenant.email, tenant.password]
      );
      return result as {
        affectedRows: number;
      };
    } catch {
      return {
        affectedRows: 0,
      };
    }
  }

  static async getTenantByEmail(email: string) {
    try {
      const [result] = await database.execute(
        `select * from tenant where email = ?`,
        [email]
      );
      const tenant = (result as REST.GET.Tenant[])[0];
      if (tenant) {
        return tenant;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  }
}
