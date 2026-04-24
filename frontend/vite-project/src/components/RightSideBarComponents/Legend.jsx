export default function Legend({ items = [] }) {
    return (
        <div className="bg-[#0F213F] p-4 rounded-xl">
            <h2 className="text-gray-300 font-semibold mb-3">
                LEGEND (SKU GROUP)
            </h2>

            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded ${item.color}`}></div>
                        <span>
                            {item.label}
                            {typeof item.count === "number" ? ` (${item.count})` : ""}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
