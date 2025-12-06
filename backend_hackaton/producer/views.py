from dataclasses import dataclass, asdict
from datetime import date
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from . import filters

@dataclass
class Anouncement:
    anouncement_id: int
    items: list[str]
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
    item_type: str              #  (enum(“small”, “medium”, “big”))
    category: str
    is_destroyed: bool

@dataclass
class DataRecord:
    anouncement: Anouncement
    item: Item


def read_all_records(count):
    return str(count)

def read_anouncement_id(anouncement_id):
    return ""

def record_to_xml(record: DataRecord):
    return "Output of record_to_xml"

def multiple_records_to_xml(records: list[DataRecord]):
    return "Output of multiple_records_to_xml"

@csrf_exempt
def get_id(request):
    if request.method == "GET":
        anouncement_id = request.GET.get("distinkt")
        record = read_anouncement_id(anouncement_id)
        out_xml_str = record_to_xml(record)
        return HttpResponse(f"Dynamic POST response from producer \'{out_xml_str}\'")
    else:
        return HttpResponse("Static POST response from producer")

@csrf_exempt
def get_all(request):
    if request.method == "GET":
        records = dict[str:str]
        count = request.GET.get("count")
        if count == None:
            return HttpResponse("ERROR: Record count missing!!!")
        if int(count) == 0:
            return HttpResponse("ERROR: Record count equal to 0!!!")
        records = read_all_records(count)
        distinkt = request.GET.get("distinkt")
        if distinkt:
            records = filters.filter_by_distinkt(records, distinkt)
        title = request.GET.get("title")
        if title:
            records = filters.filter_by_title(records, title)
        item_type = request.GET.get("item_type")
        if item_type:
            records = filters.filter_by_item_type(records, item_type)
        category = request.GET.get("category")
        if category:
            records = filters.filter_by_category(records, category)
        found_location = request.GET.get("found_location")
        if found_location:
            records = filters.filter_by_found_location(records, found_location)
        found_date = request.GET.get("found_date")
        if found_date:
            records = filters.filter_by_found_date(records, found_date)
            out_xml_str = multiple_records_to_xml(records)
        return HttpResponse(f"This is placeholder for get_all request {out_xml_str}")