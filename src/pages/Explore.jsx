import { useState, useEffect } from "react";
import SectionHeading from "../components/common/SectionHeading.jsx";
import CryptoTable from "../components/crypto/CryptoTable.jsx";

function Explore() {
  const [cryptoAssets, setCryptoAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch('https://crypto-school-project-backend.onrender.com/api/crypto');
        if (!response.ok) {
          throw new Error('Failed to fetch crypto data');
        }
        const data = await response.json();
        // Transform the data to match the expected format
        const transformedData = data.data.map(asset => ({
          name: asset.name,
          symbol: asset.symbol.toLowerCase(),
          price: `$${asset.price.toLocaleString()}`,
          change: `${asset.change24h > 0 ? '+' : ''}${asset.change24h}%`,
          marketCap: 'N/A' // Backend doesn't provide market cap
        }));
        setCryptoAssets(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  if (loading) {
    return (
      <section className="page-wrap py-14">
        <SectionHeading
          eyebrow="Explore"
          title="Markets and top crypto assets"
          description="Loading crypto data..."
        />
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-wrap py-14">
        <SectionHeading
          eyebrow="Explore"
          title="Markets and top crypto assets"
          description={`Error loading data: ${error}`}
        />
      </section>
    );
  }

  return (
    <section className="page-wrap py-14">
      <SectionHeading
        eyebrow="Explore"
        title="Markets and top crypto assets"
        description="Monitor prices, market cap, and momentum with a clean Coinbase-inspired market table."
      />
      <div className="mt-8">
        <CryptoTable assets={cryptoAssets} />
      </div>
    </section>
  );
}

export default Explore;
