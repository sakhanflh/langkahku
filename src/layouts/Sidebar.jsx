import { FiDollarSign, FiHome, FiLogOut, FiNavigation, FiSmile, FiTarget } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

export function Sidebar({ isOpen }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login")
    }

    const menuItems = [
        { name: 'Dashboard', icon: <FiHome size={20} />, path: '/' },
        { name: 'Keuangan', icon: <FiDollarSign size={20} />, path: '/keuangan' },
        { name: 'Goals & To-Do', icon: <FiTarget size={20} />, path: '/todo' },
        { name: 'Mood & Refleksi', icon: <FiSmile size={20} />, path: '/mood' },
        { name: 'Ojek Tracker', icon: <FiNavigation size={20} />, path: '/ojek-tracker' },
    ];
    return (
        <aside
            className={`fixed top-0 left-0 h-full w-72 bg-gray-900 border-r border-gray-700 transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="p-5">
                <div className="flex items-center p-4 border-b border-gray-700">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-md mr-[2px]">
                        <span className="font-bold text-xl">M</span>
                    </div>
                    <h1 className="text-xl font-semibold">enu</h1>
                </div>

                <nav className="mt-6">
                    <ul>
                        {menuItems.map((item, index) => (
                            <li key={index} className="px-4 py-2">
                                <Link
                                    to={item.path}
                                    className="flex items-center p-2 rounded-lg hover:bg-blue-500 hover:bg-opacity-20 transition-colors duration-200"
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="px-4 py-2  mt-32">
                    <button onClick={handleLogout} className="flex w-full items-center p-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white hover:bg-opacity-20 transition-colors duration-200">
                        <FiLogOut size={20} className="mr-3" />
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    )
}
