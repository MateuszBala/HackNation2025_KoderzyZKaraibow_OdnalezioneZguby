"use client"
import AdminAnnouncements from "@/components/Announcements/AdminAnnouncements";
import { useAuth } from "@/services/userProvider";
import { useRouter } from "next/navigation";

export default function Page(){
    const {user} = useAuth();
    const router = useRouter();

    if(user && user.role == "admin")
        return <AdminAnnouncements/>;
    return router.push("/")
}