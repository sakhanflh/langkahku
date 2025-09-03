export function Sidebar({ isOpen }) {
    return (
        <aside
            className={`fixed top-0 left-0 h-full w-72 bg-gray-900 border-r border-gray-700 transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="p-5">
                <div className="flex items-center mb-10">
                    <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-1">
                        <span className="text-white font-bold text-lg font-jost">M</span>
                    </div>
                    <h1 className="text-2xl font-bold font-jost">enu</h1>
                </div>
                <ul className="space-y-3">
                    <li><a href="/dashboard" className="block hover:text-blue-500">Dashboard</a></li>
                    <li><a href="/finance" className="block hover:text-blue-500">Keuangan</a></li>
                    <li><a href="/goals" className="block hover:text-blue-500">Goals</a></li>
                    <li><a href="/profile" className="block hover:text-blue-500">Profil</a></li>
                </ul>
            </div>
        </aside>
    )
}
