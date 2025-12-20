/**
 * @jest-environment jsdom
 */
import { typeText } from "../src/script.js";
import { describe, beforeEach, it, expect } from "@jest/globals";

describe("message_test button", () => {
  const testString = "This is a test 1234";

  // Mock DOM element
  beforeEach(() => {
    // Set up our document body
    document.body.innerHTML = `
      <button id="messageBtn">Click Me</button>
      <span id="textMessage"></span>
    `;

    // Simulate the event listener as in your app
    document.getElementById("messageBtn").addEventListener("click", () => {
      typeText("textMessage", testString);
    });
  });

  it('fills textMessage with "This is a test 1234" when clicked', (done) => {
    document.getElementById("messageBtn").click();

    // Wait long enough for all characters to be typed (text length * speed)
    setTimeout(
      () => {
        expect(document.getElementById("textMessage").textContent).toBe(
          testString,
        );
        done();
      },
      testString.length * 50 + 500,
    ); // 50ms per char + buffer
  });
});
