from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from . import filters

def read_all_records(count):
    return str(count)

@csrf_exempt
def index(request):
    if request.method == "GET":
        return HttpResponse("Static GET response from producer")
    if request.method == "POST":
        return HttpResponse("Static POST response from producer")

@csrf_exempt
def get_id(request):
    if request.method == "GET":
        return read_all_records(count = 100)

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
        return HttpResponse(f"This is placeholder for get_all request {records}")