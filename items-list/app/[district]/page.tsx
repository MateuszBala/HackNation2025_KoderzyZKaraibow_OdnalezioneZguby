"use client"
import AnnouncementsList from "@/components/AnnouncementsList";
import { useParams } from "next/navigation";

/**
 * Announcements public list
 */
export default function Page(){
    const params = useParams();
    return <AnnouncementsList district={params.district?.toString() ?? ''}/>
}