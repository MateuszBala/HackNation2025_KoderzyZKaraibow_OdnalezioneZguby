"use client"
import ItemsList from "@/components/ItemsList";
import { useParams } from "next/navigation";

export default function Page(){
    const params = useParams();
    return <ItemsList office={params.office?.toString() ?? ''}/>
}