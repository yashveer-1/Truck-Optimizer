import GapAnalysis from "./RightSideBarComponents/GapAnalysis";
import ActionsPanel from "./RightSideBarComponents/ActionsPanel";
import LoadSequence from "./LeftSideBarComponents/LoadSequence";

export default function StatsPanel({
  rawItems = [],
  onOptimize,
  onRebuild,
  onExport,
  onPrint
}) {
  return (
    <div className="p-3 space-y-4 text-sm">

      {/* 🔹 LOAD SEQUENCE */}
      <LoadSequence rawItems={rawItems} />

      {/* 🔹 GAP ANALYSIS */}
      <GapAnalysis rawItems={rawItems} />

      {/* 🔹 ACTIONS */}
      <ActionsPanel
        onOptimize={onOptimize}
        onRebuild={onRebuild}
        onExport={onExport}
        onPrint={onPrint}
      />

    </div>
  );
}