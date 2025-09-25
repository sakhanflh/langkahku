export default function ProgressSummary({ goalsData = [], todos = [] }) {
    const completedGoals = goalsData.filter(goal => goal.tercapai).length;
    const completedTodos = todos.filter(todo => todo.selesai).length; // ⬅ pakai `selesai`
    const overallProgress = Math.round(
        (completedGoals + completedTodos) / (goalsData.length + todos.length || 1) * 100
    );

    return (
        <div className="bg-gray-700 rounded-2xl shadow-md p-5">
            <h3 className="font-semibold mb-4 text-center">Ringkasan Progress</h3>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">
                        {completedGoals}/{goalsData.length}
                    </div>
                    <p className="text-xs text-gray-400">Goals Tercapai</p>
                </div>

                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-1">
                        {completedTodos}/{todos.length}
                    </div>
                    <p className="text-xs text-gray-400">To-Do Selesai</p>
                </div>
            </div>

            {/* Progress Bar Overall */}
            <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Progress Keseluruhan</span>
                    <span>{overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2.5">
                    <div
                        className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                        style={{ width: `${overallProgress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
