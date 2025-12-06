export type ItemType = 'small' | 'medium' | 'big';

export interface Item{
    id: number;
    title: string;
    type: ItemType;
    category: string;
    isDestroyed: boolean;
}