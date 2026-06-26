'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

/* ---------------------------------------------------------------------------
   Live product catalogue (verified against the Skinovia storefront, AED).
   Each recommendation links to /products/{handle}. Prices are VAT-included.
--------------------------------------------------------------------------- */
const P = {
  proCollagen:  { handle: 'pro-collagen-lifting-serum',            title: 'Pro-Collagen Lifting Serum',              price: 179 },
  timeEraser:   { handle: 'time-eraser-instant-firming-serum',     title: 'Time Eraser — Instant Firming Serum',     price: 75  },
  beeVenom:     { handle: 'bee-venom-anti-wrinkle-firming-cream',  title: 'Bee Venom Anti-Wrinkle Firming Cream',    price: 69  },
  luxMask:      { handle: 'lux-led-photon-face-neck-mask',         title: 'Lux — LED Photon Face & Neck Mask',       price: 249 },
  eclatVitC:    { handle: 'eclat-vitamin-c-brightening-face-serum',title: 'Éclat — Vitamin C Brightening Face Serum',price: 119 },
  glowCC:       { handle: 'glow-cc-cream-spf-25-tone-up-protect',  title: 'Glow CC Cream SPF 25 — Tone-Up & Protect',price: 85  },
  orangePeel:   { handle: 'orange-exfoliating-peeling-gel',        title: 'Orange Exfoliating Peeling Gel',          price: 79  },
  bodyOil:      { handle: 'nourishing-body-glow-oil',              title: 'Nourishing Body Glow Oil',                price: 75  },
  papayaCream:  { handle: 'papaya-body-firming-nourishing-cream',  title: 'Papaya Body Firming & Nourishing Cream',  price: 75  },
  gelCleanser:  { handle: 'refreshing-gel-facial-cleanser',        title: 'Refreshing Gel Facial Cleanser',          price: 89  },
  makeupRemover:{ handle: 'gentle-cleansing-makeup-remover',       title: 'Gentle Cleansing Makeup Remover',         price: 69  },
  eyeCream:     { handle: 'lumina-peptide-eye-renewal-cream',      title: 'Lumina — Peptide Eye Renewal Cream',      price: 79  },
  hairTreat:    { handle: 'collagen-repair-hair-treatment',        title: 'Collagen Repair Hair Treatment',          price: 89  },
  airStyler:    { handle: 'aura-hot-air-styler-volumizer-brush',   title: 'Aura — Hot Air Styler & Volumizer Brush', price: 119 }
};

const WHATSAPP = 'https://wa.me/971543481109';

/* ---------------------------------------------------------------------------
   Questions
--------------------------------------------------------------------------- */
const QUESTIONS = [
  {
    id: 'concern',
    label: 'STEP 01',
    title: 'What would you most like to change?',
    help: 'Your primary concern shapes the heart of your plan.',
    options: [
      { value: 'aging',    label: 'Fine lines & loss of firmness' },
      { value: 'dullness', label: 'Dullness & dark spots' },
      { value: 'dryness',  label: 'Dryness & dehydration' },
      { value: 'acne',     label: 'Breakouts, oil & visible pores' },
      { value: 'eyes',     label: 'Puffiness & tired eyes' },
      { value: 'hair',     label: 'Hair thinning or damage' }
    ]
  },
  {
    id: 'skinType',
    label: 'STEP 02',
    title: 'How does your skin usually behave?',
    help: 'This fine-tunes textures and cleansing.',
    options: [
      { value: 'oily',        label: 'Oily — shine through the day' },
      { value: 'dry',         label: 'Dry — tight or flaky' },
      { value: 'combination', label: 'Combination — oily T-zone' },
      { value: 'sensitive',   label: 'Sensitive — reacts easily' },
      { value: 'normal',      label: 'Normal — fairly balanced' }
    ]
  },
  {
    id: 'age',
    label: 'STEP 03',
    title: 'Which age range are you in?',
    help: 'Skin priorities shift over time.',
    options: [
      { value: 'under25', label: 'Under 25' },
      { value: '25to34',  label: '25 – 34' },
      { value: '35to44',  label: '35 – 44' },
      { value: '45plus',  label: '45 +' }
    ]
  },
  {
    id: 'depth',
    label: 'STEP 04',
    title: 'How involved a routine do you want?',
    help: 'We will keep your plan to the right size.',
    options: [
      { value: 'essential', label: 'Essential — a few hero steps' },
      { value: 'complete',  label: 'Complete — a fuller ritual' },
      { value: 'devices',   label: 'Open to devices & tech' }
    ]
  }
];

