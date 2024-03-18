import { Application, Request, Response } from "express";
import { UserInfo, UserStore } from "../models/users";
import { sign } from "jsonwebtoken";
import {
  createTokenFromUser,
  verifyAuthToken,
} from "../utilities/tokenValidate";

const store = new UserStore();

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
    if (id === undefined) res.status(400).json({error: "Params do not have id"});
    const result = await store.show(id);
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const user: UserInfo = {
    username: req.body.username,
    password: req.body.password,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
  };
  try {
    const newUser = await store.create(user);
    let token = sign({ user: newUser }, process.env.TOKEN_SECRET!);
    res.json(token);
  } catch (err) {
    res.status(400);
    // @ts-ignore
    res.json(err + user);
  }
};

const authenUser = async (req: Request, res: Response) => {
  try {
    const user = await store.authenticate(req.body.username, req.body.password);
    if (user === null) return res.status(401);
    res.json(createTokenFromUser(user));
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

export const users_routes = (app: Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/user/:id", show);
  app.post("/user", create);
  app.post("/authen", authenUser);
};
