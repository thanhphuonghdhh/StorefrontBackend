import { Application, Request, Response } from "express";
import { User, UserStore } from "../models/users";
import { sign } from "jsonwebtoken";

const store = new UserStore();

const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const user: User = {
    username: req.body.username,
    password: req.body.password,
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
    const u = await store.authenticate(req.body.username, req.body.password);
    let token = sign({ user: u }, process.env.TOKEN_SECRET!);
    res.json(token);
  } catch (err) {
    res.status(401);
    res.json({ err });
  }
};

export const users_routes = (app: Application) => {
  app.post("/create-user", createUser);
  app.post("/authen", authenUser);
};
