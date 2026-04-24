const colorMap = {
    blue: "bg-blue-500",
    yellow: "bg-yellow-400",
    purple: "bg-purple-500",
    green: "bg-green-500",
    brown: "bg-amber-700"
};

export default function SkuList({ rawItems = [] }) {
    return (
        <div className="bg-[#0F213F] p-4 rounded-xl">

            <h2 className="text-sm font-semibold text-gray-300 mb-2">
                SKU LIST ({rawItems.length})
            </h2>

            <table className="w-full text-xs text-gray-300">

                <thead>
                    <tr className="text-gray-500 text-left border-b border-gray-700">
                        <th className="py-2">SKU</th>
                        <th className="py-2">Color</th>
                        <th className="py-2">Weight</th>
                        <th className="py-2">Vol</th>
                    </tr>
                </thead>

                <tbody>
                    {rawItems.map((item, i) => {
                        const colorKey = (item.color || "blue").toLowerCase();
                        const badgeClass = colorMap[colorKey] || "bg-slate-500";
                        return (
                            <tr
                                key={i}
                                className="border-b border-gray-800 hover:bg-[#132A4A]"
                            >
                                <td className="py-2">{item.id}</td>
                                <td className="py-2">
                                    <span
                                        className={`inline-block h-3 w-3 rounded-full ${badgeClass}`}
                                        aria-label="SKU color"
                                    />
                                </td>
                                <td className="py-2">{item.weight}</td>
                                <td className="py-2">
                                    {(
                                        (item.length * item.width * item.height) / 1000000
                                    ).toFixed(2)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>

        </div>
    );
}