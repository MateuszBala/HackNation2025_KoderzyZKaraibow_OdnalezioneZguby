"use client"
import { useParams, useRouter } from "next/navigation";

export default function Page(){
    const params = useParams();
    return <p>{params.office}</p>
}