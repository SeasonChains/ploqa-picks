import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShelfView } from "@/components/ploqa/ShelfView";
import { ScanView } from "@/components/ploqa/ScanView";
import { PicksView } from "@/components/ploqa/PicksView";
import type { Product } from "@/lib/ploqa-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PLOQA — Pick different" },
      { name: "description", content: "See what was picked to make your groceries. Choose products with lower supply-chain impact." },
      { property: "og:title", content: "PLOQA — Pick different" },
      { property: "og:description", content: "See what was picked to make your groceries. Choose products with lower supply-chain impact." },
    ],
  }),
  component: Index,
});

type Tab = "shelf" | "scan" | "picks";

function Index() {
  const [tab, setTab] = useState<Tab>("shelf");
  const [basket, setBasket] = useState<Product[]>([]);
  const [swaps, setSwaps] = useState(0);

  const addToBasket = (p: Product, viaSwap = false) => {
    setBasket((b) => [...b, p]);
    if (viaSwap) setSwaps((s) => s + 1);
  };

  return (
    <div className="min-h-screen bg-ploqa-bg max-w-md mx-auto relative">
      {tab === "shelf" && <ShelfView basket={basket} addToBasket={(p) => addToBasket(p, true)} />}
      {tab === "scan" && <ScanView addToBasket={addToBasket} />}
      {tab === "picks" && <PicksView basket={basket} swapsCount={swaps} />}

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-ploqa-border flex">
        {([
          { id: "shelf", label: "Shelf", icon: "🛒" },
          { id: "scan", label: "Scan", icon: "🔍" },
          { id: "picks", label: "My Picks", icon: "🧺" },
        ] as { id: Tab; label: string; icon: string }[]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex-1 py-2.5 flex flex-col items-center gap-0.5 transition"
            style={{ color: tab === t.id ? "#2d6a2d" : "#6a8a6a" }}
          >
            <span className="text-[18px]">{t.icon}</span>
            <span className="text-[11px] font-medium">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
