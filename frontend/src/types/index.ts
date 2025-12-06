export type ItemType = 'small' | 'medium' | 'big';

export interface FoundItem {
  id: number;
  title: string;
  desc: string;
  type: ItemType;
  returned: boolean;
  isDestroyed: boolean;
  location: string;
  createdAt: Date;
}

export interface ItemFilters {
  title: string;
  type: ItemType | '';
  location: string;
  returned: boolean | '';
}