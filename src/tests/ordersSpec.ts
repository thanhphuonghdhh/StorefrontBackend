import supertest from "supertest";
import app from "../server";

const req = supertest(app)
describe("Test endpoint response", () => {
    it("getCurrentOrderByUser OK", async () => {
        const response = await req.get(
          "/orders/2",
        );
        console.log(response)
        expect(response.status).toBe(200);
      });
})