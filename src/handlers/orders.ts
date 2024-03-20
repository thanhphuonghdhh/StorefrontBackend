import { Application, Request, Response } from "express";
import { OrderStore } from "../models/orders";
import { verifyAuthToken } from "../utilities/tokenValidate";

const store = new OrderStore();

const getCurrentOrderByUser = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.userId;
        if (user_id === undefined) res.status(400).json({error: "Params do not have id"});
        const result = await store.getCurrentOrderByUser(user_id);
        res.json(result);
      } catch (err) {
        res.status(400).json(err);
      }
}

const getCompletedOrderByUser = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.userId;
        if (user_id === undefined) res.status(400).json({error: "Params do not have id"});
        const result = await store.getCompletedOrderByUser(user_id);
        res.json(result);
      } catch (err) {
        res.status(400).json(err);
      }
}

export const orders_routes = (app: Application) => {
    app.get("/orders/:userId", verifyAuthToken, getCurrentOrderByUser);
    app.get("/completed-orders/:userId", verifyAuthToken, getCompletedOrderByUser);
  };