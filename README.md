# Go Business - Referral Dashboard

A referral tracking dashboard built for the Go Business coding assessment.
Users sign in, see their referral overview and earnings, share their referral
link/code, and search/sort/page through their referrals list.

## Built with

- React (Vite)
- react-router-dom (for routing)
- plain CSS (no CSS framework)
- Fetch API for talking to the backend (no axios)
- document.cookie for storing the login token (no js-cookie library)

## Running it

```
npm install
npm run dev
```

Then open the URL Vite prints in the terminal.

To build for production:

```
npm run build
```

This creates a `dist` folder that can be deployed (for example, to Vercel).

## Test login

```
Email: admin@example.com
Password: admin123
```

## Folder structure

```
src/
  App.jsx            -> sets up the routes
  main.jsx           -> renders App
  index.css          -> all the styling for the app
  utils/
    api.js           -> functions that call the login and referrals API
    cookies.js       -> get/set/remove cookie helper functions
    format.js        -> date and profit formatting helpers
  components/
    Navbar.jsx
    Footer.jsx
    ProtectedRoute.jsx
    OverviewSection.jsx
    ServiceSummary.jsx
    ShareReferral.jsx
    ReferralsTable.jsx
  pages/
    Login.jsx
    Dashboard.jsx
    ReferralDetail.jsx
    NotFound.jsx
```

## Notes on how things work

- After logging in, the JWT token from the API is saved in a cookie called
  `jwt_token`. Every page that needs the user to be logged in
  (`/` and `/referral/:id`) is wrapped with `ProtectedRoute`, which checks
  for that cookie and redirects to `/login` if it isn't there.
- The `*` route (not found page) is NOT wrapped in `ProtectedRoute`, so it
  works even without being logged in.
- Searching and sorting the referrals table both send a new request to the
  API with `search` and `sort` query params. The table itself only handles
  pagination (10 rows per page) on the client side, since the API always
  returns the full list.
- Dates from the API come in as `YYYY-MM-DD` and get displayed as
  `YYYY/MM/DD`. Profit numbers get displayed as USD with no decimals,
  like `$1,234`.
