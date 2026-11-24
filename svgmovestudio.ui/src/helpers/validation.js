// Field checks shared by the sign-in, sign-up and forgot-password forms.
// Each returns an error message, or '' when the value is fine.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => {
  const value = email.trim();
  if (!value) return 'Enter your email address.';
  if (value.length > 50) return 'Email addresses can be at most 50 characters.';
  if (!emailPattern.test(value)) return 'Enter a valid email address, like name@example.com.';
  return '';
};

export const validateNewPassword = (password) => {
  if (!password) return 'Enter a password.';
  if (password.length < 6) return 'Use at least 6 characters.';
  return '';
};

export const validateUsername = (username) => {
  const value = username.trim();
  if (!value) return 'Enter a username.';
  if (value.length > 50) return 'Usernames can be at most 50 characters.';
  return '';
};

export const hasErrors = (errors) => Object.values(errors).some(Boolean);
