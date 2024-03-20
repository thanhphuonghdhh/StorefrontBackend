import Client from "../database";
import { Order } from "./orders";

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type ProductInfo = {
  name: string;
  price: number;
};

export class ProductStore {
  index = async (): Promise<Product[]> => {
    try {
      // @ts-ignore
      const conn = await Client.connect();   
      const sql = "select * from products";
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`Can not get products ${err}`);
    }
  };

  show = async (id: string) => {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "select * from products where id=($1)";
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Cannot get product ${err}`);
    }
  };

  create = async (product: ProductInfo): Promise<Product> => {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
      const res = await conn.query(sql, [product.name, product.price]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`unable create product (${product.name}): ${err}`);
    }
  };

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
