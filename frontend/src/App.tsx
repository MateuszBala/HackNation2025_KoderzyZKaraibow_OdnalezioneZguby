import { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { MainPanel } from './components/MainPanel';
import { ItemForm } from './components/ItemForm';
import { ItemDetail } from './components/ItemDetail';
import { FoundItem } from './types';
import { mockItems } from './data/mockData';

type View = 'list' | 'add' | 'edit' | 'detail';

export default function App() {
  const [items, setItems] = useState<FoundItem[]>(mockItems);
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedItem, setSelectedItem] = useState<FoundItem | null>(null);

  const handleAddItem = () => {
    setSelectedItem(null);
    setCurrentView('add');
  };

  const handleEditItem = (item: FoundItem) => {
    setSelectedItem(item);
    setCurrentView('edit');
  };

  const handleViewDetails = (item: FoundItem) => {
    setSelectedItem(item);
    setCurrentView('detail');
  };

  const handleSaveItem = (itemData: Partial<FoundItem>) => {
    if (currentView === 'edit' && selectedItem) {
      // Edit existing item - preserve returned and isDestroyed flags
      setItems(
        items.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                ...itemData,
                returned: item.returned,
                isDestroyed: item.isDestroyed,
              }
            : item
        )
      );
    } else {
      // Add new item - default to not returned and not destroyed
      const newItem: FoundItem = {
        id: Math.max(...items.map((i) => i.id)) + 1,
        title: itemData.title!,
        desc: itemData.desc!,
        type: itemData.type!,
        returned: false,
        isDestroyed: false,
        location: itemData.location!,
        createdAt: itemData.createdAt!,
      };
      setItems([newItem, ...items]);
    }
    setCurrentView('list');
    setSelectedItem(null);
  };

  const handleMarkAsReturned = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, returned: true, isDestroyed: false } : item
      )
    );
    // Update selectedItem if it's the current one
    if (selectedItem?.id === id) {
      setSelectedItem({ ...selectedItem, returned: true, isDestroyed: false });
    }
  };

  const handleMarkAsDestroyed = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isDestroyed: true, returned: false } : item
      )
    );
    // Update selectedItem if it's the current one
    if (selectedItem?.id === id) {
      setSelectedItem({ ...selectedItem, isDestroyed: true, returned: false });
    }
  };

  const handleCancel = () => {
    setCurrentView('list');
    setSelectedItem(null);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedItem(null);
  };

  const handleEditFromDetail = () => {
    if (selectedItem) {
      setCurrentView('edit');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentView={currentView} />
        
        <main className="flex-1 overflow-y-auto bg-[#F2F2F2]">
          <div className="p-6 lg:p-8">
            {currentView === 'list' && (
              <MainPanel
                items={items}
                onAddItem={handleAddItem}
                onEditItem={handleEditItem}
                onViewDetails={handleViewDetails}
              />
            )}

            {(currentView === 'add' || currentView === 'edit') && (
              <ItemForm
                item={selectedItem || undefined}
                onSave={handleSaveItem}
                onCancel={handleCancel}
              />
            )}

            {currentView === 'detail' && selectedItem && (
              <ItemDetail
                item={selectedItem}
                onEdit={handleEditFromDetail}
                onBack={handleBackToList}
                onMarkAsReturned={handleMarkAsReturned}
                onMarkAsDestroyed={handleMarkAsDestroyed}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}