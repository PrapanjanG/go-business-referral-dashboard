import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getReferrals } from "../utils/api";
import { getCookie } from "../utils/cookies";
import { formatDate, formatProfit } from "../utils/format";

function ReferralDetail() {
  const { id } = useParams();
  const [row, setRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(function () {
    loadReferral();
  }, [id]);

  async function loadReferral() {
    setIsLoading(true);
    setErrorMessage("");
    setNotFound(false);

    try {
      const token = getCookie("jwt_token");
      const result = await getReferrals(token, { id: id });

      let match = null;

      if (result.singleRecord && String(result.singleRecord.id) === String(id)) {
        match = result.singleRecord;
      } else if (result.referrals) {
        for (let i = 0; i < result.referrals.length; i++) {
          if (String(result.referrals[i].id) === String(id)) {
            match = result.referrals[i];
            break;
          }
        }
      }

      if (match) {
        setRow(match);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      const statusText = err.status ? " (" + err.status + ")" : "";
      setErrorMessage(err.message + statusText);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="page">
      <Navbar />

      <main className="detail-main">
        <Link to="/" className="back-link">
          ← Back to dashboard
        </Link>

        {isLoading && <p className="loading-text" style={{ marginTop: 32 }}>Loading referral…</p>}

        {!isLoading && errorMessage && (
          <p role="alert" className="alert-error" style={{ marginTop: 32 }}>
            {errorMessage}
          </p>
        )}

        {!isLoading && !errorMessage && notFound && <h1 className="detail-title">Referral not found</h1>}

        {!isLoading && !errorMessage && row && (
          <>
            <h1 className="detail-title">Referral Details</h1>
            <h2 className="detail-name">{row.name}</h2>

            <dl className="detail-list">
              <div className="detail-row">
                <dt>Referral ID</dt>
                <dd className="mono">{row.id}</dd>
              </div>
              <div className="detail-row">
                <dt>Service Name</dt>
                <dd>{row.serviceName}</dd>
              </div>
              <div className="detail-row">
                <dt>Date</dt>
                <dd className="mono">{formatDate(row.date)}</dd>
              </div>
              <div className="detail-row">
                <dt>Profit</dt>
                <dd className="mono">{formatProfit(row.profit)}</dd>
              </div>
            </dl>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ReferralDetail;
