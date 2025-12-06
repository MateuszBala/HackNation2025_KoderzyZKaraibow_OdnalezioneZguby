import { FoundItem, ItemType } from "@/interfaces/ItemFilters";

export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
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

// export function exportToCSV(items: FoundItem[]): void {
//   const headers = ['ID', 'Nazwa', 'Opis', 'Typ', 'Lokalizacja', 'Data dodania', 'Status'];
//   const rows = items.map((item) => [
//     item.id,
//     `"${item.title}"`,
//     `"${item.desc}"`,
//     getTypeLabel(item.type),
//     `"${item.location}"`,
//     formatDate(item.createdAt),
//     item.isDestroyed ? 'Zniszczony' : item.returned ? 'Odebrany' : 'Czeka na odbiór',
//   ]);

//   const csvContent = [
//     headers.join(','),
//     ...rows.map((row) => row.join(',')),
//   ].join('\n');

//   const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
//   const link = document.createElement('a');
//   const url = URL.createObjectURL(blob);
//   link.setAttribute('href', url);
//   link.setAttribute('download', `rzeczy-znalezione-${new Date().getTime()}.csv`);
//   link.style.visibility = 'hidden';
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }