"use client"

import ItemPage from "@/components/ItemPage";
import { useParams } from "next/navigation";

export default function Page(){
    const params = useParams();
    return <ItemPage office={params.office?.toString() ?? ''} id={parseInt(params.id?.toString() ?? '0')}/>
}