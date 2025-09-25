import { useState } from "react";
import Modal from "../Modal";

export default function HeaderSection({ selectedFilter, setSelectedFilter, handleAdd, handleAddGoal }) {
    const [modalType, setModalType] = useState(null);

    const handleOpenModal = (type) => {
        setModalType(type);
    };

    const handleCloseModal = () => {
        setModalType(null);
    };

    // Handler untuk form goal
    const handleGoalSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const goalData = {
            judul: formData.get('judul'),
            deskripsi: formData.get('deskripsi') || "",
            targetTanggal: Number(formData.get('deadline')),
            progres: formData.get('progres')
        };
        handleAdd('goal', goalData);
        handleCloseModal();
    };

    // Handler untuk form todo  
    const handleTodoSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const todoData = {
            task: formData.get('task'),
            prioritas: formData.get('prioritas'),
            deadline: formData.get('deadline')
        };
        handleAdd('todo', todoData);
        handleCloseModal();
    };

    return (
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
                    <button
                        onClick={() => handleOpenModal("goal")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-colors whitespace-nowrap"
                    >
                        + Tambah Goal
                    </button>
                    <button
                        onClick={() => handleOpenModal("todo")}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-4 py-2 transition-colors whitespace-nowrap"
                    >
                        + Tambah To-Do
                    </button>
                </div>

                {/* Modal untuk Tambah Goal */}
                <Modal isOpen={modalType === "goal"} onClose={handleCloseModal}>
                    <h2 className="text-xl font-semibold text-white mb-5">Tambah Goal Baru</h2>

                    <form onSubmit={handleGoalSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-300 mb-2 text-sm font-medium">
                                Judul Goal
                            </label>
                            <input
                                type="text"
                                name="judul"
                                placeholder="Contoh: Belajar React Mastery"
                                className="w-full bg-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 mb-2 text-sm font-medium">
                                    Target Progress (%)
                                </label>
                                <input
                                    type="number"
                                    name="progres"
                                    min="0"
                                    max="100"
                                    placeholder="0-100"
                                    className="w-full bg-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2 text-sm font-medium">
                                    Deadline
                                </label>
                                <input
                                    type="date"
                                    name="deadline"
                                    className="w-full bg-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                            >
                                Simpan Goal
                            </button>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="bg-red-500 hover:bg-red-800 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </Modal>

                {/* Modal untuk Tambah To-Do */}
                <Modal isOpen={modalType === "todo"} onClose={handleCloseModal}>
                    <h2 className="text-xl font-semibold text-white mb-3">Tambah To-Do Baru</h2>

                    <form onSubmit={handleTodoSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-300 mb-2 text-sm font-medium">
                                Task To-Do
                            </label>
                            <input
                                type="text"
                                name="task"
                                placeholder="Contoh: Meeting dengan klien"
                                className="w-full bg-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 mb-2 text-sm font-medium">
                                    Prioritas
                                </label>
                                <select
                                    name="prioritas"
                                    className="w-full bg-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="rendah">Rendah</option>
                                    <option value="sedang">Sedang</option>
                                    <option value="tinggi">Tinggi</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2 text-sm font-medium">
                                    Deadline
                                </label>
                                <select
                                    name="deadline"
                                    className="w-full bg-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="Hari ini">Hari ini</option>
                                    <option value="Besok">Besok</option>
                                    <option value="2 hari">2 hari</option>
                                    <option value="3 hari">3 hari</option>
                                    <option value="Minggu ini">Minggu ini</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                            >
                                Simpan To-Do
                            </button>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="bg-red-500 hover:bg-red-800 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
}