// src/utils/phoneNumberValidation.ts

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^\+?(\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,9}$/;
  return phoneRegex.test(phoneNumber);
};