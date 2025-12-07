from typing import List
from enum import Enum
import xml.etree.ElementTree as ET
from xml.dom import minidom
from dataclasses import dataclass, asdict
from datetime import date

class ItemType(Enum):
    SMALL = "small"
    MEDIUM = "medium"
    BIG = "big"

@dataclass
class Item:
    item_id: int
    title: str
    item_type: ItemType
    category: str
    is_destroyed: bool

@dataclass
class Anouncement:
    anouncement_id: int
    document_identyficator: str
    items: List[Item]
    owner: str               #  tylko dla uprawnionego użytkownika
    returned: bool
    district: str            #  powiat
    found_location: str       #  miasto, ulica || miejsce
    return_location: str      #  miasto, ulica || miejsce
    created_at: date
    found_date: date
    return_date: date       #  termin odbioru


def itemToJSON(item: Item):
    return {
        "itemId": item.item_id,
        "title": item.title,
        "itemType": item.item_type.value,
        "category": item.category,
        "isDestroyed": item.is_destroyed,
    }

@dataclass
class DataRecord:
    anouncement: Anouncement
    item: Item

def get_mock_items():    return [
        Item(1, "Portfel", ItemType.SMALL, "Accessories", False),
        Item(2, "Plecak", ItemType.MEDIUM, "Bags", False),
        Item(3, "Rower", ItemType.BIG, "Vehicles", True),
        Item(4, "Rower", ItemType.BIG, "Vehicles", True),
        Item(5, "Pierścionek", ItemType.BIG, "Jewelry", True),
    ]

def get_mock_anouncements():
    items = get_mock_items()
    return [
        Anouncement(1, "doc1", [items[0]], "Jan Kowalski", False, "Warszawa", "ul. Marszałkowska 1", "ul. Marszałkowska 1", date(2025, 1, 15), date(2025, 1, 10), date(2025, 2, 10)),
        Anouncement(2, "doc2", [items[1]], "Anna Nowak", True, "Kraków", "ul. Floriańska 5", "ul. Floriańska 5", date(2025, 2, 20), date(2025, 2, 15), date(2025, 3, 15)),
        Anouncement(3, "doc3", [items[2], items[4]], "Piotr Wiśniewski", False, "Gdańsk", "ul. Długa 10", "ul. Długa 10", date(2025, 3, 25), date(2025, 3, 20), date(2025, 4, 20))
        ]

def read_all_records(count):
    return str(count)

def read_anouncement_id(anouncement_id):
    return ""

def record_to_xml(record: DataRecord):
    root = ET.Element("DataRecord")
    anouncement = ET.SubElement(root, "Anouncement")
    anouncement.set("id", str(record.anouncement.anouncement_id))

    ET.SubElement(anouncement, "owner").text = record.anouncement.owner
    ET.SubElement(anouncement, "district").text = record.anouncement.district
    ET.SubElement(anouncement, "foundLocation").text = record.anouncement.found_location
    ET.SubElement(anouncement, "returnLocation").text = record.anouncement.return_location
    ET.SubElement(anouncement, "returned").text = str(record.anouncement.returned)

    ET.SubElement(anouncement, "createdAt").text = record.anouncement.created_at.isoformat()
    ET.SubElement(anouncement, "foundDate").text = record.anouncement.found_date.isoformat()
    ET.SubElement(anouncement, "returnDate").text = record.anouncement.return_date.isoformat()

    items_elem = ET.SubElement(anouncement, "items")
    for item_title in record.anouncement.items:
        ET.SubElement(items_elem, "item").text = item_title

    item = ET.SubElement(root, "Item")
    item.set("id", str(record.item.item_id))
    ET.SubElement(item, "title").text = record.item.title
    ET.SubElement(item, "type").text = record.item.item_type.value
    ET.SubElement(item, "category").text = record.item.category
    ET.SubElement(item, "isDestroyed").text = str(record.item.is_destroyed)

    # Pretty print XML
    rough_string = ET.tostring(root, 'unicode')
    reparsed = minidom.parseString(rough_string)
    return reparsed.toprettyxml(indent="  ")

def multiple_records_to_xml(records: List[DataRecord]):
    return "Output of multiple_records_to_xml"
