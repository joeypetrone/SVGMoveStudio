// Tiny app-wide toast bus. Any code can call toast.error(...) or toast.success(...);
// the <Toaster /> mounted in App shows the messages over the page.
let listener = null;
let nextId = 1;

export const subscribe = (fn) => {
  listener = fn;
  return () => {
    if (listener === fn) listener = null;
  };
};

const show = (message, color, timeout) => {
  if (listener) listener({ id: nextId++, message, color, timeout });
};

const toast = {
  error: (message) => show(message, 'danger', 7000),
  success: (message) => show(message, 'success', 3500),
};

export default toast;
