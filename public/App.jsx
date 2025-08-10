import React from "react";
import SwaggerView from "./src/SwaggerView.jsx";
import ChatsView from "./src/ChatsView.jsx";

export default function App() {
  const [page, setPage] = React.useState("swagger");
  const [routes, setRoutes] = React.useState({});
  const [routesError, setRoutesError] = React.useState(null);

  React.useEffect(() => {
    if (page === "swagger") {
      setRoutesError(null);
      fetch("/api/routes", { headers: { "Content-Type": "application/json" } })
        .then((res) => res.json())
        .then((json) => setRoutes(json.routes || {}))
        .catch((e) => setRoutesError(String(e)));
    }
  }, [page]);

  return (
    <div className="app-container">
      <nav style={{ marginBottom: 20 }}>
        <button onClick={() => setPage("swagger")}>API Explorer</button>
        <button onClick={() => setPage("chats")}>Chats</button>
      </nav>
      {page === "swagger" && <SwaggerView routes={routes} routesError={routesError} />}
      {page === "chats" && <ChatsView />}
    </div>
  );
}
