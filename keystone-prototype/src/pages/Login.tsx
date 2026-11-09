import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSession } from "../session";

export function Login() {
  const { authenticated, login } = useSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState("lee-ann@keystone.demo");
  const [password, setPassword] = useState("demo");
  const [error, setError] = useState<string | null>(null);

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/", { replace: true });
  };

  return (
    <div className="login-screen">
      <div className="login-backdrop" aria-hidden />
      <form className="login-panel" onSubmit={onSubmit}>
        <div className="login-brand">
          <div className="brand-mark">Keystone</div>
          <p className="login-lede">
            Sign in to your underwriting workspace, then switch company or
            branch to see that desk&apos;s cases.
          </p>
        </div>

        <label className="login-field">
          <span>Email</span>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="login-field">
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error ? <p className="login-error">{error}</p> : null}

        <button type="submit" className="btn btn-primary login-submit">
          Sign in
        </button>

        <p className="tiny muted login-hint">
          Prototype auth — any non-empty email and password works.
        </p>
      </form>
    </div>
  );
}
