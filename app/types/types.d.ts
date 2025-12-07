export type IItemType = 'small' | 'medium' | 'big';

export interface IAnnouncementFilter {
  district: string,
  title: string, 
  documentIdent: string;
  type: ItemType|"", 
  category: string, 
  foundLocation: string, 
  foundDate?: Date
}

export interface IApiFilters extends IAnnouncementFilter {
  foundDate: string
}

export interface IItem{
    itemId: number;
    title: string;
    type: ItemType;
    category: string;
    isDestroyed: boolean;
}

export interface IAnnouncement {
    announcementId:number;  
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

export interface IUser{
  email: string;
  role: "user"|"admin"
}