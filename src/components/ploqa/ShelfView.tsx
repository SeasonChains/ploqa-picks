import { useMemo, useState } from "react";
import { PRODUCTS, DIMENSIONS, calcRisk, RISK_COLORS, type Dimension, type Product } from "@/lib/ploqa-data";

interface Props {
  basket: Product[];
  addToBasket: (p: Product, viaSwap?: boolean) => void;
}

const ALL_ACTIVE: Record<Dimension, boolean> = {
  habitat: true, species: true, livelihood: true, soil: true, packaging: true,
};

export function ShelfView({ basket: _basket, addToBasket }: Props) {
  const [active, setActive] = useState<Record<Dimension, boolean>>(ALL_ACTIVE);
  const [selected, setSelected] = useState<Product | null>(null);
  const [glowId, setGlowId] = useState<number | null>(null);

  const togglePill = (k: Dimension) => setActive((a) => ({ ...a, [k]: !a[k] }));

  const preset = (keys: Dimension[]) => {
    const next = { habitat: false, species: false, livelihood: false, soil: false, packaging: false } as Record<Dimension, boolean>;
    keys.forEach((k) => (next[k] = true));
    setActive(next);
  };

  const productRings = useMemo(
    () => PRODUCTS.map((p) => ({ p, r: calcRisk(p, active) })),
    [active],
  );

  const handleSwap = (swapId: number) => {
    setSelected(null);
    setGlowId(swapId);
    setTimeout(() => setGlowId(null), 3000);
  };

  return (
    <div className="pb-24">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <h1 className="font-serif text-[20px] text-ploqa-green">PLOQA</h1>
        <span className="text-[12px] text-ploqa-muted">Pick different</span>
      </div>

      {/* Pills */}
      <div className="flex gap-2 px-4 overflow-x-auto pb-3 scrollbar-hide">
        {DIMENSIONS.map((d) => {
          const on = active[d.key];
          return (
            <button
              key={d.key}
              onClick={() => togglePill(d.key)}
              className="shrink-0 px-3 py-1.5 rounded-full text-[13px] transition-all duration-300"
              style={{
                background: on ? "#2d6a2d" : "transparent",
                color: on ? "#fff" : "#6a8a6a",
                border: on ? "1px solid #2d6a2d" : "1px solid #e0ddd4",
              }}
            >
              {d.label} {d.emoji}
            </button>
          );
        })}
      </div>

      {/* Presets */}
      <div className="flex gap-2 px-4 pb-3">
        <button
          onClick={() => preset(["habitat", "species"])}
          className="px-3 py-1 rounded-full text-[11px] border border-ploqa-border text-ploqa-muted hover:bg-ploqa-green-light transition"
        >
          Planet first
        </button>
        <button
          onClick={() => preset(["livelihood", "soil"])}
          className="px-3 py-1 rounded-full text-[11px] border border-ploqa-border text-ploqa-muted hover:bg-ploqa-green-light transition"
        >
          People first
        </button>
        <button
          onClick={() => preset(["habitat", "species", "livelihood", "soil", "packaging"])}
          className="px-3 py-1 rounded-full text-[11px] border border-ploqa-border text-ploqa-muted hover:bg-ploqa-green-light transition"
        >
          All
        </button>
      </div>

      {/* Shelf image with rings */}
      <div className="relative w-full mx-auto">
        <img
          src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&auto=format&fit=crop"
          alt="Supermarket shelf"
          className="w-full block"
        />
        {productRings.map(({ p, r }) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className={`absolute transition-all duration-300 ${glowId === p.id ? "ploqa-glow" : ""}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: 48,
              height: 62,
              borderRadius: 8,
              border: `3px solid ${RISK_COLORS[r.level].ring}`,
              opacity: r.opacity,
              background: "transparent",
              cursor: "pointer",
            }}
            aria-label={p.name}
          />
        ))}
      </div>

      <p className="text-[10px] text-ploqa-muted text-center px-4 py-3">
        Data: Open Food Facts · Trase.earth · GBIF · FAOSTAT
      </p>

      {selected && (
        <BottomSheet
          product={selected}
          active={active}
          onClose={() => setSelected(null)}
          onSwap={handleSwap}
          onAdd={(p) => {
            addToBasket(p);
            setSelected(null);
          }}
        />
      )}
    </div>
  );
}

function BottomSheet({
  product,
  active,
  onClose,
  onSwap,
  onAdd,
}: {
  product: Product;
  active: Record<Dimension, boolean>;
  onClose: () => void;
  onSwap: (id: number) => void;
  onAdd: (p: Product) => void;
}) {
  const r = calcRisk(product, active);
  const swapTarget = product.swap_id ? PRODUCTS.find((p) => p.id === product.swap_id) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 ploqa-scrim" style={{ background: "rgba(0,0,0,0.3)" }} />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md mx-auto bg-ploqa-card ploqa-sheet"
        style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20, maxHeight: "85vh", overflowY: "auto" }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-ploqa-muted text-xl"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="font-serif text-[18px] text-ploqa-text pr-8">{product.name}</h2>

        <div className="flex items-center gap-2 mt-2">
          <span
            className="px-2.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-wide"
            style={{ background: RISK_COLORS[r.level].bg, color: RISK_COLORS[r.level].text }}
          >
            {r.level} risk
          </span>
          <span className="text-[12px] text-ploqa-muted">{product.source_region}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {product.commodities.map((c) => (
            <span key={c} className="px-2 py-0.5 rounded-full text-[11px] bg-[#f5f3ed] text-ploqa-muted">
              {c}
            </span>
          ))}
        </div>

        <h3 className="text-[13px] font-semibold text-ploqa-text mt-5 mb-2">Impact by dimension</h3>
        <div className="space-y-2">
          {DIMENSIONS.filter((d) => active[d.key]).map((d) => {
            const lvl = product.risk[d.key];
            return (
              <div key={d.key} className="flex gap-2 text-[12px]">
                <span
                  className="shrink-0 w-2.5 h-2.5 rounded-full mt-1"
                  style={{ background: RISK_COLORS[lvl].ring }}
                />
                <div>
                  <span className="font-medium text-ploqa-text">{d.label}: </span>
                  <span className="text-ploqa-muted">{product.dimension_details[d.key]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {swapTarget && (
          <button
            onClick={() => onSwap(swapTarget.id)}
            className="mt-5 w-full py-3 rounded-lg bg-ploqa-green text-white text-[14px] font-medium transition hover:opacity-90"
          >
            Pick different → {swapTarget.name}
          </button>
        )}

        <button
          onClick={() => onAdd(swapTarget ?? product)}
          className="mt-2 w-full py-2 text-[12px] text-ploqa-muted hover:text-ploqa-text"
        >
          Add to basket
        </button>
      </div>
    </div>
  );
}
