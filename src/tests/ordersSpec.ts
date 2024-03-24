import supertest from "supertest";
import app from "../server";
import { UserInfo, UserStore } from "../models/users";
import { createTokenFromUser } from "../utilities/tokenValidate";
import { OrderStore } from "../models/orders";

const req = supertest(app);
const userStore = new UserStore();
const orderStore = new OrderStore(); 
let token: string;

const superUser: UserInfo = {
  username: "admin",
  password: "admin",
  firstname: "my",
  lastname: "admin",
};

const createSuperUser = async () => {
  const res = await userStore.create(superUser);
  token = createTokenFromUser(res);
};

//Test endpoint
describe("Test Orders endpoint response", () => {
  beforeAll(createSuperUser);

  it("should check response of getCurrentOrderByUser endpoint OK", async () => {
    const response = await req.get("/orders/1").set("authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("should check response of getCurrentOrderByUser endpoint OK", async () => {
    const response = await req.get("/completed-orders/1").set("authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });
});

//Test DB action
describe("Test Orders database action", async () => {
  it("should check getCurrentOrderByUser action run", async () => {
    const res = await orderStore.getCurrentOrderByUser("1");
    expect(res).toBeDefined();
  });

  it("should check getCompletedOrderByUser action run", async () => {
    const res = await orderStore.getCompletedOrderByUser("1");
    expect(res).toBeDefined();
  });

});
