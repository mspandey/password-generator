export const CHAR_SETS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

// Helper for leetspeak substitution
const getRandomChoice = (choices) => {
    const buf = new Uint32Array(1);
    window.crypto.getRandomValues(buf);
    return choices[buf[0] % choices.length];
};

export const obfuscateKeyword = (keyword, options) => {
    if (!options) return keyword;

    const leetMap = {
        a: { symbols: ['@'], numbers: ['4'] },
        b: { symbols: [], numbers: ['8'] },
        e: { symbols: [], numbers: ['3'] },
        i: { symbols: ['!'], numbers: ['1'] },
        l: { symbols: ['!'], numbers: ['1'] },
        o: { symbols: [], numbers: ['0'] },
        s: { symbols: ['$'], numbers: ['5'] },
        t: { symbols: [], numbers: ['7'] },
    };

    let result = "";
    for (let char of keyword) {
        const lowerChar = char.toLowerCase();
        let choices = [char]; // Always include original character to keep variations high

        if (leetMap[lowerChar]) {
            if (options.symbols) {
                choices = choices.concat(leetMap[lowerChar].symbols);
            }
            if (options.numbers) {
                choices = choices.concat(leetMap[lowerChar].numbers);
            }
        }

        let newChar = getRandomChoice(choices);

        // Randomly mix uppercase/lowercase if both are enabled so it doesn't look plainly like the word
        if (options.uppercase && options.lowercase && /[a-zA-Z]/.test(newChar)) {
            const isUpper = getRandomChoice([true, false]);
            newChar = isUpper ? newChar.toUpperCase() : newChar.toLowerCase();
        } else if (options.uppercase && /[a-zA-Z]/.test(newChar)) {
            newChar = newChar.toUpperCase();
        } else if (options.lowercase && /[a-zA-Z]/.test(newChar)) {
            newChar = newChar.toLowerCase();
        }

        result += newChar;
    }

    return result;
};

export const generateSecureRandomPassword = (length, charset, keyword = "", options = null) => {
    if (!charset && !keyword) return "";

    let finalKeyword = keyword;
    if (keyword && options) {
        finalKeyword = obfuscateKeyword(keyword, options);
    }

    // Ensure length is at least the length of keyword
    const finalLength = Math.max(length, finalKeyword.length);
    const randomCharCount = finalLength - finalKeyword.length;

    let password = "";

    if (charset && randomCharCount > 0) {
        let availableChars = charset.split("");

        // Use web crypto API for better randomness
        const randomBuffer = new Uint32Array(randomCharCount);
        window.crypto.getRandomValues(randomBuffer);

        for (let i = 0; i < randomCharCount; i++) {
            if (availableChars.length === 0) {
                // If we run out of unique characters, reset the available characters to allow repeating
                availableChars = charset.split("");
            }
            const randomIndex = randomBuffer[i] % availableChars.length;
            password += availableChars[randomIndex];

            // Remove the character so it's not repeated until all other characters in the charset have been used
            availableChars.splice(randomIndex, 1);
        }
    }

    // Inject the keyword at a random position
    if (finalKeyword) {
        // Find a random insertion index between 0 and the current password length
        const posBuffer = new Uint32Array(1);
        window.crypto.getRandomValues(posBuffer);
        const insertIndex = posBuffer[0] % (password.length + 1);

        password = password.slice(0, insertIndex) + finalKeyword + password.slice(insertIndex);
    }

    return password;
};

export const generateSecureRandomString = (length, charset) => {
    if (!charset) return "";

    const randomBuffer = new Uint32Array(length);
    window.crypto.getRandomValues(randomBuffer);

    let scrambled = "";
    for (let i = 0; i < length; i++) {
        scrambled += charset[randomBuffer[i] % charset.length];
    }
    return scrambled;
};
