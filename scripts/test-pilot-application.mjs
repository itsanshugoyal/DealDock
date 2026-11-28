import assert from "node:assert/strict";
import test from "node:test";
import * as application from "../src/components/site/application.mjs";
const { prepareApplication, APPLICATION_EMAIL } = application;

const valid = {email:"reviewer@example.com",instagram:"@example_coach",offer:"coaching",note:"Course questions & coaching enquiries."};
test("applications always address the supplied recipient and preserve typed details", () => {
  const result = prepareApplication(valid);
  const url = new URL(result.href);
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, APPLICATION_EMAIL);
  assert.equal(url.searchParams.get("body"), result.body);
  assert.match(result.body, /Instagram: @example_coach/);
  assert.match(result.body, /questions & coaching enquiries/);
});
test("empty or invalid applications cannot be prepared", () => {
  for (const change of [{email:""}, {email:"invalid"}, {instagram:"https://instagram.com/person"}, {instagram:""}, {offer:"unrecognized"}]) {
    assert.throws(() => prepareApplication({...valid,...change}));
  }
});
test("attribution is bounded and cannot create email headers or change the recipient", () => {
  const result = prepareApplication(valid, {source:"review\r\nBcc: another@example.com",campaign:"a".repeat(500)});
  const url = new URL(result.href);
  assert.equal(url.pathname, APPLICATION_EMAIL);
  assert.equal(url.searchParams.has("bcc"), false);
  assert.match(result.body, /Source: review  Bcc:/);
  assert.equal(result.body.split("Campaign: ")[1].split("\n")[0].length, 100);
});
test("brand-deal creators and agencies apply to the same pilot", () => {
  for (const [offer, label] of [["brand", "Brand deals"], ["agency", "I manage creators"]]) {
    const result = prepareApplication({...valid,offer});
    assert.equal(new URL(result.href).searchParams.get("subject"), "DealDock: pilot application");
    assert.match(result.body, new RegExp("I sell: " + label));
  }
});
test("optional notes are bounded and spaces around the username are normalized", () => {
  const result = prepareApplication({...valid,instagram:" @example_coach ",note:"x".repeat(800)});
  assert.match(result.body, /Instagram: @example_coach/);
  assert.equal(result.body.split("What gets missed: ")[1].split("\n")[0].length, 600);
});

test("correcting one invalid field clears only its error and preserves other errors", () => {
  assert.equal(typeof application.clearCorrectedFieldError, "function");
  const errors = { email: "Enter an email", instagram: "Enter a username" };
  assert.deepEqual(application.clearCorrectedFieldError(errors, "email", " hello@example.com "), { instagram: errors.instagram });
  assert.deepEqual(errors, { email: "Enter an email", instagram: "Enter a username" });
  assert.equal(application.clearCorrectedFieldError(errors, "email", "still-invalid"), errors);
  assert.equal(application.clearCorrectedFieldError(errors, "company", "spam"), errors);
  assert.deepEqual(application.clearCorrectedFieldError({ offer: "Choose" }, "offer", "brand"), {});
});
