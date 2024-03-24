import supertest from "supertest";
import app from "../server";
import { UserInfo, UserStore } from "../models/users";
import { createTokenFromUser } from "../utilities/tokenValidate";

const req = supertest(app);
const userStore = new UserStore();
let token: string;

const superUser: UserInfo = {
  username: "admin",
  password: "admin",
  firstname: "my",
  lastname: "admin",
};

const user: UserInfo = {
  username: "phuvu",
  password: "2",
  firstname: "phu",
  lastname: "vu",
};

const createSuperUser = async () => {
  const res = await userStore.create(superUser);
  token = createTokenFromUser(res);
};

//Test endpoint
describe("Test Users endpoint response", () => {
  beforeAll(createSuperUser);

  it("should check response of index endpoint OK", async () => {
    const response = await req
      .get("/users")
      .set("authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("should check response of show endpoint OK", async () => {
    const response = await req
      .get("/user/1")
      .set("authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("should check response of create endpoint OK", async () => {
    const response = await req
      .post("/user")
      .send(user)
      .set("authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("should check response of authen endpoint fail", async () => {
    const response = await req
      .post("/authen")
      .send(user)
      .set("authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });
});

//Test DB action
describe("Test Users database action", async () => {
  it("should check index action run", async () => {
    const res = await userStore.index();
    expect(res).toBeDefined();
  });

  it("should check show action run", async () => {
    const res = await userStore.show("1");
    expect(res).toBeDefined();
  });

  it("should check create action run", async () => {
    const res = await userStore.create(user);
    expect(res).toBeDefined();
  });

  it("should check authen action run", async () => {
    const res = await userStore.authenticate("admin", "admin");
    expect(res).toBeDefined();
  });
});
