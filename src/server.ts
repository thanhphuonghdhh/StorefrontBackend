import express from "express";
import { users_routes } from "./handlers/users";
import bodyParser from "body-parser";
import { products_routes } from "./handlers/products";
import cors from "cors";
import { orders_routes } from "./handlers/orders";

const app: express.Application = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (_req, res) => {
  return res.send("Welcome to Storefront API");
});

users_routes(app);
products_routes(app);
orders_routes(app);

app.listen(3000, () => {
  console.log("starting app on http://localhost:3000");
});

export default app;
