export type ItemType = 'small' | 'medium' | 'big';

export interface AnnouncementFilter {
  district: string,
  title: string, 
  documentIdent: string;
  type: ItemType|"", 
  category: string, 
  foundLocation: string, 
  foundDate: Date
}

export interface ApiFilters extends AnnouncementFilter {
  foundDate: string
}

export interface Item{
    id: number;
    title: string;
    type: ItemType;
    category: string;
    isDestroyed: boolean;
}

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

export interface User{
  email: string;
  role: "user"|"admin"
}