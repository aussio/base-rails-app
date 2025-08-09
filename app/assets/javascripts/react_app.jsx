function App() {
  const [message, setMessage] = React.useState("Hello React 👋");
  const [upResponse, setUpResponse] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [routes, setRoutes] = React.useState([]);
  const [routesError, setRoutesError] = React.useState(null);
  const [routesLoading, setRoutesLoading] = React.useState(false);

  async function fetchUp() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/up", { headers: { Accept: "application/json" } });
      const json = await res.json();
      setUpResponse(json);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  async function loadRoutes() {
    setRoutesLoading(true);
    setRoutesError(null);
    try {
      const res = await fetch("/api/routes", { headers: { Accept: "application/json" } });
      const json = await res.json();
      setRoutes(json.routes || []);
    } catch (e) {
      setRoutesError(String(e));
    } finally {
      setRoutesLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", padding: 16 }}>
      <h1>{message}</h1>
      <p>Root is mounted via JSX (Babel in-browser) for simplicity.</p>
      <button onClick={fetchUp} disabled={loading}>
        {loading ? "Loading…" : "Fetch /up JSON"}
      </button>
      {error && <pre style={{ color: "crimson" }}>{error}</pre>}
      {upResponse && (
        <pre style={{ marginTop: 12, background: "#111", color: "#eee", padding: 12, borderRadius: 6 }}>
          {JSON.stringify(upResponse, null, 2)}
        </pre>
      )}

      <hr style={{ margin: "24px 0" }} />
      <h2>Available GET endpoints</h2>
      <button onClick={loadRoutes} disabled={routesLoading}>
        {routesLoading ? "Loading…" : "Load Routes"}
      </button>
      {routesError && <pre style={{ color: "crimson" }}>{routesError}</pre>}
      {routes.length > 0 && (
        <RoutesList routes={routes} />
      )}
    </div>
  );
}

function RoutesList({ routes }) {
  const [loadingPath, setLoadingPath] = React.useState(null);
  const [responseByPath, setResponseByPath] = React.useState({});
  const [errorByPath, setErrorByPath] = React.useState({});

  async function fetchPath(path) {
    setLoadingPath(path);
    setErrorByPath((prev) => ({ ...prev, [path]: null }));
    try {
      const res = await fetch(path, { headers: { Accept: "application/json" } });
      const text = await res.text();
      let body;
      try {
        body = JSON.parse(text);
      } catch (_) {
        body = text;
      }
      setResponseByPath((prev) => ({ ...prev, [path]: body }));
    } catch (e) {
      setErrorByPath((prev) => ({ ...prev, [path]: String(e) }));
    } finally {
      setLoadingPath(null);
    }
  }

  return (
    <ul>
      {routes.map((r) => (
        <li key={`${r.verb}-${r.path}`} style={{ marginBottom: 12 }}>
          <code>{r.verb} {r.path}</code>{" "}
          <button onClick={() => fetchPath(r.path)} disabled={loadingPath === r.path}>
            {loadingPath === r.path ? "Loading…" : "Fetch"}
          </button>
          {errorByPath[r.path] && <pre style={{ color: "crimson" }}>{errorByPath[r.path]}</pre>}
          {responseByPath[r.path] !== undefined && (
            <pre style={{ marginTop: 8, background: "#111", color: "#eee", padding: 12, borderRadius: 6, maxWidth: 800, overflow: "auto" }}>
              {typeof responseByPath[r.path] === "string"
                ? responseByPath[r.path]
                : JSON.stringify(responseByPath[r.path], null, 2)}
            </pre>
          )}
        </li>
      ))}
    </ul>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}


