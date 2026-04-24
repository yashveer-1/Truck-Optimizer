export default function ActionsPanel({ onOptimize, onRebuild, onExport, onPrint }) {
    return (
        <div className="bg-[#0F213F] p-4 rounded-xl space-y-2">
            <h2 className="text-gray-300 font-semibold mb-2">
                ACTIONS
            </h2>

            <button
                onClick={onOptimize}
                className="w-full bg-blue-600 py-2 rounded"
            >
                Optimize Load
            </button>

            <button
                onClick={onRebuild}
                className="w-full bg-[#132A4A] py-2 rounded"
            >
                Rebuild Load
            </button>

            <button
                onClick={onExport}
                className="w-full bg-[#132A4A] py-2 rounded"
            >
                Export Load Plan
            </button>

            <button
                onClick={onPrint}
                className="w-full bg-[#132A4A] py-2 rounded"
            >
                Print / Share
            </button>
        </div>
    );
}
