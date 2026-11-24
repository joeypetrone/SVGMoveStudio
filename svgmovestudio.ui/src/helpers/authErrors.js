// Turns Firebase Auth errors into messages a person can act on.
const messages = {
  'auth/invalid-email': 'That email address doesn\'t look right.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'Email or password is incorrect.',
  'auth/wrong-password': 'Email or password is incorrect.',
  'auth/invalid-login-credentials': 'Email or password is incorrect.',
  'auth/invalid-credential': 'Email or password is incorrect.',
  'auth/too-many-requests': 'Too many attempts. Wait a few minutes and try again.',
  'auth/network-request-failed': 'Can\'t reach the sign-in service. Check your connection and try again.',
  'auth/email-already-in-use': 'An account with that email already exists. Try signing in instead.',
  'auth/weak-password': 'Choose a password with at least 6 characters.',
};

const getAuthErrorMessage = (error) => {
  if (!error) return 'Something went wrong. Please try again.';

  if (messages[error.code]) return messages[error.code];

  // Firebase JS SDK v8 doesn't know the newer INVALID_LOGIN_CREDENTIALS
  // response and reports it as auth/internal-error with the code in the message.
  if (error.message && error.message.includes('INVALID_LOGIN_CREDENTIALS')) {
    return messages['auth/invalid-login-credentials'];
  }

  return 'Something went wrong. Please try again.';
};

export default getAuthErrorMessage;
