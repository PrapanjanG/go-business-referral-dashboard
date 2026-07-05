import { useState } from "react";

function ShareReferral({ referral }) {
  const [copiedField, setCopiedField] = useState("");

  function handleCopy(fieldName, value) {
    navigator.clipboard.writeText(value || "").then(function () {
      setCopiedField(fieldName);
      setTimeout(function () {
        setCopiedField("");
      }, 1800);
    });
  }

  const link = referral ? referral.link : "";
  const code = referral ? referral.code : "";

  return (
    <section aria-label="Share referral" className="section share-box">
      <h2 className="section-title">Refer friends and earn more</h2>

      <div className="share-fields">
        <div className="copy-field">
          <label htmlFor="referral-link">Your Referral Link</label>
          <div className="copy-field-row">
            <input id="referral-link" className="copy-input" type="text" readOnly value={link} />
            <button type="button" className="copy-button" onClick={() => handleCopy("link", link)}>
              Copy
            </button>
          </div>
          <p className="copy-status" aria-live="polite">
            {copiedField === "link" ? "Copied to clipboard" : ""}
          </p>
        </div>

        <div className="copy-field">
          <label htmlFor="referral-code">Your Referral Code</label>
          <div className="copy-field-row">
            <input id="referral-code" className="copy-input" type="text" readOnly value={code} />
            <button type="button" className="copy-button" onClick={() => handleCopy("code", code)}>
              Copy
            </button>
          </div>
          <p className="copy-status" aria-live="polite">
            {copiedField === "code" ? "Copied to clipboard" : ""}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ShareReferral;
