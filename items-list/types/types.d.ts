export type IItemType = 'small' | 'medium' | 'big';

export interface IItem{
    itemId: number;
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
    anouncementId:number;
    documentIdentyficator: string;  
    items: Item[];
    owner?: string;
    returned: boolean;
    district: string;
    foundLocation: string;
    returnLocation: string;
    createdAt: Date;
    foundDate: Date;
    returnDate: Date;
}