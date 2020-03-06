const numList = [];

const LIMIT = 16;

function generateNumber(limit = 10000) {
  return Math.floor(Math.random() * limit) + 1;
}

function getNumber() {
  let num = generateNumber(LIMIT);
  if (numList.length >= LIMIT) return { err: "Maximum Limit Reached" };
  while (numList.includes(num)) {
    num = generateNumber(LIMIT);
  }
  numList.push(num);
  const num4 = ("0000" + num).slice(-4);
  return { num: num4 };
}

function seatNoGenerator() {
  const prefix = "K";
  const { num, err } = getNumber();
  if (err) return err;
  return prefix + num;
}

module.exports = seatNoGenerator;
