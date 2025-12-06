import { Bell, User, Globe } from 'lucide-react';

export function TopBar() {
  return (
    <header className="bg-white border-b border-[#E5E5E5] sticky top-0 z-40">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0052A5] rounded flex items-center justify-center">
              <span className="text-white">OD</span>
            </div>
            <span className="text-[#0052A5]">Otwarte Dane</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#F2F2F2] transition-colors"
            aria-label="Zmień język"
          >
            <Globe className="w-5 h-5 text-[#666]" />
            <span className="text-[#666]">PL</span>
          </button>

          <button
            className="relative p-2 rounded hover:bg-[#F2F2F2] transition-colors"
            aria-label="Powiadomienia"
          >
            <Bell className="w-5 h-5 text-[#666]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#dc3545] rounded-full" />
          </button>

          <button
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#F2F2F2] transition-colors"
            aria-label="Profil użytkownika"
          >
            <User className="w-5 h-5 text-[#666]" />
            <span className="text-[#666]">Jan Kowalski</span>
          </button>
        </div>
      </div>
    </header>
  );
}
