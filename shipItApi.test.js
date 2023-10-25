"use strict";

// Mocking imports belongs up top.
const fetchMock = require("fetch-mock");

const {
  shipProduct,
  SHIPIT_SHIP_URL
} = require("./shipItApi");

describe("shipProduct Function", function () {
  test("valid fetch mock", async function () {
    fetchMock.post(SHIPIT_SHIP_URL,
      {
        body: {
          receipt: {
            shipId: 100
          }
        },
        status: 200
      });

    const shipId = await shipProduct({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(shipId).toEqual(100);
  });
});
