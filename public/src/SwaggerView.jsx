import React from "react";

function RoutesList({ routes }) {
  return (
    <div>
      {Object.entries(routes).map(([group, groupRoutes]) => (
        <div key={group} className="route-group">
          <h2>{group || 'root'}</h2>
          <ul>
            {groupRoutes.map((r) => (
              <li key={`${r.verb}-${r.path}`} className="route-item">
                <Path verb={r.verb} path={r.path} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
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
          <div className={`verb-tag ${verb.toLowerCase()}`}>{verb}</div>
          <div className="path">{path}</div>
        </div>
        {showResponse && <Response response={response} error={error} />}
      </div>
    </div>
  );
}

function Response({ response, error }) {
  return (
    <div>
      {error && <pre className="error">{error}</pre>}
      {response !== undefined && (
        <pre className="response">{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
}

export default function SwaggerView({ routes, routesError }) {
  return (
    <div>
      <h1>Available endpoints</h1>
      {routesError && <pre className="error">{routesError}</pre>}
      {Object.keys(routes).length > 0 && <RoutesList routes={routes} />}
    </div>
  );
}
