import LayerInformation from "./RightSideBarComponents/LayerInformation";
import Legend from "./RightSideBarComponents/Legend";
import GapAnalysis from "./RightSideBarComponents/GapAnalysis";
import ActionsPanel from "./RightSideBarComponents/ActionsPanel";

export default function StatsPanel({ rawItems = [] }) {
  const layerNameMap = {
    top: { label: "Top Layer", color: "bg-purple-500" },
    middle: { label: "Middle Layer", color: "bg-green-500" },
    base: { label: "Base Layer", color: "bg-blue-400" },
    1: { label: "Top Layer", color: "bg-purple-500" },
    2: { label: "Middle Layer", color: "bg-green-500" },
    3: { label: "Base Layer", color: "bg-blue-400" }
  };

  const hasLayerInfo = rawItems.some(item => {
    const rawLayer = item.layer?.toString().toLowerCase();
    return rawLayer && layerNameMap[rawLayer];
  });

  const layerCounts = hasLayerInfo
    ? rawItems.reduce((acc, item) => {
      const rawLayer = item.layer?.toString().toLowerCase();
      if (rawLayer && layerNameMap[rawLayer]) {
        acc[rawLayer] = (acc[rawLayer] || 0) + 1;
      }
      return acc;
    }, {})
    : {};

  const defaultCounts = rawItems.length
    ? {
      top: Math.max(0, Math.floor(rawItems.length * 0.33)),
      middle: Math.max(0, Math.floor(rawItems.length * 0.33)),
      base: Math.max(0, rawItems.length - Math.floor(rawItems.length * 0.33) * 2)
    }
    : { top: 0, middle: 0, base: 0 };

  const layerData = [
    { ...layerNameMap.top, count: hasLayerInfo ? layerCounts.top || 0 : defaultCounts.top },
    { ...layerNameMap.middle, count: hasLayerInfo ? layerCounts.middle || 0 : defaultCounts.middle },
    { ...layerNameMap.base, count: hasLayerInfo ? layerCounts.base || 0 : defaultCounts.base }
  ];

  const legendDefinitions = {
    drum: { label: "Drums (210L / 50L)", color: "bg-blue-500" },
    pail: { label: "Pails / Buckets", color: "bg-yellow-400" },
    grease: { label: "Grease Pails", color: "bg-green-500" },
    box: { label: "Cartons / Boxes", color: "bg-purple-500" },
    block: { label: "Grease Blocks", color: "bg-red-500" }
  };

  const legendCounts = rawItems.reduce((acc, item) => {
    const typeKey = item.type?.toString().toLowerCase();
    if (typeKey && legendDefinitions[typeKey]) {
      acc[typeKey] = (acc[typeKey] || 0) + 1;
    }
    return acc;
  }, {});

  const legendItems = Object.entries(legendDefinitions)
    .filter(([key]) => rawItems.length === 0 || legendCounts[key] > 0)
    .map(([key, value]) => ({
      ...value,
      count: legendCounts[key] || 0
    }));

  return (
    <div className="p-3 space-y-4 text-sm">

      {/* 🔹 LAYER INFORMATION */}
      <LayerInformation layers={layerData} />

      {/* 🔹 LEGEND */}
      <Legend items={legendItems} />

      {/* 🔹 GAP ANALYSIS */}
      <GapAnalysis rawItems={rawItems} />

      {/* 🔹 ACTIONS */}
      <ActionsPanel
        onOptimize={() => console.log("Optimize Load")}
        onRebuild={() => console.log("Rebuild Load")}
        onExport={() => console.log("Export Load Plan")}
        onPrint={() => console.log("Print / Share")}
      />

    </div>
  );
}