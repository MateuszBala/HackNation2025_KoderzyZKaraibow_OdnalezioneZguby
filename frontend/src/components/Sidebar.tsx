import { Home, FileText, Package, Settings, ChevronRight } from 'lucide-react';

interface SidebarProps {
  currentView: string;
}

export function Sidebar({ currentView }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Strona główna', icon: Home },
    { id: 'found-items', label: 'Rzeczy znalezione – panel urzędnika', icon: Package, active: true },
    { id: 'documents', label: 'Dokumenty', icon: FileText },
    { id: 'settings', label: 'Ustawienia', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0052A5] text-white flex-shrink-0 overflow-y-auto hidden lg:block">
      <nav className="py-6" aria-label="Nawigacja główna">
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.active;

            return (
              <li key={item.id}>
                <button
                  className={`w-full px-6 py-3 flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-white/10 border-l-4 border-white'
                      : 'hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
