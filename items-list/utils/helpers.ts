import { IItemType } from "@/types/types";

/**
 * Formating date to dd.mm.yyyy
 * @param {Date} date date to format 
 * @returns {string} formated date
 */
export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

/**
 * Formating date to yyyy-mm-dd
 * @param {Date} date date to format 
 * @returns {string} formated date
 */
export function formatToFieldDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

const labels: Record<IItemType, string> = {
  small: 'Mały',
  medium: 'Średni',
  big: 'Duży',
};

/**
 * Calculator for remaining days
 * @param {Date} termin date when item/s must be returned
 * @returns {number} days between now and termin
 */
export function getDaysRemaining(termin: Date): number {
  const now = new Date();
  const diff = termin.getTime() - now.getTime();
  const daysPassed = Math.floor(diff / (1000 * 60 * 60 * 24));
  return Math.max(0, daysPassed);
}