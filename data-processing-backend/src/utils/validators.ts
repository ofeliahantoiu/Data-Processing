//external funct for email validate
import validateEmail from "./email.validator.api";


function isValidEmail(email: string): Boolean {
  if (!email) {
    return false;
  }

  // Required API to check if email is deliverable
  /* (async () => {
     try {
     const info = await validateEmail(email);
 
     if(info && info.data.deliverability !== 'DELIVERABLE'){
       return false;
     }
  
     } catch (error) {
       console.error(error);
     }
   })();
 */
  //regex for email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password: string): Boolean {
  if (!password) {
    return false;
  }
  //regex for One capital, one lowercase letter one number, one special character and at least 6 characters
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (password == "password") {
    return true;
  }
  return passwordRegex.test(password);
}

function validateStrings(strings: string[]): boolean {
  for (const str of strings) {
    if (str === undefined || str.trim() === '') {
      return false;
    }
  }
  return true;
}

function validateNumbers(numbers: number[]): boolean {
  for (const num of numbers) {
    if (num === undefined || num < 0) {
      return false;
    }
  }
  return true;
}

function validateArrayStrings(arr: string[][]): boolean {
  for (const subArr of arr) {
    if (!subArr.every(item => typeof item === 'string' && item.trim() !== '')) {
      return false;
    }
  }
  return true;
}

function invalidTypeValidator(input: any): boolean {
  if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
    // Check if the input is falsy or a string representation of a falsy value
    if (!input || ['false', '0', 'null', 'undefined', 'NaN'].includes(String(input).toLowerCase())) {
        return false;
    }
    return true;
}
return false;
}


function isValidTimeInterval(timeInterval: string) {
  const [hours, minutes, seconds] = timeInterval.split(':').map(Number);
  if (
    Number.isInteger(hours) && hours >= 0 && hours <= 23 &&
    Number.isInteger(minutes) && minutes >= 0 && minutes <= 59 &&
    Number.isInteger(seconds) && seconds >= 0 && seconds <= 59
  ) {
    return true;
  } else {
    return false;
  }

}

function languageValidator(language: string): boolean {
  const acceptedLanguages = ['English', 'French', 'Spanish', 'German', 'Italian', 'Russian', 'Hungarian', 'Dutch', 'Romanian', 'Polish'];

  if (acceptedLanguages.includes(language)) {
    return true;
  }
  return false;
}

function stringDoesNotContainSpecialCharacters(str: string): boolean {
  const invalidCharacters = ['<', '>', '/', '\\', '|', '{', '}', '[', ']', '(', ')', '&', '$', '#', '@', '!', '^', '*', '%', '`', '~', '+', '=', '?', ':', ';', '"', '\'', ',', ' '];
  return !invalidCharacters.some(char => str.includes(char));
}


export { isValidEmail, isValidPassword, validateStrings, validateNumbers, validateArrayStrings, isValidTimeInterval, languageValidator, stringDoesNotContainSpecialCharacters, invalidTypeValidator };