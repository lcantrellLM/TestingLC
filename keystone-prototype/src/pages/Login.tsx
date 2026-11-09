import { Navigate, useNavigate } from "react-router-dom";
import { DEMO_USER } from "../data";
import { useSession } from "../session";

export function Login() {
  const { authenticated, enterDemo } = useSession();
  const navigate = useNavigate();

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-screen">
      <div className="login-panel">
        <div className="brand-row login-brand-row">
          <span className="brand-mark">Vantage</span>
          <span className="brand-dot" aria-hidden />
          <span className="brand-product">CaseManager</span>
        </div>
        <p className="login-lede">
          Clickable prototype. Enter as an underwriter, switch company or branch
          with View as, then open cases for that desk.
        </p>
        <ol className="proto-steps">
          <li>Enter the workspace</li>
          <li>Click another company / branch in View as</li>
          <li>Open a case from the table</li>
        </ol>
        <button
          type="button"
          className="btn btn-primary login-submit"
          onClick={() => {
            enterDemo();
            navigate("/", { replace: true });
          }}
        >
          Enter prototype as {DEMO_USER.name.split(" ")[0]}
        </button>
        <p className="tiny muted login-hint">
          Prototype only · sample data · nothing wired to live systems
        </p>
      </div>
    </div>
  );
}
