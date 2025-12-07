from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from datetime import date
from django.http import JsonResponse

import sys
import os
import json

parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(parent_dir)

from common import data
from common import db

class DataRecordDecoder(json.JSONDecoder):
    def __init__(self, *args, **kwargs):
        kwargs['object_hook'] = self.object_hook
        super().__init__(*args, **kwargs)

    def object_hook(self, obj):
        if 'itemType' in obj:
            obj['itemType'] = data.ItemType(obj['itemType'])

        for date_field in ['createdAt', 'foundDate', 'returnDate']:
            if date_field in obj:
                obj[date_field.lower().replace('date', 'date')] = date.fromisoformat(obj[date_field])
                del obj[date_field]

        return obj

def parse_json_to_datarecord(json_data: dict) -> data.DataRecord:
    items_data = json_data['items']
    items = []
    for item_dict in items_data:
        items.append(data.Item(**item_dict))

    anouncement = data.Anouncement(
        anouncement_id=json_data['anouncement_id'],
        document_identyficator=json_data['document_identyficator'],
        items=items,
        owner=json_data['owner'],
        returned=json_data['returned'],
        district=json_data['district'],
        found_location=json_data['found_location'],
        return_location=json_data['return_location'],
        created_at=json_data['created_at'],
        found_date=json_data['found_date'],
        return_date=json_data['return_date']
    )

    item = data.Item(**json_data['item'])

    return data.DataRecord(anouncement=anouncement, item=item)

@csrf_exempt
def add(request):
    if request.method == "POST":
        try:
            body_str = request.body.decode('utf-8')
            json_data = json.loads(body_str, cls=DataRecordDecoder)
            record = parse_json_to_datarecord(json_data)

            db.save_datarecord(record)

            return JsonResponse({
                "status": "success",
                "anouncement_id": record.anouncement.anouncement_id
            })

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except KeyError as e:
            return JsonResponse({"error": f"Missing field: {e}"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "POST only"}, status=405)

@csrf_exempt
def edit(request):
    if request.method == "POST":
        return JsonResponse(status=200)

@csrf_exempt
def get_id(request, id):
    if request.method == "GET":
        anouncement_id = request.GET.get("distinkt")
        mock_anouncements = data.get_mock_anouncements()
        for anouncement in mock_anouncements:
            if anouncement.anouncement_id == id:
                test_data = {
                    "anouncementId": anouncement.anouncement_id,
                    "documentIdentyficator": anouncement.document_identyficator,
                    "items": [data.itemToJSON(item) for item in anouncement.items],
                    "owner": anouncement.owner,
                    "returned": anouncement.returned,
                    "district": anouncement.district,
                    "foundLocation": anouncement.found_location,
                    "returnLocation": anouncement.return_location,
                    "createdAt": anouncement.created_at.isoformat() if anouncement.created_at else None,
                    "foundDate": anouncement.found_date.isoformat() if anouncement.found_date else None,
                    "returnDate": anouncement.return_date.isoformat() if anouncement.return_date else None,
                }
                return JsonResponse(test_data, status=200, json_dumps_params={'ensure_ascii': False})

        return JsonResponse(
            {"error": "Announcement not found"},
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

    records = data.get_mock_anouncements()

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

    for announcement in records:
        data.append({
            "anouncementId": anouncement.anouncement_id,
            "documentIdentyficator": anouncement.document_identyficator,
            "items": [data.itemToJSON(item) for item in anouncement.items],
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

