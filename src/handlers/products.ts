import { Application, Request, Response } from "express";
import { ProductInfo, ProductStore } from "../models/products";
import { verifyAuthToken } from "../utilities/tokenValidate";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id === undefined)
      res.status(400).json({ error: "Params do not have id" });
    const result = await store.show(id);
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const product: ProductInfo = {
    name: req.body.name,
    price: req.body.price,
  };
  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    // @ts-ignore
    res.status(400).json(err + product);
  }
};

export const products_routes = (app: Application) => {
  app.get("/products", index);
  app.get("/product/:id", show);
  app.post("/product", verifyAuthToken, create);
};
