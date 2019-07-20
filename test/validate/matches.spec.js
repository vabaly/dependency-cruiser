const expect = require("chai").expect;
const matches = require("../../src/validate/matches");

describe("validate/matches", () => {
  it("_replaceGroupPlaceholders - leaves re alone if passed empty match result", () => {
    expect(matches._replaceGroupPlaceholders("$1/aap|noot", [])).to.equal(
      "$1/aap|noot"
    );
  });

  it("_replaceGroupPlaceholders - leaves re alone if passed groupless match result", () => {
    expect(
      matches._replaceGroupPlaceholders("$1/aap|noot", ["houwoei"])
    ).to.equal("$1/aap|noot");
  });

  it("_replaceGroupPlaceholders - replaces if passed groupless match result and a $0", () => {
    expect(
      matches._replaceGroupPlaceholders("$0/aap|noot", ["houwoei"])
    ).to.equal("houwoei/aap|noot");
  });

  it("_replaceGroupPlaceholders - replaces if passed groupy match result and a $1", () => {
    expect(
      matches._replaceGroupPlaceholders("$1/aap|noot", [
        "whole/result/part",
        "part"
      ])
    ).to.equal("part/aap|noot");
  });

  it("_replaceGroupPlaceholders - replaces if passed groupy match result and multiple $1", () => {
    expect(
      matches._replaceGroupPlaceholders("$1|$1/[^/]+/|noot", [
        "whole/result/part",
        "part"
      ])
    ).to.equal("part|part/[^/]+/|noot");
  });

  it("_replaceGroupPlaceholders - replaces if passed groupy match result and multiple groups", () => {
    expect(
      matches._replaceGroupPlaceholders("$1|$2", [
        "start/thing/part",
        "start",
        "part"
      ])
    ).to.equal("start|part");
  });
});
