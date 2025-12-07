"use client"

import Announcement from "@/components/Announcement";
import { useParams } from "next/navigation";

/**
 * Single public announcement by id
 */
export default function Page(){
    const params = useParams();
    return <Announcement id={parseInt(params.id?.toString() ?? '0')}/>
}