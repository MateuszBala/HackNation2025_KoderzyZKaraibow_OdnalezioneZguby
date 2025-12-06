from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("get_all/", views.get_all, name="get_all"),
    path("get_id/", views.get_id, name="get_id"),
]


