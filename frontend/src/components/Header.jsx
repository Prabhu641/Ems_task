import { Bell, Settings, User } from "lucide-react";

function Header() {
  return (
    <header className="w-full flex justify-between items-center bg-white shadow px-6 py-4 border-b border-gray-300">
      <h1 className="text-xl font-bold text-blue-600">RS-TECH</h1>
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
        <Settings className="w-6 h-6 text-gray-600 cursor-pointer" />
        <User className="w-6 h-6 text-gray-600 cursor-pointer" />
      </div>
    </header>
  );
}

export default Header;
