

const LOGIN_URL = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin";
const REFERRALS_URL = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals";


export async function loginUser(email, password) {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  let responseJson = null;
  try {
    responseJson = await response.json();
  } catch (e) {
    responseJson = null;
  }

  if (!response.ok) {
    const message = responseJson && responseJson.message ? responseJson.message : "Invalid email or password";
    throw new Error(message);
  }

  if (!responseJson || !responseJson.data || !responseJson.data.token) {
    throw new Error("Something went wrong while logging in");
  }

  return responseJson.data.token;
}


export async function getReferrals(token, options) {
  options = options || {};

  let url = REFERRALS_URL;
  const queryParts = [];

  if (options.search) {
    queryParts.push("search=" + encodeURIComponent(options.search));
  }
  if (options.sort) {
    queryParts.push("sort=" + options.sort);
  }
  if (options.id) {
    queryParts.push("id=" + options.id);
  }

  if (queryParts.length > 0) {
    url = url + "?" + queryParts.join("&");
  }

  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  let responseJson = null;
  try {
    responseJson = await response.json();
  } catch (e) {
    responseJson = null;
  }

  if (!response.ok) {
    const message = responseJson && responseJson.message ? responseJson.message : "Failed to load referrals";
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }


  const source = responseJson && responseJson.data ? responseJson.data : responseJson;

  return {
    metrics: (source && source.metrics) || [],
    serviceSummary: (source && source.serviceSummary) || null,
    referral: (source && source.referral) || null,
    referrals: (source && source.referrals) || null,
    singleRecord:
      source && !source.referrals && source.id !== undefined ? source : null,
  };
}
