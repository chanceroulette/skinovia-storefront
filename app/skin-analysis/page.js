import SkinQuiz from '@/components/SkinQuiz';

export const metadata = {
  title: 'Skin Analysis — Skinovia',
  description:
    'Answer a few questions and receive a curated Skinovia plan — hand-picked, authentic products matched to your skin, with fast UAE delivery and VAT included.'
};

export default function SkinAnalysis() {
  return (
    <>
      <div className="phead">
        <p className="over">SKIN ANALYSIS</p>
        <h1>Your skin,<br />read precisely.</h1>
        <p className="sub">A few short questions. One curated plan. We match your concerns and skin type to hand-picked, authentic products from across our beauty house — delivered fast across the UAE, VAT included.</p>
      </div>
      <SkinQuiz />
    </>
  );
}
