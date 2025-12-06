from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

@csrf_exempt
def index(request):
    if request.method == "GET":
        return HttpResponse("Static GET response from consumer")
    if request.method == "POST":
        return HttpResponse("Static POST response from consumer")
