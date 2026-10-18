import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('authToken', userCredential.user.accessToken);
      navigate('/dashboard');
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid admin credentials. Please try again.');
      } else {
        setError('Connection error. Please check your internet.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Outfit:wght@700;800&display=swap');

        :root {
          --primary: #0f766e;
          --accent: #f59e0b;
        }

        .admin-login-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #0f172a;
          position: relative;
          overflow: hidden;
        }

        /* Animated Background Shapes */
        .shape {
          position: absolute;
          filter: blur(80px);
          z-index: 0;
          border-radius: 50%;
        }
        .shape-1 { width: 400px; height: 400px; background: rgba(15, 118, 110, 0.3); top: -100px; left: -100px; }
        .shape-2 { width: 300px; height: 300px; background: rgba(245, 158, 11, 0.15); bottom: -50px; right: -50px; }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          padding: 45px;
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          z-index: 1;
          text-align: center;
        }

        .brand-logo {
          font-family: 'Outfit', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: white;
          margin-bottom: 8px;
          letter-spacing: -1px;
        }
        .brand-logo span { color: var(--accent); }

        .login-card h2 {
          color: #f1f5f9;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 30px;
        }

        .input-group {
          text-align: left;
          margin-bottom: 20px;
        }

        .input-group label {
          display: block;
          color: #94a3b8;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
          margin-left: 4px;
        }

        .input-field {
          width: 100%;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          color: white;
          font-size: 15px;
          transition: all 0.3s;
          outline: none;
        }

        .input-field:focus {
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.2);
        }

        .error-box {
          background: rgba(239, 68, 68, 0.1);
          color: #fca5a5;
          padding: 12px;
          border-radius: 12px;
          font-size: 13px;
          margin-bottom: 20px;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .login-button {
          width: 100%;
          padding: 15px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 10px;
        }

        .login-button:hover:not(:disabled) {
          background: #134e4a;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loader {
          width: 22px; height: 22px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .footer-text {
          margin-top: 25px;
          color: #64748b;
          font-size: 13px;
        }
      `}</style>

      {/* Background Decor */}
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>

      <div className="login-card">
        <div className="brand-logo">Study<span>Sphere</span></div>
        <h2>Admin Gateway</h2>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Admin Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="name@studysphere.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Security Key</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <div className="loader"></div> : 'Authorize Access'}
          </button>
        </form>

        <p className="footer-text">© 2026 StudySphere Management Console</p>
      </div>
    </div>
  );
};

export default Login;