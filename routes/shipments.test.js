"use strict";

const request = require("supertest");
const app = require("../app");

const ZIP_CODE_REGEX = "[0-9]{5}(-[0-9]{4})?";

describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("throws error if empty request body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance is required, but is undefined"
        ],
        "status": 400
      }
    });
  });

  test("throws error if invalid product id", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 500,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance.productId must be greater than or equal to 1000"
        ],
        "status": 400
      }
    });
  });

  test("throws error if invalid name", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: 12345,
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance.name is not of a type(s) string"
        ],
        "status": 400
      }
    });
  });

  test("throws error if invalid address", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: 12345,
      zip: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance.addr is not of a type(s) string"
        ],
        "status": 400
      }
    });
  });

  test("throws error if invalid zip", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "not a zip code",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual({
      "error": {
        "message": [
          `instance.zip does not match pattern \"${ZIP_CODE_REGEX}\"`
        ],
        "status": 400
      }
    });
  });
});
