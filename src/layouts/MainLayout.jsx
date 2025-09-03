import { useState } from "react";
import { Header } from "../components/fragments/Header";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";

export function MainLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => setIsOpen(!isOpen)
    return (
        <div className="flex h-screen text-white">
            <Sidebar isOpen={isOpen} />
            <div className={`flex-1 transition-all duration-300 ${isOpen ? "ml-72" : "ml-0"}`}>
                <Header toggleSidebar={toggleSidebar} />
                <main className="p-6">{children}</main>
                <Footer />
            </div>
        </div>
    )
}
