import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function decodeJwtPayload(token) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

function Profile() {
  const [token, setToken] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (storedToken) {
      const decoded = decodeJwtPayload(storedToken);
      setProfileData(decoded);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setProfileData(null);
  };

  return (
    <section className="page-wrap py-14 bg-slate-50 min-h-screen text-slate-900">
      <div className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">My profile</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Account details</h1>
            </div>
            {token ? (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Logout
              </button>
            ) : null}
          </div>

          {token ? (
            <div className="mt-8 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm text-slate-500">Status</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">Logged in</p>
              </div>

              {profileData ? (
                <div className="grid gap-4 lg:grid-cols-3">
                  {Object.entries(profileData).map(([key, value]) => (
                    <div key={key} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{key}</p>
                      <p className="mt-2 text-base font-semibold text-slate-900">{String(value)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-600">
                  <p>Logged in token is present, but the profile payload could not be decoded.</p>
                  <p className="mt-2">If the backend token is not a JWT, this page will still show logged-in status.</p>
                </div>
              )}

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Token preview</p>
                <p className="mt-2 break-all text-sm text-slate-700">{token}</p>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-lg font-semibold text-slate-900">You are not signed in.</p>
              <p className="mt-3 text-slate-600">Sign in to view your account details and access protected features.</p>
              <Link
                to="/signin"
                className="mt-6 inline-flex rounded-full bg-[#4052d2] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4a5de2]"
              >
                Go to Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
