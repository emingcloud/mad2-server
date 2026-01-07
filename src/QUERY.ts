export namespace QUERY {
  export const CreateBatch = `
      insert into batch (id, name, quantity, unit_price, mfg, exp) values (?, ?, ?, ?, ?, ?)
      `;
}
