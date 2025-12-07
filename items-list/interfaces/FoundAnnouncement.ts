import { Item } from "./Item";

export interface FoundAnnouncement {
    id:number;  
    items: Item[];
    owner?: string;
    returned: boolean;
    district: string;
    foundLocation: string;
    returnLocation: string;
    createdAt: Date;
    foundDate: Date;
    returnTermin: Date;
}