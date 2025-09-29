/**
 * Normalizes UK phone numbers to the standard +447XXXXXXXXX format
 * @param {string} number - The phone number to normalize
 * @returns {string|null} - The normalized phone number or null if invalid
 */
export function normalizeUKPhone(number) {
  let num = number.replace(/[^\d+]/g, '');
  
  if (num.startsWith('0')) {
    num = '+44' + num.slice(1);
  }
  else if (num.startsWith('44')) {
    num = '+44' + num.slice(2);
  }
  else if (num.startsWith('+44')) {
    // do nothing
  }
  else if (num.startsWith('+')) {
    // do nothing
  }
  else {
    num = '+44' + num;
  }

  // make sure the number starts with +447 as all UK mobile numbers do
  if (!num.startsWith('+447')) {
    return null;
  }

  // also length should be 13 characters for UK mobile numbers
  if (num.length !== 13) {
    return null;
  }

  return num;
}
