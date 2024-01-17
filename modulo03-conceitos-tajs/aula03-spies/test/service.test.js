import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import Service from "../src/service.js";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import exp from "node:constants";

describe("Service Test Suite", () => {
  let _service;
  const filename = "testefile.ndjson";

  const MOCKED_HASH_PWD = "ASDFASDFA";

  describe("#create - spies", () => {
    beforeEach(() => {
      jest.spyOn(crypto, crypto.createHash.name).mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(MOCKED_HASH_PWD),
      });

      jest.spyOn(fs, fs.appendFile.name).mockReturnValue();

      _service = new Service({
        filename,
      });
    });

    it("should call appenFile with right params", async () => {
      //AAA Arrange - Action - Assert
      const input = {
        username: "user1",
        password: "pass1",
      };
      const expectCreatedAt = new Date().toISOString();

      //Arrange
      jest.spyOn(Date.prototype, Date.prototype.toISOString.name);

      //Action
      await _service.create(input);
      console;

      //Assert
      expect(crypto.createHash).toHaveBeenCalledTimes(1);
      expect(crypto.createHash).toHaveBeenCalledWith("sha256");

      const hash = crypto.createHash("sha256");
      expect(hash.update).toHaveBeenCalledWith(input.password);
      expect(hash.digest).toHaveBeenCalledWith("hex");

      const expected = JSON.stringify({
        ...input,
        createdAt: expectCreatedAt,
        password: MOCKED_HASH_PWD,
      }).concat("\n");

      expect(fs.appendFile).toHaveBeenCalledWith(filename, expected);
    });
  });
});
