import { RISK_COLORS, type Product } from "@/lib/ploqa-data";

interface Props {
  basket: Product[];
  swapsCount: number;
}

export function PicksView({ basket, swapsCount }: Props) {
  const highRisk = basket.filter((p) => p.overall === "high").length;

  return (
    <div className="pb-24 px-4 pt-6">
      <h1 className="font-serif text-[20px] text-ploqa-text">Your picks this week</h1>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat value={basket.length} label="Products" color="#1a2e1a" />
        <Stat value={highRisk} label="High risk" color="#d85a30" />
        <Stat value={swapsCount} label="Swaps made" color="#2d6a2d" />
      </div>

      <div className="mt-5 space-y-2">
        {basket.length === 0 && (
          <p className="text-ploqa-muted text-[13px] text-center py-8">No picks yet — explore the shelf to start.</p>
        )}
        {basket.map((p, i) => (
          <div key={`${p.id}-${i}`} className="flex gap-3 items-start bg-white border border-ploqa-border rounded-lg p-3">
            <span
              className="shrink-0 w-3 h-3 rounded-full mt-1"
              style={{ background: RISK_COLORS[p.overall].ring }}
            />
            <div className="min-w-0">
              <p className="text-[14px] font-medium text-ploqa-text truncate">{p.name}</p>
              <p className="text-[11px] text-ploqa-muted">{p.source_region}</p>
              <p className="text-[12px] text-ploqa-muted mt-1">{p.reason}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-5 text-ploqa-green text-[12px]">
        <span className="w-2 h-2 rounded-full bg-ploqa-green" />
        412 people in Gothenburg picked different this month
      </div>

      <div
        className="mt-4 bg-white rounded-lg p-3 text-[13px] text-ploqa-text"
        style={{ borderLeft: "3px solid #2d6a2d" }}
      >
        <span className="font-medium">Your next step:</span> try swapping one high-risk product next time you shop.
      </div>
    </div>
  );
}

function Stat({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="bg-[#f5f3ed] rounded-xl p-3">
      <div className="font-serif text-[24px] leading-none" style={{ color }}>{value}</div>
      <div className="text-[11px] text-ploqa-muted mt-1">{label}</div>
    </div>
  );
}
