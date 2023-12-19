function strongPasswordChecker(password) {
    let result = 0;
    let lowerCase = 1;
    let upperCase = 1;
    let digit = 1;
    const characterList = password.split('');
    const passwordArray = new Array(password.length).fill(0);

    for (let i = 0; i < passwordArray.length;) {
        if (/[a-z]/.test(characterList[i])) {
            lowerCase = 0;
        }
        if (/[A-Z]/.test(characterList[i])) {
            upperCase = 0;
        }
        if (/\d/.test(characterList[i])) {
            digit = 0;
        }

        let j = i;

        while (i < characterList.length && characterList[i] === characterList[j]) {
            i++;
        }
        passwordArray[j] = i - j;
    }

    const totalMissingCharacter = lowerCase + upperCase + digit;

    if (passwordArray.length < 6) {
        result += totalMissingCharacter + Math.max(0, 6 - (passwordArray.length + totalMissingCharacter));
    } else {
        let extraCharacter = Math.max(passwordArray.length - 20, 0);
        let repeatingCharacter = 0;
        result += extraCharacter;

        for (let k = 1; k < 3; k++) {
            for (let i = 0; i < passwordArray.length && extraCharacter > 0; i++) {
                if (passwordArray[i] < 3 || passwordArray[i] % 3 !== (k - 1)) {
                    continue;
                }
                passwordArray[i] -= Math.min(extraCharacter, k);
                extraCharacter -= k;
            }
        }

        for (let i = 0; i < passwordArray.length; i++) {
            if (passwordArray[i] >= 3 && extraCharacter > 0) {
                const need = passwordArray[i] - 2;
                passwordArray[i] -= extraCharacter;
                extraCharacter -= need;
            }

            if (passwordArray[i] >= 3) {
                repeatingCharacter += Math.floor(passwordArray[i] / 3);
            }
        }

        result += Math.max(totalMissingCharacter, repeatingCharacter);
    }

    return result;
};

module.exports = strongPasswordChecker;