const minimumDifference = require('./index.js');

describe('minimumDifference', () => {
    it('returns the minimum difference between subsets', () => {
        // Test case 1
        const nums1 = [3, 9, 7, 3];
        expect(minimumDifference(nums1)).toBe(2);

        // Test case 2
        const nums2 = [1, 2, 3, 4, 5];
        expect(minimumDifference(nums2)).toBe(1);

        // Test case 3
        const nums3 = [5, 6, 7, 8];
        expect(minimumDifference(nums3)).toBe(0);

    });
});