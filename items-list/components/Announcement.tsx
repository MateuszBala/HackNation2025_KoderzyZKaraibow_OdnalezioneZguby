import { useEffect, useState } from "react"
import { Card } from "./ui/Card";
import { formatDate, getDaysRemaining, labels } from "@/utils/helpers";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";
import { Calendar, CheckCircle, Clock, MapPin, Package, XCircle } from "lucide-react";
import { IAnnouncement, IItem, IItemType } from "@/types/types";
import { ErrorCard, LoadingCard } from "./cards";

interface Props{
    id: number;
}

/**
 * Announcement details page
 * @param {number} id id of announcement
 */
export default function Announcement({id}:Props){
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [announcement, setAnnouncement] = useState<IAnnouncement>();

    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}announcements/${id}`, {
            method: "GET",
        }).then(async (res)=>{
            if(res.ok){
                const data = await res.json();
                setAnnouncement({...data, createdAt: new Date(data.createdAt), foundDate: new Date(data.foundDate), returnDate: new Date(data.returnDate)});
                setLoading(false);
            }
        }).catch(()=>{
            setLoading(false)
            setError(true)
        })
    }, [id]);

    if (error || !announcement)
        return <ErrorCard/>

    if (loading)
        return <LoadingCard/>

    const daysRemaining = getDaysRemaining(announcement.returnDate);
    const allItemsDestroyed = announcement.items.every(item => item.isDestroyed);

    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                    <h1 className="mb-2">Ogłoszenie #{announcement.documentIdentyficator}</h1>
                    <div className="flex items-center gap-2">
                    {allItemsDestroyed ? (
                        <Badge variant="neutral">Zniszczony</Badge>
                    ) : announcement.returned ? (
                        <Badge variant="success">Odebrany</Badge>
                    ) : (
                        <Badge variant="warning">Czeka na odbiór</Badge>
                    )}
                    <Badge variant="neutral">
                        {announcement.items.length} {announcement.items.length === 1 ? 'przedmiot' : announcement.items.length < 5 ? 'przedmioty' : 'przedmiotów'}
                    </Badge>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={()=>router.back()}>
                        Wróć do listy
                    </Button>
                </div>
                </div>

                <div className="space-y-6">
                {!allItemsDestroyed && !announcement.returned && (
                    <div className="bg-[#F2F2F2] p-4 rounded-[2px] border border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-5 h-5 text-[#0052A5]" />
                            <h3>Pozostały czas na odbiór</h3>
                            </div>
                            <p className={`ml-7 ${daysRemaining < 10 ? 'text-[#dc3545]' : 'text-[#666]'}`}>
                                {daysRemaining} {daysRemaining === 1 ? 'dzień' : 'dni'}
                                {daysRemaining < 10 && ' (termin zbliża się do końca)'}
                            </p>
                        </div>
                    </div>
                )}

                {announcement.returned && (
                    <div className="bg-[#d4edda] p-4 rounded-[2px] border border-[#c3e6cb]">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-[#155724]" />
                        <h3>Przedmioty odebrane</h3>
                    </div>
                    <p className="ml-7 text-[#155724]">
                        Przedmioty zostały odebrane przez właściciela.
                    </p>
                    {announcement.owner && announcement.owner.length > 0 && (
                        <p className="ml-7 text-[#155724] mt-2">
                            Właściciel: {announcement.owner}
                        </p>
                    )}
                    </div>
                )}

                {allItemsDestroyed && (
                    <div className="bg-[#e2e3e5] p-4 rounded-[2px] border border-[#d6d8db]">
                    <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-5 h-5 text-[#383d41]" />
                        <h3>Wszystkie przedmioty zniszczone</h3>
                    </div>
                    <p className="ml-7 text-[#383d41]">
                        Wszystkie przedmioty zostały zniszczone po upływie terminu odbioru.
                    </p>
                    </div>
                )}

                <div>
                    <h2 className="mb-4 pb-2 border-b border-[#E5E5E5]">Przedmioty</h2>
                    <div className="space-y-3">
                    {announcement.items.map((item: IItem) => (
                        <div 
                        key={item.itemId} 
                        className={`p-4 rounded-[2px] border ${item.isDestroyed ? 'bg-[#f8f9fa] border-[#dee2e6]' : 'bg-white border-[#E5E5E5]'}`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3>{item.title}</h3>
                                        {item.isDestroyed && <Badge variant="neutral">Zniszczony</Badge>}
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-[#666]">
                                        <span className="flex items-center gap-1">
                                        <Package className="w-4 h-4" />
                                            {labels[item.type as IItemType]}
                                        </span>
                                        <span>•</span>
                                        <span>{item.category}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                <div>
                    <h2 className="mb-4 pb-2 border-b border-[#E5E5E5]">Informacje o miejscu</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-[#0052A5]" />
                        <h4>Powiat</h4>
                        </div>
                        <p className="ml-7 text-[#666]">{announcement.district}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-[#0052A5]" />
                        <h4>Miejsce znalezienia</h4>
                        </div>
                        <p className="ml-7 text-[#666]">{announcement.foundLocation}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-[#0052A5]" />
                        <h4>Miejsce odbioru</h4>
                        </div>
                        <p className="ml-7 text-[#666]">{announcement.returnLocation}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-5 h-5 text-[#0052A5]" />
                        <h4>Data znalezienia</h4>
                        </div>
                        <p className="ml-7 text-[#666]">{formatDate(announcement.foundDate)}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-5 h-5 text-[#0052A5]" />
                        <h4>Termin odbioru</h4>
                        </div>
                        <p className="ml-7 text-[#666]">{formatDate(announcement.returnDate)}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-5 h-5 text-[#0052A5]" />
                        <h4>Data dodania ogłoszenia</h4>
                        </div>
                        <p className="ml-7 text-[#666]">{formatDate(announcement.createdAt)}</p>
                    </div>
                    </div>
                </div>

                <div className="text-[#999] border-t border-[#E5E5E5] pt-4">
                    <p>ID ogłoszenia: #{announcement.anouncementId}</p>
                </div>
                </div>
            </Card>
        </div>
    );
}