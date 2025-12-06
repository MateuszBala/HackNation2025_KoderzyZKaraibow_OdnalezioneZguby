from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

@csrf_exempt
def index(request):
    if request.method == "GET":
        return HttpResponse("Static GET response from producer")
    if request.method == "POST":
        return HttpResponse("Static POST response from producer")

@csrf_exempt
def get_all(request):
    if request.method == "GET":
        return HttpResponse("This is placeholder for get_all request")

@csrf_exempt
def get_id(request):
    if request.method == "GET":
        return HttpResponse("This is placeholder for get_id request")