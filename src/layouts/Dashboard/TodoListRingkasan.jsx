export function TodoListRingkasan() {
    const todoItems = [
        { id: 1, text: "Meeting dengan klien", completed: true },
        { id: 2, text: "Olahraga 30 menit", completed: false },
        { id: 3, text: "Baca buku 1 jam", completed: false }
    ];
    return (
        <div className="bg-green-100 rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">✅</span>
                <h2 className="font-bold text-lg text-gray-800">To-Do List</h2>
            </div>
            <div className="space-y-2">
                {todoItems.map(item => (
                    <div key={item.id} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={item.completed}
                            readOnly
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className={`ml-2 text-sm ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}