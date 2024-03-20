import Client from "../database";

export type Order = {
  id: number;
  status: string;
  user_id: number;
};

export class OrderStore {
  getCurrentOrderByUser = async (userId: string) => {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "select users.id as user_id, username, orders.id as order_id, status from orders inner join users on orders.user_id = ($1)";
      const res = await conn.query(sql, [userId]);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`Cannot get order ${err}`);
    }
  };

  getCompletedOrderByUser = async (userId: string) => {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
      "select users.id as user_id, username, orders.id as order_id, status " +
      "from orders inner join users on orders.user_id = ($1) and orders.status = 'complete'";
      const res = await conn.query(sql, [userId]);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`Cannot get order ${err}`);
    }
  };
}
