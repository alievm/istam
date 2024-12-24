const Table = ({ data, onDelete }) => {
    return (
        <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
            <tr className="bg-gray-100">
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                        Name
                    </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                        Category
                    </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                        Sizes
                    </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                        Actions
                    </p>
                </th>
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.category}</td>
                    <td className="border px-4 py-2">{item.sizes.join(", ")}</td>
                    <td className="border px-4 py-2">
                        <button
                            onClick={() => onDelete(item._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;
