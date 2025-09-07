export default function HeaderSection() {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
            <h1 className="text-2xl font-bold">Ojek Online Tracker</h1>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-colors">
                + Tambah Data
            </button>
        </div>
    );
}