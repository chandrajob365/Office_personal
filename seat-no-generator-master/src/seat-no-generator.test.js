const seatNoGenerator = require("./seat-no-generator");

const seatNoRegex = /K[0-9]{4}/;
describe("seatNoGenerator", () => {
  it("should return string in `K0000` format", () => {
    const seatNo = seatNoGenerator();
    expect(seatNo).toEqual(expect.stringMatching(seatNoRegex));
  });

  it("should should be unique", () => {
    let results = [];
    for (let i = 0; i < 1000; i++) {
      const seatNo = seatNoGenerator();
      expect(results.includes(seatNo)).toBe(false);
      results.push(seatNo);
    }
  });
});
