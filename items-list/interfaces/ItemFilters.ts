export type ItemType = 'small' | 'medium' | 'big';

export interface Item{
    id: number;
    title: string;
    type: "small"|"medium"|"big";
}

export interface FoundItem {
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

export interface ItemFilters {
  title: string;
  type: ItemType | '';
  location: string;
  returned: boolean | '';
}