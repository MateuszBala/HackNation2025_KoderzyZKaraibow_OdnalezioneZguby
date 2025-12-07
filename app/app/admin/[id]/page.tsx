"use client"
import AnnouncementDetails from "@/components/Announcements/AnnouncementDetails";
import { useParams } from "next/navigation";

export default function Page(){
    const params = useParams();
    return <AnnouncementDetails id={parseInt(params.id?.toString() ?? '0')}/>
}