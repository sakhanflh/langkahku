import { useState } from 'react';

export default function GoalsAndTodoPage() {
    // State untuk filter
    const [selectedFilter, setSelectedFilter] = useState('Hari ini');

    // Data dummy untuk goals
    const goalsData = [
        { id: 1, title: 'Belajar React Mastery', progress: 75, status: 'on-track', deadline: '30 Juni 2023' },
        { id: 2, title: 'Menabung untuk Liburan', progress: 40, status: 'behind', deadline: '15 Agustus 2023' },
        { id: 3, title: 'Proyek Website Freelance', progress: 90, status: 'on-track', deadline: '10 Juli 2023' },
        { id: 4, title: 'Olahraga Rutin', progress: 30, status: 'behind', deadline: 'Setiap Minggu' },
    ];

    // Data dummy untuk to-do list
    const [todos, setTodos] = useState([
        { id: 1, title: 'Meeting dengan klien pukul 10:00', completed: true, priority: 'high', deadline: 'Hari ini' },
        { id: 2, title: 'Mengerjakan laporan keuangan', completed: false, priority: 'medium', deadline: 'Besok' },
        { id: 3, title: 'Belajar materi React Hook', completed: false, priority: 'high', deadline: '2 hari' },
        { id: 4, title: 'Olahraga 30 menit', completed: false, priority: 'low', deadline: 'Hari ini' },
        { id: 5, title: 'Beli kebutuhan bulanan', completed: false, priority: 'medium', deadline: '3 hari' },
    ]);

    // Ringkasan progress
    const completedGoals = goalsData.filter(goal => goal.progress === 100).length;
    const completedTodos = todos.filter(todo => todo.completed).length;

    // Toggle status todo
    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <div className="min-h-screen bg-gray-800 text-gray-100 p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold">Goals & To-Do</h1>

                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    {/* Dropdown Filter */}
                    <select
                        className="bg-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                    >
                        <option>Hari ini</option>
                        <option>Minggu ini</option>
                        <option>Semua</option>
                    </select>

                    {/* Tombol Tambah */}
                    <div className="flex gap-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-colors whitespace-nowrap">
                            + Tambah Goal
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-4 py-2 transition-colors whitespace-nowrap">
                            + Tambah To-Do
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Goals Section */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Goals Saya</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {goalsData.map(goal => (
                            <div key={goal.id} className="bg-gray-700 rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-medium text-lg">{goal.title}</h3>
                                    <span className={`text-xs px-2 py-1 rounded-full ${goal.status === 'on-track'
                                        ? 'bg-green-900 text-green-300'
                                        : 'bg-red-900 text-red-300'
                                        }`}>
                                        {goal.status === 'on-track' ? 'On Track' : 'Tertinggal'}
                                    </span>
                                </div>

                                <div className="mb-3">
                                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                                        <span>Progress</span>
                                        <span>{goal.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-600 rounded-full h-2.5">
                                        <div
                                            className={`h-2.5 rounded-full ${goal.status === 'on-track' ? 'bg-green-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${goal.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-sm text-gray-400">
                                    <span>Deadline: {goal.deadline}</span>
                                    <button className="text-blue-400 hover:text-blue-300 text-xs">
                                        Lihat Detail
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* To-Do List Section */}
                <div className="lg:col-span-1">
                    <h2 className="text-xl font-semibold mb-4">To-Do List</h2>

                    <div className="bg-gray-700 rounded-2xl shadow-md p-5">
                        <div className="space-y-3">
                            {todos.map(todo => (
                                <div
                                    key={todo.id}
                                    className={`flex items-start p-3 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer ${todo.completed ? 'opacity-70' : ''
                                        }`}
                                    onClick={() => toggleTodo(todo.id)}
                                >
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleTodo(todo.id)}
                                        className="mt-1 w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
                                    />
                                    <div className="ml-3 flex-1">
                                        <p className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-200'}`}>
                                            {todo.title}
                                        </p>
                                        <div className="flex justify-between items-center mt-1">
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${todo.priority === 'high'
                                                ? 'bg-red-900 text-red-300'
                                                : todo.priority === 'medium'
                                                    ? 'bg-yellow-900 text-yellow-300'
                                                    : 'bg-green-900 text-green-300'
                                                }`}>
                                                {todo.priority === 'high' ? 'Tinggi' : todo.priority === 'medium' ? 'Sedang' : 'Rendah'}
                                            </span>
                                            <span className="text-xs text-gray-400">{todo.deadline}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ringkasan Progress */}
                    <div className="bg-gray-700 rounded-2xl shadow-md p-5 mt-6">
                        <h3 className="font-semibold mb-4 text-center">Ringkasan Progress</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-800 rounded-xl p-4 text-center">
                                <div className="text-3xl font-bold text-blue-400 mb-1">{completedGoals}/{goalsData.length}</div>
                                <p className="text-xs text-gray-400">Goals Tercapai</p>
                            </div>

                            <div className="bg-gray-800 rounded-xl p-4 text-center">
                                <div className="text-3xl font-bold text-green-400 mb-1">{completedTodos}/{todos.length}</div>
                                <p className="text-xs text-gray-400">To-Do Selesai</p>
                            </div>
                        </div>

                        {/* Progress Bar Overall */}
                        <div className="mt-6">
                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                                <span>Progress Keseluruhan</span>
                                <span>{Math.round((completedGoals + completedTodos) / (goalsData.length + todos.length) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-2.5">
                                <div
                                    className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                                    style={{
                                        width: `${Math.round((completedGoals + completedTodos) / (goalsData.length + todos.length) * 100)}%`
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}