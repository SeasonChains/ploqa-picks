import { useState } from "react";
import { PRODUCTS, DIMENSIONS, RISK_COLORS, type Product } from "@/lib/ploqa-data";

interface Props {
  addToBasket: (p: Product, viaSwap?: boolean) => void;
}

export function ScanView({ addToBasket: _addToBasket }: Props) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Product | null | "none">(null);
  const [llm, setLlm] = useState<string>("Tap to generate AI analysis");
  const [llmAnalyzing, setLlmAnalyzing] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const found = PRODUCTS.find((p) => p.name.toLowerCase().includes(q));
    setResult(found ?? "none");
    setLlm("Tap to generate AI analysis");
    setLlmAnalyzing(false);
  };

  const swap = result && result !== "none" && result.swap_id
    ? PRODUCTS.find((p) => p.id === result.swap_id)
    : null;

  return (
    <div className="pb-24 px-4 pt-8">
      <div className="text-center mt-6">
        <h1 className="font-serif text-[28px] text-ploqa-text">Plocka something</h1>
        <p className="text-ploqa-muted text-[14px] mt-1">See what was picked</p>
      </div>

      <form onSubmit={handleSearch} className="mt-6 max-w-md mx-auto">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type product name or barcode..."
          className="w-full px-4 py-3 rounded-lg border border-ploqa-border bg-white text-[14px] outline-none focus:border-ploqa-green transition"
        />
        <button
          type="submit"
          className="mt-3 w-full py-3 rounded-lg bg-ploqa-green text-white text-[14px] font-medium transition hover:opacity-90"
        >
          Search
        </button>
      </form>

      {result === "none" && (
        <p className="text-center text-ploqa-muted text-[13px] mt-6">Product not found in demo database</p>
      )}

      {result && result !== "none" && (
        <div className="mt-6 max-w-md mx-auto bg-white border border-ploqa-border rounded-2xl p-4">
          <h2 className="font-serif text-[18px] text-ploqa-text">{result.name}</h2>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span
              className="px-2.5 py-1 rounded-full text-[11px] font-medium uppercase"
              style={{ background: RISK_COLORS[result.overall].bg, color: RISK_COLORS[result.overall].text }}
            >
              {result.overall} risk
            </span>
            <span className="text-[12px] text-ploqa-muted">{result.source_region}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {result.commodities.map((c) => (
              <span key={c} className="px-2 py-0.5 rounded-full text-[11px] bg-[#f5f3ed] text-ploqa-muted">
                {c}
              </span>
            ))}
          </div>

          <h3 className="text-[13px] font-semibold mt-5 mb-2">What was picked to make this:</h3>
          <div className="space-y-2">
            {DIMENSIONS.map((d) => {
              const lvl = result.risk[d.key];
              return (
                <div key={d.key} className="flex gap-2 text-[12px]">
                  <span className="shrink-0 w-2.5 h-2.5 rounded-full mt-1" style={{ background: RISK_COLORS[lvl].ring }} />
                  <div>
                    <span className="font-medium text-ploqa-text">{d.label}: </span>
                    <span className="text-ploqa-muted">{result.dimension_details[d.key]}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {result.species.length > 0 && (
            <div className="mt-4 -mx-4 px-4 overflow-x-auto">
              <div className="flex gap-2">
                {result.species.map((s) => {
                  const statusColor = s.status === "CR" ? RISK_COLORS.high : s.status === "EN" || s.status === "VU" ? RISK_COLORS.medium : RISK_COLORS.low;
                  return (
                    <div key={s.name} className="shrink-0 w-[140px] bg-white border border-ploqa-border rounded-lg p-2.5">
                      <p className="text-[12px] font-bold text-ploqa-text leading-tight">{s.name}</p>
                      <p className="text-[10px] italic text-ploqa-muted">{s.sci}</p>
                      <span
                        className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold"
                        style={{ background: statusColor.bg, color: statusColor.text }}
                      >
                        {s.status}
                      </span>
                      <p className="text-[11px] text-ploqa-muted mt-1 leading-snug">{s.note}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              if (llmAnalyzing) return;
              setLlmAnalyzing(true);
              setLlm("Analyzing supply chain...");
            }}
            className="mt-4 w-full text-left text-[12px] p-3 rounded-lg bg-[#f5f3ed]"
            style={{ color: llmAnalyzing ? "#8a5e0a" : "#6a8a6a" }}
          >
            {llm}
          </button>

          {swap && (
            <div
              className="mt-4 pl-3 py-2 text-[13px] text-ploqa-text"
              style={{ borderLeft: "3px solid #2d6a2d" }}
            >
              Pick different: <span className="font-medium">{swap.name}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
