export default function BottomPanel({ items = [] }) {
  return (
    <div className="h-[25%] bg-gray-800 p-4 overflow-auto">

      <h2 className="text-lg font-semibold mb-3">
        Item Table / Load Sequence
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-400">No items loaded</p>
      ) : (
        <table className="w-full text-sm text-left border-collapse">
          
          <thead>
            <tr className="text-gray-400 border-b border-gray-600">
              <th className="py-2">#</th>
              <th>ID</th>
              <th>Priority</th>
              <th>Weight</th>
              <th>Position</th>
              <th>Dimensions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-700 hover:bg-gray-700"
              >
                <td className="py-2">{index + 1}</td>

                <td>{item.id}</td>

                <td>
                  {item.priority === 3 && "🔴 High"}
                  {item.priority === 2 && "🟡 Medium"}
                  {item.priority === 1 && "🔵 Low"}
                </td>

                <td>
                  {item.weight ? `${item.weight} kg` : "—"}
                </td>

                <td>
                  ({item.x}, {item.y}, {item.z})
                </td>

                <td>
                  {item.length} × {item.width} × {item.height}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
}