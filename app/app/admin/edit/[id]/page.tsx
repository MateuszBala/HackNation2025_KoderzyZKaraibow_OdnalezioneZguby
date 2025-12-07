"use client"
import ErrorCard from "@/components/Cards/ErrorCard";
import LoadingCard from "@/components/Cards/LoadingCard";
import { AddEditForm } from "@/components/Forms/AddEditForm";
import { useGetByIdQuery } from "@/services/announcements";
import { useParams } from "next/navigation";

export default function Page(){
    const params = useParams();
    const {data, isLoading, isError} = useGetByIdQuery(parseInt(params.id?.toString() ?? '0'))
    
    if(isLoading)
        return <LoadingCard/>

    if(isError)
        return <ErrorCard/>

    if(!data)
        return;

    return <AddEditForm announcement={{...data, createdAt: new Date(data.createdAt), foundDate: new Date(data.foundDate), returnDate: new Date(data.foundDate)}}/>
}