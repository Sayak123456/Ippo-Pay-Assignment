function minimumDifference(nums) {
  const n = Math.floor(nums.length / 2);
  const total = nums.reduce((acc, curr) => acc + curr, 0);
  const leftMap = new Map();
  const rightMap = new Map();

  createSumMappings(0, leftMap, nums, n);
  createSumMappings(n, rightMap, nums, n);
  leftMap.set(0, [0]);
  rightMap.set(0, [0]);

  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i <= n; i++) {
    const left = leftMap.get(i) || [];
    const right = rightMap.get(n - i) || [];
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    let p1 = 0,
      p2 = right.length - 1;
    while (p1 < left.length && p2 >= 0) {
      const sum = left[p1] + right[p2];
      const remaining = total - sum;
      const diff = Math.abs(remaining - sum);
      min = Math.min(min, diff);
      if (sum > total / 2) p2--;
      else p1++;
    }
  }
  return min;
};

function createSumMappings(offSet, map, nums, n) {
  for (let i = 1; i <= Math.pow(2, n) - 1; i++) {
    const binary = i.toString(2);
    let sum = 0,
      setBits = 0;
    for (
      let j = binary.length - 1, index = nums.length - 1;
      j >= 0;
      j--, index--
    ) {
      if (binary.charAt(j) === "1") {
        setBits++;
        sum += nums[index - offSet];
      }
    }
    if (!map.has(setBits)) map.set(setBits, []);
    map.get(setBits).push(sum);
  }
}

module.exports = minimumDifference;