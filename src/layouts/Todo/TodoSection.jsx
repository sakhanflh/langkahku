export default function TodoSection({ todos, toggleTodo, onDelete }) {
    return (
        <div className="bg-gray-700 rounded-2xl shadow-md p-5 mb-6">
            <h2 className="text-xl font-semibold mb-4">To-Do List</h2>

            <div className="space-y-3">
                {todos.map(todo => (
                    <div
                        key={todo._id}
                        className={`flex items-start p-3 rounded-lg hover:bg-gray-600 transition-colors ${todo.selesai ? 'opacity-70' : ''}`}
                    >
                        <input
                            type="checkbox"
                            checked={todo.selesai}
                            onChange={() => toggleTodo(todo._id)}
                            className="mt-1 w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
                        />
                        <div className="ml-3 flex-1">
                            <p className={`text-sm ${todo.selesai ? 'line-through text-gray-400' : 'text-gray-200'}`}>
                                {todo.task}
                            </p>
                            <div className="flex justify-between items-center mt-1">
                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${todo.prioritas === 'tinggi'
                                            ? 'bg-red-900 text-red-300'
                                            : todo.prioritas === 'sedang'
                                                ? 'bg-yellow-900 text-yellow-300'
                                                : 'bg-green-900 text-green-300'
                                        }`}
                                >
                                    {todo.prioritas.charAt(0).toUpperCase() + todo.prioritas.slice(1)}
                                </span>
                                <span className="text-xs text-gray-400">{todo.deadline}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => onDelete(todo._id)}
                            className="ml-3 text-red-400 hover:text-red-600"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
