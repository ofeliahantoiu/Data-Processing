import e from "express";
import { isValidEmail, isValidPassword, validateStrings, validateNumbers, validateArrayStrings, isValidTimeInterval, languageValidator, stringDoesNotContainSpecialCharacters } from "../../utils/validators";
import exp from "constants";

describe('isValidEmail', () => {
    test('Invalid email pattern returns false', () => {
        expect(isValidEmail('test')).toBe(false);
        expect(isValidEmail('test@')).toBe(false);
        expect(isValidEmail('@xxxx@xxxx')).toBe(false);
        expect(isValidEmail('test@test.')).toBe(false);
    });

    test('Valid email pattern returns true', () => {
        expect(isValidEmail('gmail@gmail.com')).toBe(true);
        expect(isValidEmail('test.test@gmail.com')).toBe(true);
        expect(isValidEmail('zsombor.hajzer@students.nhlstenden.com')).toBe(true);
    });
});


describe('isValidPassword', () => {
    test('Invalid password pattern returns false', () => {
        expect(isValidPassword('onlysmallletterpassword')).toBe(false);
        expect(isValidPassword('capitalAndSmallLetterPassword')).toBe(false);
        expect(isValidPassword('capitalAndSmallLetterPasswordWithNumbers12345')).toBe(false);
        expect(isValidPassword('capitalAndSmallLetterPasswordSpecialCharacter!WithoutNumbers')).toBe(false);
        expect(isValidPassword('123#InvalidCharacters漢')).toBe(false);
        expect(isValidPassword('WithNoneValidSpecialCharacter^')).toBe(false);
        expect(isValidPassword('$H0rt')).toBe(false);
        expect(isValidPassword('')).toBe(false);
    });

    test('Valid password pattern returns true', () => {
        expect(isValidPassword('CapitalAndSmallLetterPasswordWithNumbers12345AndWithSPecialCharacters$')).toBe(true);
        expect(isValidPassword('RandomPAss123%')).toBe(true);
        expect(isValidPassword('AllAcceptedSpecialCharacters1@$!%*?&')).toBe(true);
    });

    test('Password "password" returns true', () => {
        expect(isValidPassword('password')).toBe(true);
    });
});


describe('validateStrings', () => {
    test('Invalid strings return false', () => {
        expect(validateStrings(['', ' ', '  '])).toBe(false);
        expect(validateStrings(['', ' ', ' '])).toBe(false);
        expect(validateStrings([undefined, 'string'] as string[])).toBe(false);
    });

    test('Valid strings return true', () => {
        expect(validateStrings(['string', 'string'])).toBe(true);
        expect(validateStrings(['string', 'string', 'string'])).toBe(true);
        expect(validateStrings(['singleString'])).toBe(true);
        expect(validateStrings(['CAPITALLETTERS'])).toBe(true);
    });
});
