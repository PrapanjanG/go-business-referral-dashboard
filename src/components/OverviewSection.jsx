function OverviewSection({ metrics }) {
  return (
    <section role="region" aria-label="Overview metrics" className="section">
      <h2 className="section-title">Overview</h2>

      {metrics.length === 0 ? (
        <p className="loading-text">No metrics available.</p>
      ) : (
        <div className="overview-grid">
          {metrics.map(function (metric) {
            return (
              <div className="metric-card" key={metric.id || metric.label}>
                <p className="metric-label">{metric.label}</p>
                <p className="metric-value">{metric.value}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default OverviewSection;
