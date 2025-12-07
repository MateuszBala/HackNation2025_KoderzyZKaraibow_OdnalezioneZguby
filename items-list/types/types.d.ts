export type IItemType = 'small' | 'medium' | 'big';

export interface IItem{
    id: number;
    title: string;
    type: ItemType;
    category: string;
    isDestroyed: boolean;
}

export interface IAnnouncementFilters {
  title: string, 
  type: ItemType|"", 
  category: string, 
  foundLocation: string, 
  foundDate: Date
}

export interface IAnnouncement {
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