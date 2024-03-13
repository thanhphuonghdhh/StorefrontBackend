// @ts-ignore
import Client from "../database";

export type Weapon = {
    id: Number;
    name: string;
    type: string;
    weight: number;
}

export class NewWeaponStore {
    async index(): Promise<Weapon[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'select * from new_weapons';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (err) {
            throw new Error(`Can not get weapon ${err}`);
        }
    }
}