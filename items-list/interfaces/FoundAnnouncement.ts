import { Item } from "./Item";

export interface FoundAnnouncement {
    id:number;  
    items: Item[];
    owner?: string;
    returned: boolean;
    district: string;
    found_location: string;
    return_location: string;
    createdAt: Date;
    foundDate: Date;
    returnTermin: Date;
}