import { ItemType } from "./Item";

export interface ItemFilters {
  title: string, 
  type: ItemType|"", 
  category: string, 
  foundLocation: string, 
  foundDate: Date
}