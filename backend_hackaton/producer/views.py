from dataclasses import dataclass, asdict
from datetime import date
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from . import filters
from typing import List
from enum import Enum
import xml.etree.ElementTree as ET
from xml.dom import minidom

class ItemType(Enum):
    SMALL = "small"
    MEDIUM = "medium"
    BIG = "big"

@dataclass
class Anouncement:
    anouncement_id: int
    document_identyficator: str
    items: List[str]
    owner: str               #  tylko dla uprawnionego użytkownika
    returned: bool
    district: str            #  powiat
    found_location: str       #  miasto, ulica || miejsce
    return_location: str      #  miasto, ulica || miejsce
    created_at: date
    found_date: date
    return_date: date       #  termin odbioru

@dataclass
class Item:
    item_id: int
    title: str
    item_type: ItemType
    category: str
    is_destroyed: bool

@dataclass
class DataRecord:
    anouncement: Anouncement
    item: Item

#  FOR TEST ONLY
test_data_record = DataRecord(
    Anouncement(1,
                "abc1",
                ["12","34"],
                "mrb",
                True,
                "dist9",
                "Byd",
                "Byd",
                date(2025, 12, 12),
                date(2025, 12, 12),
                date(2025, 12, 12)),
    Item(1,
         "title",
         ItemType("small"),
         "exp",
         True))
#  END OF TEST DATA

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
def get_id(request):
    if request.method == "GET":
        anouncement_id = request.GET.get("distinkt")
        records = read_all_records(count=-1)
        # record = filter_by_anouncement_id(records, anouncement_id)
        record = test_data_record
        out_xml_str = record_to_xml(record)
        return HttpResponse(f"Dynamic POST response from producer \'{out_xml_str}\'")
    else:
        return HttpResponse("Static POST response from producer")

@csrf_exempt
def get_all(request, district='all', count=-1):
    if request.method != "GET":
        return HttpResponse("Wrong method", status=400)

    GET = request.GET

    title, item_type, category, found_location, found_date = GET.get("title"), GET.get("item_type"), GET.get("category"), GET.get("found_location"), GET.get("found_date")

    records = dict[str:str]

    if count == 0:
        return HttpResponse("Count can't be equal to 0", status=400)

    if count > 0:
        records = read_all_records(count)

    if district:
        records = filters.filter_by_distinkt(records, district)

    if title:
        records = filters.filter_by_title(records, title)
    if item_type:
        records = filters.filter_by_item_type(records, item_type)
    if category:
        records = filters.filter_by_category(records, category)
    if found_location:
        records = filters.filter_by_found_location(records, found_location)
    if found_date:
        records = filters.filter_by_found_date(records, found_date)

    # out_xml_str = multiple_records_to_xml(records)
    return HttpResponse(records, headers={"Content-Type": "application/json"} ,status=200)