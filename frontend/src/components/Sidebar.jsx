import { HiSquares2X2, HiUsers, HiCalendar, HiChatBubbleLeftRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-white text-gray-700 h-screen p-6 space-y-6 border-r border-gray-300">
      <nav className="space-y-4">
        <Link className="flex items-center gap-3 p-2 rounded-r-lg hover:bg-blue-100 transition" to="/">
          <HiSquares2X2 className="w-6 h-6 text-black" />
          <span className="font-medium text-gray-700">Dashboard</span>
        </Link>

        <Link className="flex items-center gap-3 p-2 rounded-r-lg bg-blue-400 transition" to="/">
          <HiUsers className="w-6 h-6 text-white" />
          <span className="font-medium text-white">Employees</span>
        </Link>

        <Link className="flex items-center gap-3 p-2 rounded-r-lg hover:bg-blue-100 transition" to="/">
          <HiCalendar className="w-6 h-6 text-black" />
          <span className="font-medium text-gray-700">Calendar</span>
        </Link>

        <Link className="flex items-center gap-3 p-2 rounded-r-lg hover:bg-blue-100 transition" to="/">
          <HiChatBubbleLeftRight className="w-6 h-6 text-black" />
          <span className="font-medium text-gray-700">Messages</span>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
