const strongPasswordChecker = require('./index.js');

describe('strongPasswordChecker', () => {
    it('returns the number of steps required to make a password strong', () => {
        // Test case 1
        const password1 = "a";
        expect(strongPasswordChecker(password1)).toBe(5);

        // Test case 2
        const password2 = "aA1";
        expect(strongPasswordChecker(password2)).toBe(3);

        // Test case 3
        const password3 = "1337C0d3";
        expect(strongPasswordChecker(password3)).toBe(0);
    });
});