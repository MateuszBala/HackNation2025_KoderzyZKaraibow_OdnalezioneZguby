from dataclasses import dataclass, asdict
from datetime import date
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from . import filters
from typing import List
from enum import Enum
import xml.etree.ElementTree as ET
from xml.dom import minidom
from django.http import JsonResponse

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
        "item_id": item.item_id,
        "title": item.title,
        "item_type": item.item_type.value,
        "category": item.category,
        "is_destroyed": item.is_destroyed,
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

@csrf_exempt
def get_id(request, id):
    if request.method == "GET":
        anouncement_id = request.GET.get("distinkt")
        mock_anouncements = get_mock_anouncements()
        for anouncement in mock_anouncements:
            if anouncement.anouncement_id == id:
                data = {
                    "id": anouncement.anouncement_id,
                    "documentIdentyficator": anouncement.document_identyficator,
                    "items": [itemToJSON(item) for item in anouncement.items],
                    "owner": anouncement.owner,
                    "returned": anouncement.returned,
                    "district": anouncement.district,
                    "foundLocation": anouncement.found_location,
                    "returnLocation": anouncement.return_location,
                    "createdAt": anouncement.created_at.isoformat() if anouncement.created_at else None,
                    "foundDate": anouncement.found_date.isoformat() if anouncement.found_date else None,
                    "returnDate": anouncement.return_date.isoformat() if anouncement.return_date else None,
                }
                return JsonResponse(data, status=200, json_dumps_params={'ensure_ascii': False})

        return JsonResponse(
            {"error": "Anouncement not found"},
            status=404
        )

    return JsonResponse(
        {"error": "Method not allowed"},
        status=405
    )

@csrf_exempt
def get_all(request):
    if request.method != "GET":
        return JsonResponse({"error": "Wrong method"}, status=405)

    GET = request.GET

    count = GET.get("count", "-1")
    district = GET.get("district")
    title = GET.get("title")
    item_type = GET.get("itemType")
    category = GET.get("category")
    found_location = GET.get("foundLocation")
    found_date = GET.get("foundDate")
    document_identificator = GET.get("documentIdentificator")

    try:
        count = int(count)
    except ValueError:
        return JsonResponse({"error": "count must be integer"}, status=400)

    records = get_mock_anouncements()

    if district:
        records = [
            a for a in records
            if str(a.district).lower() == district.lower()
        ]

    if title:
        records = [a for a in records if title.lower() in str(a.items).lower()]

    if found_location:
        records = [
            a for a in records
            if found_location.lower() in str(a.found_location).lower()
        ]

    if document_identificator:
        records = [
            a for a in records
            if str(a.document_identyficator).lower()
            == document_identificator.lower()
        ]

    if count == 0:
        return JsonResponse({"error": "count can't be 0"}, status=400)

    if count > 0:
        records = records[:count]

    data = []

    for anouncement in records:
        data.append({
            "id": anouncement.anouncement_id,
            "documentIdentyficator": anouncement.document_identyficator,
            "items": [itemToJSON(item) for item in anouncement.items],
            "owner": anouncement.owner,
            "returned": anouncement.returned,
            "district": anouncement.district,
            "foundLocation": anouncement.found_location,
            "returnLocation": anouncement.return_location,
            "createdAt": anouncement.created_at.isoformat() if anouncement.created_at else None,
            "foundDate": anouncement.found_date.isoformat() if anouncement.found_date else None,
            "returnDate": anouncement.return_date.isoformat() if anouncement.return_date else None,
        })

    return JsonResponse(data, safe=False, status=200, json_dumps_params={'ensure_ascii': False})

