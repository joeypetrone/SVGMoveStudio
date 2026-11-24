// Turns a failed axios call to the SVG Move Studio API into a message for a toast.
const getApiErrorMessage = (error, fallback = 'Something went wrong. Please try again.') => {
  if (!error || !error.response) {
    return 'Can\'t reach the SVG Move Studio server. Check your connection and try again.';
  }

  const { status, data } = error.response;

  if (status === 401) return 'Your session has expired. Sign in again to continue.';
  if (status === 403) return 'You don\'t have permission to do that.';

  // The API returns plain-text messages for 400 and 404.
  if ((status === 400 || status === 404) && typeof data === 'string' && data.trim()) {
    return data;
  }

  // ASP.NET Core model-validation errors come back as a problem-details object.
  if (status === 400 && data && data.errors) {
    const first = Object.values(data.errors).flat()[0];
    if (first) return first;
  }

  return fallback;
};

export default getApiErrorMessage;
