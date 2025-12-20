import { typeText } from "../src/script.js";
import { test, expect } from "@jest/globals";

// Mock DOM element
function createMockElement() {
  return { textContent: "" };
}

test("typeText sets textContent to the full string", (done) => {
  const element = createMockElement();
  typeText(element, "Hello", 10);
  setTimeout(() => {
    expect(element.textContent).toBe("Hello");
    done();
  }, 2000);
});
