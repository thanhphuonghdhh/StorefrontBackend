import supertest from "supertest";
import app from "../server";
import { UserInfo, UserStore } from "../models/users";
import { createTokenFromUser } from "../utilities/tokenValidate";
import { ProductInfo, ProductStore } from "../models/products";

const req = supertest(app);
const userStore = new UserStore();
const productStore = new ProductStore();
let token: string;

const superUser: UserInfo = {
  username: "admin",
  password: "admin",
  firstname: "my",
  lastname: "admin",
};

const product: ProductInfo = {
    name: "milk",
    price: 10
}

const createSuperUser = async () => {
  const res = await userStore.create(superUser);
  token = createTokenFromUser(res);
};

//Test endpoint
describe("Test Products endpoint response", () => {
  beforeAll(createSuperUser);

  it("should check response of index endpoint OK", async () => {
    const response = await req.get("/products");
    expect(response.status).toBe(200);
  });

  it("should check response of show endpoint OK", async () => {
    const response = await req.get("/product/1");
    expect(response.status).toBe(200);
  });

  it("should check response of create endpoint OK", async () => {
    const response = await req.post("/product").send(product).set("authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });
});

//Test DB action
describe("Test Products database action", async () => {
  it("should check index action run", async () => {
    const res = await productStore.index();
    expect(res).toBeDefined();
  });

  it("should check show action run", async () => {
    const res = await productStore.show("1");
    expect(res).toBeDefined();
  });

  it("should check create action run", async () => {
    const res = await productStore.create(product);
    expect(res).toBeDefined();
  });
});
