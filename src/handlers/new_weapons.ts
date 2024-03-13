import { Application, Request, Response } from "express";
import { NewWeaponStore } from "../models/new_weapons";
import { verify } from "jsonwebtoken";

const store = new NewWeaponStore()

const index = async (_req: Request, res: Response) => {
    const weapons = await store.index();
    res.json(weapons);
}

const create = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization 
        const token = authorizationHeader!.split(' ')[1]
        console.log(authorizationHeader)
        const decoded = verify(token, process.env.TOKEN_SECRET!)
        return res.json(decoded)
    } catch (err) {
        res.status(401)
        res.json("wrong token")
        return
    }

}

export const new_weapons_routes = (app: Application) => {
    app.get('/products', index)
    app.post('/products', create)
}