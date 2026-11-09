import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { DEMO_USER } from "../data";
import { useSession } from "../session";

export function Login() {
  const { authenticated, login, enterDemo } = useSession();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState(DEMO_USER.email);
  const [password, setPassword] = useState("demo");
  const [error, setError] = useState<string | null>(null);

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  const goIn = () => {
    enterDemo();
    navigate("/", { replace: true });
  };

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
      <div className="login-panel">
        <div className="login-brand">
          <div className="brand-mark">Keystone</div>
          <p className="login-lede">
            Clickable mid-fi prototype. Enter as an underwriter, switch company
            or branch, then open cases on that desk&apos;s dashboard.
          </p>
        </div>

        <ol className="proto-steps">
          <li>Enter the workspace</li>
          <li>Click another company or branch</li>
          <li>Open a case from the list</li>
        </ol>

        <button type="button" className="btn btn-primary login-submit" onClick={goIn}>
          Enter prototype as {DEMO_USER.name.split(" ")[0]}
        </button>

        <button
          type="button"
          className="btn btn-ghost login-secondary"
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? "Hide sign-in form" : "Use sign-in form instead"}
        </button>

        {showForm ? (
          <form className="login-form" onSubmit={onSubmit}>
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
          </form>
        ) : null}

        <p className="tiny muted login-hint">
          Prototype only — nothing is wired to live lending systems.
        </p>
      </div>
    </div>
  );
}
