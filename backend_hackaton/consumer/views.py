from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

@csrf_exempt
def index(request):
    if request.method == "GET":
        return HttpResponse("Static GET response from consumer")
    if request.method == "POST":
        return HttpResponse("Static POST response from consumer")

@csrf_exempt
def creds(request):
    if request.method == "POST":
        return HttpResponse("This is placeholder for creds request")

@csrf_exempt
def add(request):
    if request.method == "POST":
        return HttpResponse("This is placeholder for add request")

@csrf_exempt
def edit(request):
    if request.method == "PUT":
        return HttpResponse("This is placeholder for edit request")
