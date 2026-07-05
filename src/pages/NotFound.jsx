import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found-page">
      <p className="not-found-code">404</p>
      <h1 className="not-found-title">Page not found</h1>
      <p className="not-found-text">The page you're looking for doesn't exist or may have moved.</p>
      <Link to="/" className="not-found-link">
        Back to dashboard
      </Link>
    </main>
  );
}

export default NotFound;
