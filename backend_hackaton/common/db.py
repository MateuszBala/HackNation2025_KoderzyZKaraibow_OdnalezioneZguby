import sqlite3
from contextlib import contextmanager
from datetime import date
from typing import List
import data  # ← Import dataclasses from data.py

@contextmanager
def get_db_connection(db_name="datarecord.db"):
    conn = sqlite3.connect(db_name)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

# 1. CREATE tables
def create_tables():
    with get_db_connection() as conn:
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS announcements (
                anouncement_id INTEGER PRIMARY KEY AUTOINCREMENT,
                document_identyficator TEXT NOT NULL,
                owner TEXT NOT NULL,
                returned BOOLEAN DEFAULT 0,
                district TEXT,
                found_location TEXT,
                return_location TEXT,
                created_at DATE,
                found_date DATE,
                return_date DATE
            );

            CREATE TABLE IF NOT EXISTS items (
                item_id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                item_type TEXT CHECK(item_type IN ('small', 'medium', 'big')),
                category TEXT,
                is_destroyed BOOLEAN DEFAULT 0,
                anouncement_id INTEGER,
                FOREIGN KEY (anouncement_id) REFERENCES announcements (anouncement_id)
            );
        """)
        conn.commit()
        print("✅ Tables created")

# 2. Save DataRecord
def save_datarecord(record: data.DataRecord):
    with get_db_connection() as conn:
        # Insert announcement
        cursor = conn.execute("""
            INSERT INTO announcements (document_identyficator, owner, returned, district, 
                                     found_location, return_location, created_at, 
                                     found_date, return_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            record.anouncement.document_identyficator,
            record.anouncement.owner,
            record.anouncement.returned,
            record.anouncement.district,
            record.anouncement.found_location,
            record.anouncement.return_location,
            record.anouncement.created_at.isoformat(),
            record.anouncement.found_date.isoformat(),
            record.anouncement.return_date.isoformat()
        ))
        anouncement_id = cursor.lastrowid

        # Insert main item
        conn.execute("""
            INSERT INTO items (title, item_type, category, is_destroyed, anouncement_id)
            VALUES (?, ?, ?, ?, ?)
        """, (
            record.item.title,
            record.item.item_type.value,
            record.item.category,
            record.item.is_destroyed,
            anouncement_id
        ))
        conn.commit()
        print(f"✅ Saved DataRecord ID: {anouncement_id}")

# 3. Load DataRecord by announcement_id
def load_datarecord(anouncement_id: int) -> data.DataRecord:
    with get_db_connection() as conn:
        # Get announcement
        ann_cursor = conn.execute("""
            SELECT * FROM announcements WHERE anouncement_id = ?
        """, (anouncement_id,))
        ann_row = ann_cursor.fetchone()
        if not ann_row:
            return None

        # Get related items list
        items_cursor = conn.execute("""
            SELECT * FROM items WHERE anouncement_id = ?
        """, (anouncement_id,))

        # Reconstruct objects
        items = []
        for row in items_cursor:
            items.append(data.Item(
                item_id=row['item_id'],
                title=row['title'],
                item_type=data.ItemType(row['item_type']),
                category=row['category'],
                is_destroyed=bool(row['is_destroyed'])
            ))

        anouncement = data.Anouncement(
            anouncement_id=ann_row['anouncement_id'],
            document_identyficator=ann_row['document_identyficator'],
            items=items,
            owner=ann_row['owner'],
            returned=bool(ann_row['returned']),
            district=ann_row['district'],
            found_location=ann_row['found_location'],
            return_location=ann_row['return_location'],
            created_at=date.fromisoformat(ann_row['created_at']),
            found_date=date.fromisoformat(ann_row['found_date']),
            return_date=date.fromisoformat(ann_row['return_date'])
        )

        # Main item (first from list)
        main_item = items[0] if items else None

        return data.DataRecord(anouncement=anouncement, item=main_item)

# EXAMPLE USAGE (in same file or test script)
if __name__ == "__main__":
    # Import for standalone testing
    import sys
    sys.path.append('.')
    from data import DataRecord, Anouncement, Item, ItemType  # Fallback

    create_tables()

    # Create sample DataRecord
    record = DataRecord(
        anouncement=Anouncement(
            anouncement_id=0,
            document_identyficator="DOC-12345",
            items=[
                Item(0, "Klucz", ItemType.SMALL, "Akcesoria", False),
                Item(0, "Portfel", ItemType.SMALL, "Dokumenty", False)
            ],
            owner="Jan Kowalski",
            returned=False,
            district="Warszawa",
            found_location="Marszałkowska 10",
            return_location="Plac Zamkowy",
            created_at=date(2025, 12, 7),
            found_date=date(2025, 12, 6),
            return_date=date(2025, 12, 10)
        ),
        item=Item(0, "Złoty pierścionek", ItemType.SMALL, "Biżuteria", False)
    )
    
    save_datarecord(record)
    
    # Load back
    loaded = load_datarecord(1)
    if loaded:
        print("\n✅ Loaded DataRecord:")
        print(f"ID: {loaded.anouncement.anouncement_id}")
        print(f"Owner: {loaded.anouncement.owner}")
        print(f"Items: {[item.title for item in loaded.anouncement.items]}")

