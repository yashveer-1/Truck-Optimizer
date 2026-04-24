import { useState } from "react";

export default function UploadExcel({ onUpload }) {
    const [file, setFile] = useState(null);

    return (
        <div className="bg-[#0F213F] p-4 rounded-xl space-y-2">
            <h2 className="text-sm font-semibold text-gray-300">Upload Excel</h2>

            <input
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full text-xs"
            />

            <button
                onClick={() => onUpload(file)}
                className="w-full bg-blue-600 py-2 rounded text-white"
                disabled={!file}
            >
                Upload File
            </button>
        </div>
    );
}
