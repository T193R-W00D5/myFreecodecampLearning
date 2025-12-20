import { add } from "../src/script.js";
import { test, expect } from "@jest/globals";

test("add returns the sum of two numbers", () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 1)).toBe(0);
});