/* ---------------------------------------------------------------------------
   Recommendation engine — maps answers to a Morning / Evening plan.
--------------------------------------------------------------------------- */
function buildPlan(answers) {
  const { concern, skinType, age, depth } = answers;
  const morning = [];
  const evening = [];
  const seen = new Set();

  const add = (slot, product, reason) => {
    if (!product || seen.has(product.handle)) return;
    seen.add(product.handle);
    slot.push({ ...product, reason });
  };

  // --- Cleanser: everyone, AM. Gentle gel cleanser suits all skin types.
  add(morning, P.gelCleanser, 'A gentle gel cleanse to start the day fresh, never stripped.');

  // --- Concern-led treatment (the centrepiece)
  switch (concern) {
    case 'aging':
      add(morning, age === '45plus' ? P.proCollagen : P.timeEraser,
        'Targets fine lines and restores visible firmness.');
      add(evening, P.beeVenom,
        'A rich overnight firming cream to plump and smooth.');
      if (age === '35to44' || age === '45plus') {
        add(evening, P.proCollagen,
          'A concentrated pro-collagen step for deeper lift over time.');
      }
      break;
    case 'dullness':
      add(morning, P.eclatVitC,
        'A daily Vitamin C glow shot that brightens and evens tone.');
      add(evening, P.orangePeel,
        'A gentle peel to lift dullness and refine texture (2–3× weekly).');
      break;
    case 'dryness':
      add(morning, P.bodyOil,
        'Fast-absorbing nourishment that seals in hydration with a soft glow.');
      add(evening, P.papayaCream,
        'A rich nourishing cream to rebuild comfort overnight.');
      break;
    case 'acne':
      add(morning, P.orangePeel,
        'Sweeps away dead cells and unclogs the look of pores (2–3× weekly).');
      add(evening, P.makeupRemover,
        'Melts away makeup, oil and sunscreen so skin stays clear.');
      break;
    case 'eyes':
      add(morning, P.eyeCream,
        'Peptide eye care to de-puff and brighten the eye area, AM & PM.');
      add(evening, P.eyeCream,
        'Peptide eye care to de-puff and brighten the eye area, AM & PM.');
      break;
    case 'hair':
      add(morning, P.hairTreat,
        'Collagen repair that revives dry, damaged lengths.');
      if (depth === 'devices') {
        add(evening, P.airStyler,
          'A one-step styler for smooth, volumised, frizz-free results.');
      }
      break;
    default:
      break;
  }

  // --- Hydration / barrier support for dry & sensitive skin (any concern)
  if ((skinType === 'dry' || skinType === 'sensitive') && concern !== 'dryness' && concern !== 'hair') {
    add(evening, P.papayaCream, 'Extra barrier comfort for dry or sensitive skin overnight.');
  }

  // --- Daytime SPF: always recommended (except a hair-only plan)
  if (concern !== 'hair') {
    add(morning, P.glowCC,
      'Daily SPF 25 with tone-up — the single most important anti-ageing step.');
  }

  // --- "Complete" depth: add a brightening or eye finisher if room remains
  if (depth === 'complete') {
    if (concern !== 'dullness') add(morning, P.eclatVitC, 'A brightening boost for added radiance.');
    if (concern !== 'eyes' && concern !== 'hair') add(evening, P.eyeCream, 'A peptide eye step to complete the ritual.');
  }

  return { morning, evening };
}

function summaryLine(answers) {
  const concernText = {
    aging: 'firmness & fine lines',
    dullness: 'brightness & even tone',
    dryness: 'deep hydration',
    acne: 'clarity & balance',
    eyes: 'the eye area',
    hair: 'hair strength & shine'
  }[answers.concern];
  const typeText = {
    oily: 'oily', dry: 'dry', combination: 'combination', sensitive: 'sensitive', normal: 'balanced'
  }[answers.skinType];
  return `Built for ${typeText} skin, focused on ${concernText}.`;
}

/* ---------------------------------------------------------------------------
   UI
--------------------------------------------------------------------------- */
function PlanColumn({ heading, items }) {
  if (!items.length) return null;
  return (
    <div className="quiz-col">
      <h3 className="quiz-col-h">{heading}</h3>
      <ol className="quiz-steps">
        {items.map((it, i) => (
          <li key={it.handle} className="quiz-step">
            <span className="quiz-step-n">{String(i + 1).padStart(2, '0')}</span>
            <div className="quiz-step-body">
              <Link href={`/products/${it.handle}`} className="quiz-step-t">{it.title}</Link>
              <span className="quiz-step-price">AED {it.price}</span>
              <p className="quiz-step-reason">{it.reason}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function SkinQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const total = QUESTIONS.length;
  const current = QUESTIONS[step];
  const plan = useMemo(() => (done ? buildPlan(answers) : null), [done, answers]);

  function choose(qid, value) {
    const next = { ...answers, [qid]: value };
    setAnswers(next);
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function back() {
    if (done) { setDone(false); return; }
    if (step > 0) setStep(step - 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  const progress = done ? 100 : Math.round((step / total) * 100);

  return (
    <section className="quiz-wrap">
      <div className="quiz-shell">
        {/* Progress */}
        <div className="quiz-progress" aria-hidden="true">
          <div className="quiz-progress-bar" style={{ width: `${done ? 100 : ((step + 1) / total) * 100}%` }} />
        </div>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="lbl quiz-lbl">{current.label} · {progress}% READ</p>
              <h2 className="sec-h quiz-q">{current.title}</h2>
              <p className="quiz-help">{current.help}</p>

              <fieldset className="quiz-options">
                <legend className="quiz-legend">{current.title}</legend>
                {current.options.map((opt) => {
                  const selected = answers[current.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`quiz-option${selected ? ' on' : ''}`}
                      aria-pressed={selected}
                      onClick={() => choose(current.id, opt.value)}
                    >
                      <span className="quiz-option-dot" aria-hidden="true" />
                      {opt.label}
                    </button>
                  );
                })}
              </fieldset>

              {step > 0 && (
                <button type="button" className="quiz-back" onClick={back}>← Back</button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="lbl quiz-lbl">YOUR SKINOVIA PLAN</p>
              <h2 className="sec-h quiz-q">Curated for you.</h2>
              <p className="quiz-help">{summaryLine(answers)} Authentic &amp; sealed, VAT included, fast UAE delivery.</p>

              <div className="quiz-plan">
                <PlanColumn heading="Morning" items={plan.morning} />
                <PlanColumn heading="Evening" items={plan.evening} />
              </div>

              <div className="cta-row quiz-cta">
                <Link className="btn" href="/shop">Shop the full range</Link>
                <a className="btn ghost" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  Ask an advisor on WhatsApp
                </a>
              </div>

              <button type="button" className="quiz-back" onClick={restart}>↺ Retake the analysis</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
