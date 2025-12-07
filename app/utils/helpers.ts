import { ItemType } from "@/types/types";

export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function formatToFieldDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

export function getTypeLabel(type: ItemType): string {
  const labels: Record<ItemType, string> = {
    small: 'Mały',
    medium: 'Średni',
    big: 'Duży',
  };
  return labels[type];
}

export function getDaysRemaining(createdAt: Date): number {
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();
  const daysPassed = Math.floor(diff / (1000 * 60 * 60 * 24));
  const legalRetentionPeriod = 90; // 90 days by law
  return Math.max(0, legalRetentionPeriod - daysPassed);
}