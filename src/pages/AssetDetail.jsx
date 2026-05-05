import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button.jsx";

function AssetDetail() {
  const { symbol } = useParams();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        const response = await fetch('https://crypto-school-project-backend.onrender.com/api/crypto');
        if (!response.ok) {
          throw new Error('Failed to fetch crypto data');
        }
        const data = await response.json();
        const foundAsset = data.data.find(item => item.symbol.toLowerCase() === symbol.toLowerCase());
        if (foundAsset) {
          setAsset({
            name: foundAsset.name,
            symbol: foundAsset.symbol.toLowerCase(),
            price: `$${foundAsset.price.toLocaleString()}`,
            change: `${foundAsset.change24h > 0 ? '+' : ''}${foundAsset.change24h}%`,
            marketCap: 'N/A' // Backend doesn't provide market cap
          });
        } else {
          setError('Asset not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssetData();
  }, [symbol]);

  if (loading) {
    return (
      <section className="page-wrap py-14">
        <h1 className="text-3xl font-bold text-slate-900">Loading...</h1>
      </section>
    );
  }

  if (error || !asset) {
    return (
      <section className="page-wrap py-14">
        <h1 className="text-3xl font-bold text-slate-900">Asset not found</h1>
        <p className="mt-3 text-slate-600">{error || 'The asset you requested does not exist.'}</p>
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
