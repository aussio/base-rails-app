import React from "react";
import SwaggerView from "./src/SwaggerView.jsx";
import ChatsView from "./src/ChatsView.jsx";

// Simple router hook for SPA navigation
function useSimpleRouter(routeMap, defaultRoute) {
  const getRoute = (pathname) => routeMap[pathname] || defaultRoute;
  const [route, setRoute] = React.useState(() => getRoute(window.location.pathname));

  React.useEffect(() => {
    const onPopState = () => setRoute(getRoute(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setRoute(getRoute(path));
  };

  return [route, navigate];
}

export default function App() {
  // Map paths to components
  const routeMap = {
    "/": "swagger",
    "/chats": "chats",
    // Add more routes here as needed
  };
  const defaultRoute = "swagger";
  const [page, navigate] = useSimpleRouter(routeMap, defaultRoute);

  return (
    <div className="app-container">
      <nav style={{ marginBottom: 20 }}>
        <button onClick={() => navigate("/")}>API Explorer</button>
        <button onClick={() => navigate("/chats")}>Chats</button>
      </nav>
      {page === "swagger" && <SwaggerView />}
      {page === "chats" && <ChatsView />}
    </div>
  );
}
