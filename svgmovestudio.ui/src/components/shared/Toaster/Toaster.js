import React from 'react';
import { Alert } from 'reactstrap';
import { subscribe } from '../../../helpers/toast';
import './Toaster.scss';

// Shows toast messages floating over the top of the site.
class Toaster extends React.Component {
  state = {
    toasts: []
  }

  timers = {}

  componentDidMount() {
    this.unsubscribe = subscribe(this.addToast);
  }

  componentWillUnmount() {
    this.unsubscribe();
    Object.values(this.timers).forEach(clearTimeout);
  }

  addToast = (toast) => {
    this.setState(({ toasts }) => ({
      // Drop an identical message that is already showing, and keep at most 3.
      toasts: [...toasts.filter(t => t.message !== toast.message), toast].slice(-3)
    }));
    this.timers[toast.id] = setTimeout(() => this.removeToast(toast.id), toast.timeout);
  }

  removeToast = (id) => {
    clearTimeout(this.timers[id]);
    delete this.timers[id];
    this.setState(({ toasts }) => ({ toasts: toasts.filter(t => t.id !== id) }));
  }

  render() {
    const { toasts } = this.state;

    return (
      <div className="Toaster" aria-live="assertive">
        {toasts.map(toast => (
          <Alert
            key={toast.id}
            color={toast.color}
            className="Toaster-item shadow"
            role={toast.color === 'danger' ? 'alert' : 'status'}
            toggle={() => this.removeToast(toast.id)}
          >
            {toast.message}
          </Alert>
        ))}
      </div>
    );
  }
}

export default Toaster;
