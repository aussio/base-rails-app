function App() {
  const [routes, setRoutes] = React.useState([]);
  const [routesError, setRoutesError] = React.useState(null);

  async function loadRoutes() {
    setRoutesError(null);
    try {
      const res = await fetch("/api/routes", { headers: { "Content-Type": "application/json" } });
      const json = await res.json();
      setRoutes(json.routes || []);
    } catch (e) {
      setRoutesError(String(e));
    }
  }

  React.useEffect(() => {
    loadRoutes();
  }, []);

  return (
    <div className="app-container">
      <h1>Available endpoints</h1>  
      {routesError && <pre className="error">{routesError}</pre>}
      {routes.length > 0 && (
        <RoutesList routes={routes} />
      )}
    </div>
  );
}

function RoutesList({ routes }) {
  return (
    <ul>
      {routes.map((r) => (
        <li key={`${r.verb}-${r.path}`} className="route-item">
          <Path verb={r.verb} path={r.path} />
        </li>
      ))}
    </ul>
  );
}

function Path({ verb, path }) {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [showResponse, setShowResponse] = React.useState(false);

  async function handleShowAndFetch() {
    setError(null); 
    setResponse(null);
    setShowResponse(!showResponse);
    if (showResponse && response !== null) {
      return;
    }
    try {
      const res = await fetch(path, { headers: { "Content-Type": "application/json" } });
      const text = await res.text();
      let body;
      try {
        body = JSON.parse(text);
      } catch (_) {
        body = text;
      }
      setResponse(body);
    } catch (e) {
      setError(String(e));
    }
  }

  return (
    <div>
      <div className="path-container" onClick={handleShowAndFetch}>
        <div className="path-container-header">
          <div className={`verb-tag ${verb.toLowerCase()}`}>
            {verb}
          </div>
          <div className="path">
            {path}
          </div>
        </div>
        {showResponse && <Response response={response} error={error} />}
      </div>
    </div>
  )
}

function Response({ response, error }) {

  return (
    <div>
      {error && (
        <pre className="error">{error}</pre>
      )}
      {response !== undefined && (
        <pre className="response">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  )
}

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}


