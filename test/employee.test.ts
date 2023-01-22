import {describe, it} from "@jest/globals";
import request from "supertest";
import {app} from "../src/server";

describe("POST /user", () => {
  it("user login", function (done) {
    request(app)
      .post("/")
      .send({name: "test9810", position: "test9810" , level: "junior"})
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) {return done(err);}
        return done();
      });
  });
});