import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import logo from '../../assets/logo (5) 1.svg';
import { DEMO_ACCOUNTS, getAuth, loginWithCredentials } from '../../auth/authStorage';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const existing = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (existing) {
    return existing.role === 'admin' ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/home" replace />
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const session = loginWithCredentials(email, password);
    if (!session) {
      setError('Invalid email or password. Please try again.');
      return;
    }
    if (session.role === 'admin') {
      navigate('/admin', { replace: true });
    } else {
      navigate('/home', { replace: true });
    }
  };

  return (
    <div className="login-page" data-testid="login-page">
      <div className="login-card">
        <div className="login-logo-wrap">
          <img src={logo} alt="iBook Rides" />
          <div className="login-brand">
            iBook <span>Rides</span>
          </div>
        </div>
        <h1 className="login-title">Sign in</h1>
        <p className="login-subtitle">Access your dashboard with your account credentials.</p>

        {error && (
          <div className="login-error" data-testid="login-error" role="alert">
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit} data-testid="login-form">
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              data-testid="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              data-testid="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-submit" data-testid="login-submit">
            Sign in
          </button>
        </form>

        <div className="login-hint">
          <strong>Demo accounts</strong>
          <br />
          User: {DEMO_ACCOUNTS.user.email} / {DEMO_ACCOUNTS.user.password}
          <br />
          Admin: {DEMO_ACCOUNTS.admin.email} / {DEMO_ACCOUNTS.admin.password}
        </div>
      </div>
    </div>
  );
}

export default Login;
