"use client"

import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { useAuth } from "@/services/userProvider";

export default function Navbar(){
  const router = useRouter();
  const {user} = useAuth();

  return (
    <nav className="bg-white border-b border-[#e5e5e5] sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0052a5] rounded-[2px] flex items-center justify-center">
                <span className="text-white">OD</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg mb-0">Otwarte Dane</h1>
                <p className="text-xs text-[#6c757d] mb-0">dane.gov.pl</p>
              </div>
            </div>
          </div>
          {!user && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <Button onClick={()=>{router.push("login")}}>Zaloguj</Button>
              </div>
            </div>
          )}
          {user && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <Button onClick={()=>{router.push("admin")}}>Admin</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}