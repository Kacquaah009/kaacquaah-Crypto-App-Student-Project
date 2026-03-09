import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button.jsx";
import { cryptoAssets } from "../data/siteData.js";

function AssetDetail() {
  const { symbol } = useParams();
  const asset = cryptoAssets.find((item) => item.symbol === symbol);

  if (!asset) {
    return (
      <section className="page-wrap py-14">
        <h1 className="text-3xl font-bold text-slate-900">Asset not found</h1>
        <p className="mt-3 text-slate-600">The asset you requested does not exist in this demo dataset.</p>
        <Button to="/explore" className="mt-6">
          Back to Explore
        </Button>
      </section>
    );
  }

  return (
    <section className="page-wrap py-14">
      <Link to="/explore" className="text-sm font-semibold text-blue-700 hover:text-blue-900">
        ← Back to Explore
      </Link>
      <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600">Asset Detail</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">{asset.name}</h1>
            <p className="mt-2 text-slate-500 uppercase">{asset.symbol}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-slate-900">{asset.price}</p>
            <p className={`mt-1 text-sm font-semibold ${asset.change.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}>
              {asset.change} (24h)
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-slate-100 p-4">
            <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Market Cap</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{asset.marketCap}</p>
          </div>
          <div className="rounded-xl bg-slate-100 p-4">
            <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Volume (24h)</p>
            <p className="mt-2 text-xl font-bold text-slate-900">$8.2B</p>
          </div>
          <div className="rounded-xl bg-slate-100 p-4">
            <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Circulating Supply</p>
            <p className="mt-2 text-xl font-bold text-slate-900">19.6M</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AssetDetail;
