import {
  HardDrive,
  Folder,
  File,
  Clock,
  Menu,
  X,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Home,
  Upload,
  Download,
  Trash2,
  Star,
  Share2,
  BarChart3,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedNav, setSelectedNav] = useState('Dashboard');

  // Dummy data untuk statistik
  const statsData = {
    totalStorage: 100,
    usedStorage: 68.5,
    folders: {
      count: 24,
      size: 45.2
    },
    files: {
      count: 156,
      size: 23.3
    }
  };

  // Dummy data untuk activity log
  const activityLogs = [
    { id: 1, user: 'Mbud', action: 'Login', time: '10:30 AM', date: '2024-01-15', ip: '192.168.1.105' },
    { id: 2, user: 'Amba', action: 'Login', time: '09:15 AM', date: '2024-01-15', ip: '192.168.1.110' },
    { id: 3, user: 'Rusdi', action: 'Login', time: '08:45 AM', date: '2024-01-15', ip: '192.168.1.120' },
    { id: 4, user: 'Ambatunat', action: 'Login', time: '11:20 AM', date: '2024-01-14', ip: '192.168.1.115' },
    { id: 5, user: 'Alex', action: 'Login', time: '07:30 AM', date: '2024-01-14', ip: '192.168.1.125' },
    { id: 6, user: 'Mybini', action: 'Login', time: '02:15 PM', date: '2024-01-14', ip: '192.168.1.130' },
  ];

  // Navigation items
  const navItems = [
    { name: 'Dashboard', icon: Home },
    { name: 'My Files', icon: Folder },
    { name: 'Recent', icon: Clock },
    { name: 'Starred', icon: Star },
    { name: 'Shared', icon: Share2 },
    { name: 'Uploads', icon: Upload },
    { name: 'Downloads', icon: Download },
    { name: 'Trash', icon: Trash2 },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Settings', icon: Settings },
  ];

  const storageUsedPercentage = (statsData.usedStorage / statsData.totalStorage) * 100;
  const remainingStorage = statsData.totalStorage - statsData.usedStorage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-700 transition-all duration-300 z-20 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <HardDrive className="w-8 h-8 text-blue-400" />
              <span className="font-bold text-xl">FileSpace</span>
            </div>
          ) : (
            <HardDrive className="w-8 h-8 text-blue-400 mx-auto" />
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setSelectedNav(item.name)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-1 transition-all duration-200 ${
                selectedNav === item.name
                  ? 'bg-blue-500/10 text-white'
                  : 'hover:bg-gray-800 text-gray-300 hover:text-white'
              }`}
            >
              <item.icon size={20} className={selectedNav === item.name ? 'text-yellow-500' : 'text-gray-400'} />
              {sidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <User size={20} />
            </div>
            {sidebarOpen && (
              <>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Mikasa</p>
                  <p className="text-xs text-gray-400">mikasa@example.com</p>
                </div>
                <button className="p-2 bg-rose-500/20 text-rose-200 hover:bg-gray-700 rounded-lg">
                  <LogOut size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search files..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Header Right */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-800 rounded-lg relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg">
                <Settings size={20} />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <User size={16} />
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Storage Card */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <HardDrive className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-sm text-gray-400">Total Storage</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Used: {statsData.usedStorage} GB</span>
                  <span className="text-gray-400">Free: {remainingStorage} GB</span>
                </div>
                {/* Storage Meter */}
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                    style={{ width: `${storageUsedPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-400 font-semibold">{storageUsedPercentage.toFixed(1)}% Used</span>
                  <span className="text-gray-400">{statsData.totalStorage} GB Total</span>
                </div>
              </div>
            </div>

            {/* Folders Card */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Folder className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-sm text-gray-400">Folders</span>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">{statsData.folders.count}</div>
                <div className="text-sm text-gray-400">Total Size: {statsData.folders.size} GB</div>
                <div className="w-full bg-gray-700 h-1 rounded-full">
                  <div className="bg-blue-500 h-1 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

            {/* Files Card */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <File className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-sm text-gray-400">Files</span>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">{statsData.files.count}</div>
                <div className="text-sm text-gray-400">Total Size: {statsData.files.size} GB</div>
                <div className="flex space-x-2 text-xs">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Images: 45</span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">Docs: 78</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">Other: 33</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log Table */}
          <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-semibold">User Activity Log</h2>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {activityLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <User size={14} className="text-blue-400" />
                          </div>
                          <span className="ml-3 font-medium">{log.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{log.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{log.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
              <span className="text-sm text-gray-400">Showing 6 of 24 entries</span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition-colors">Previous</button>
                <button className="px-3 py-1 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 transition-colors">1</button>
                <button className="px-3 py-1 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition-colors">2</button>
                <button className="px-3 py-1 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition-colors">3</button>
                <button className="px-3 py-1 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition-colors">Next</button>
              </div>
            </div>
          </div>

          {/* Additional Dummy Content - Quick Access */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Folder size={18} className="text-blue-400" />
                <span>Recent Folders</span>
              </h3>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <Folder size={16} className="text-blue-400" />
                      <span>Project {item}</span>
                    </div>
                    <span className="text-sm text-gray-400">Modified 2h ago</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <File size={18} className="text-blue-400" />
                <span>Recent Files</span>
              </h3>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <File size={16} className="text-blue-400" />
                      <span>Document {item}.pdf</span>
                    </div>
                    <span className="text-sm text-gray-400">{item * 2.5} MB</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
