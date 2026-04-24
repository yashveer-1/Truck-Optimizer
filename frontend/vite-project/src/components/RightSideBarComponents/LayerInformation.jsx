export default function LayerInformation({ layers = [] }) {
    return (
        <div className="bg-[#0F213F] p-4 rounded-xl">
            <h2 className="text-gray-300 font-semibold mb-3">
                LAYER INFORMATION
            </h2>

            <div className="space-y-2">
                {layers.map((layer, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className={`w-3 h-3 rounded-full ${layer.color}`}
                        ></div>
                        <span>
                            {layer.label} ({layer.count})
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
