import { useState } from "react";
import Modal from "../Modal";

export default function GoalsSection({ goals, toggleGoal, onDelete }) {
    const [selectedGoal, setSelectedGoal] = useState(null);

    function getGoalStatus(goal) {
        if (goal.tercapai) return "Selesai";

        const today = new Date();
        const deadline = new Date(goal.targetTanggal);

        return deadline >= today ? "On Track" : "Tertinggal";
    }


    const handleOpenDetail = (goal) => {
        setSelectedGoal(goal);
    };

    const handleCloseDetail = () => {
        setSelectedGoal(null);
    };

    return (
        <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Goals Saya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map(goal => (
                    <div key={goal._id} className="bg-gray-700 rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="font-medium text-lg">{goal.judul}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${getGoalStatus(goal) === 'On Track'
                                ? 'bg-green-900 text-green-300'
                                : getGoalStatus(goal) === 'Selesai'
                                    ? 'bg-blue-900 text-blue-300'
                                    : 'bg-red-900 text-red-300'
                                }`}>
                                {getGoalStatus(goal)}
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
                            <span>Deadline: {new Date(goal.targetTanggal).toLocaleDateString()}</span>
                            <button
                                onClick={() => handleOpenDetail(goal)}
                                className="text-blue-400 hover:text-blue-300 text-xs"
                            >
                                Lihat Detail
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Detail Goal */}
            {selectedGoal && (
                <Modal isOpen={true} onClose={handleCloseDetail}>
                    <h2 className="text-xl font-semibold text-white mb-5">{selectedGoal.judul}</h2>

                    <p className="text-gray-300 mb-3">
                        <strong>Deskripsi:</strong> {selectedGoal.deskripsi || "Tidak ada deskripsi"}
                    </p>
                    <p className="text-gray-300 mb-3">
                        <strong>Progress:</strong> {selectedGoal.progress}%
                    </p>
                    <p className="text-gray-300 mb-3">
                        <strong>Deadline:</strong> {new Date(selectedGoal.targetTanggal).toLocaleDateString()}
                    </p>
                    <p className="text-gray-300 mb-5">
                        <strong>Status:</strong> {getGoalStatus(selectedGoal)}
                    </p>


                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                toggleGoal(selectedGoal._id);
                                handleCloseDetail();
                            }}
                            className={`px-4 py-2 rounded-lg text-white ${selectedGoal.tercapai ? "bg-blue-500" : "bg-green-600 hover:bg-green-700"
                                }`}

                        >
                            {selectedGoal.tercapai ? "Sudah Selesai" : "Tandai Selesai"}
                        </button>
                        <button
                            onClick={handleCloseDetail}
                            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-700 text-white"
                        >
                            Tutup
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}
