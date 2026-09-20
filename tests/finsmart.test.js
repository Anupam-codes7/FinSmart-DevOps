const request = require("supertest");
const app = require("../src/server");

describe("FinSmart Banking API", () => {

    test("Home API should be running", async () => {
        const response = await request(app)
            .get("/");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("Running");
    });

    test("Should return account balance", async () => {
        const response = await request(app)
            .get("/api/account/balance");

        expect(response.statusCode).toBe(200);
        expect(response.body.balance).toBeDefined();
    });

    test("Should return transaction history", async () => {
        const response = await request(app)
            .get("/api/transactions");

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("Should reject transfer greater than balance", async () => {
        const response = await request(app)
            .post("/api/transfer")
            .send({ amount: 1000000 });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Insufficient balance");
    });

    test("Should reject zero transfer amount", async () => {
        const response = await request(app)
            .post("/api/transfer")
            .send({ amount: 0 });

        expect(response.statusCode).toBe(400);
    });

});