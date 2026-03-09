import SectionHeading from "../components/common/SectionHeading.jsx";
import CryptoTable from "../components/crypto/CryptoTable.jsx";
import { cryptoAssets } from "../data/siteData.js";

function Explore() {
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
