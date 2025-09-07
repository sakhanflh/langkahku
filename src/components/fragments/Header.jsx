import { IoIosNotificationsOutline } from "react-icons/io"
import { HiMenuAlt1 } from "react-icons/hi"
import Notification from "./Notification"

export function Header({ toggleSidebar }) {
    return (
        <header className="flex justify-between items-center p-5 text-white">
            {/* Tombol Hamburger */}
            <HiMenuAlt1 className="text-2xl cursor-pointer" onClick={toggleSidebar} />

            {/* Logo */}
            <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-1">
                    <span className="text-white font-bold text-lg font-jost">L</span>
                </div>
                <h1 className="text-2xl font-bold font-jost">angkahku</h1>
            </div>

            {/* Notifikasi */}
            <Notification hasNew={true}/>
        </header>
    )
}
