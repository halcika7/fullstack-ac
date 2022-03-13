function getMissing(map) {
  const numbers = Object.values(map)
    .filter((num) => !map[num + 1])
    .map((num) => num + 1);
  return [...new Set(numbers)];
}

function* generatorNumbers(arr) {
  const mapped = arr.reduce(
    (prev, { value }) => ({ ...prev, [value]: value }),
    {}
  );
  const numbers = getMissing(mapped);

  for (const num of numbers) yield num;
}

function getNextId(arr) {
  return arr.reduce((p, { id }) => (p > id ? p : id), -Infinity) + 1;
}

function getStruct(arr) {
  const id = getNextId(arr);
  const missing_numbers = generatorNumbers(arr);
  const appeared = {};

  for (const { value } of arr) {
    const current = appeared[value];

    if (current) {
      let val = missing_numbers.next().value;

      while (val < current) {
        val = missing_numbers.next().value;
      }

      return { id, value: val };
    }

    appeared[value] = value;
  }

  throw Error("There is no repeating values");
}

const result = getStruct([
  { id: 1, value: 3 },
  { id: 2, value: 7 },
  { id: 3, value: 3 },
  { id: 4, value: 1 },
  { id: 5, value: 4 },
]);
console.log("🚀 ~ file: 1.js ~ line 63 ~ result", result);
