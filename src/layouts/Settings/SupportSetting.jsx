import { AiOutlineLike } from "react-icons/ai";
import { LiaDonateSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

export function SupportSetting() {
    const navigate = useNavigate()
    return (
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold">Beri Dukungan</h2>
            </div>

            <div className="divide-y divide-gray-700">
                <div className="px-6 py-4">
                    <div onClick={() => navigate("/dukungan/pesan")} className="flex items-center space-x-3 cursor-pointer">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <AiOutlineLike className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-medium">Pesan & Like</h3>
                            <p className="text-sm text-gray-400">Beri dukungan melalui pesan dan like</p>
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4 flex items-center justify-between cursor-pointer">
                    <div onClick={() => navigate("/dukungan/donasi")} className="flex items-center space-x-3">
                        <div className="p-2 bg-yellow-50 rounded-lg">
                            <LiaDonateSolid className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <h3 className="font-medium">Bagi - Bagi Rezeki</h3>
                            <p className="text-sm text-gray-400">Beri dukungan melalui Donasi</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}