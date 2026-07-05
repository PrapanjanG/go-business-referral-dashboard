import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OverviewSection from "../components/OverviewSection";
import ServiceSummary from "../components/ServiceSummary";
import ShareReferral from "../components/ShareReferral";
import ReferralsTable from "../components/ReferralsTable";
import { getReferrals } from "../utils/api";
import { getCookie } from "../utils/cookies";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(function () {
    const timer = setTimeout(
      function () {
        loadReferrals();
      },
      search === "" ? 0 : 350
    );

    return function () {
      clearTimeout(timer);
    };
  }, [search, sort]);

  async function loadReferrals() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const token = getCookie("jwt_token");
      const result = await getReferrals(token, { search: search, sort: sort });
      setData(result);
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

      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-header">
            <h1>Referral Dashboard</h1>
            <p>Track your referrals, earnings, and partner activity in one place.</p>
          </div>

          {isLoading && !data && <p className="loading-text">Loading your dashboard…</p>}

          {errorMessage && (
            <p role="alert" className="alert-error">
              {errorMessage}
            </p>
          )}

          {data && (
            <>
              <OverviewSection metrics={data.metrics} />
              <ServiceSummary summary={data.serviceSummary} />
              <ShareReferral referral={data.referral} />
              <ReferralsTable
                referrals={data.referrals || []}
                search={search}
                onSearchChange={setSearch}
                sort={sort}
                onSortChange={setSort}
              />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
