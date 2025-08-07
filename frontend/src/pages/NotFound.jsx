function NotFound() {
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 text-white"
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      <div className="text-center p-5 rounded shadow" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
        <h1 className="display-4 fw-bold">404</h1>
        <p className="lead mb-4">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="btn btn-outline-light">
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
