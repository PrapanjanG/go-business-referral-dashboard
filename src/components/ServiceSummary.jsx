function ServiceSummary({ summary }) {
  if (!summary) {
    return null;
  }

  return (
    <section aria-label="Service summary" className="section">
      <h2 className="section-title">Service summary</h2>

      <dl className="summary-grid">
        <div className="summary-cell">
          <dt>Service</dt>
          <dd>{summary.service}</dd>
        </div>
        <div className="summary-cell">
          <dt>Your Referrals</dt>
          <dd>{summary.yourReferrals}</dd>
        </div>
        <div className="summary-cell">
          <dt>Active Referrals</dt>
          <dd>{summary.activeReferrals}</dd>
        </div>
        <div className="summary-cell">
          <dt>Total Ref. Earnings</dt>
          <dd>{summary.totalRefEarnings}</dd>
        </div>
      </dl>
    </section>
  );
}

export default ServiceSummary;
