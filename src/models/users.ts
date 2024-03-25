import bcrypt from "bcrypt";
import Client from "../database";

export type UserInfo = {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
};

export type User = {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  id: number;
};

export class UserStore {
  index = async (): Promise<User[]> => {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "select * from users";
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`Can not get users ${err}`);
    }
  };

  show = async (id: string): Promise<User> => {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "select * from users where id=($1)";
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  };

  create = async (u: UserInfo): Promise<User> => {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (username, password, firstname, lastname) VALUES($1, $2, $3, $4) RETURNING *";
      const hash = bcrypt.hashSync(
        u.password + process.env.BCRYPT_PASSWORD,
        parseInt(process.env.SALT_ROUNDS!)
      );

      const result = await conn.query(sql, [
        u.username,
        hash,
        u.firstname,
        u.lastname,
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  };

  authenticate = async (
    username: string,
    password: string
  ): Promise<User | null> => {
    const conn = await Client.connect();
    const sql = "SELECT username, password FROM users WHERE username=($1)";
    const result = await conn.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (
        bcrypt.compareSync(
          password + process.env.BCRYPT_PASSWORD,
          user.password
        )
      ) {
        return user;
      }
    }

    return null;
  };
}
