from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("creds/", views.creds, name="creds"),
    path("add/", views.add, name="add"),
    path("edit/", views.edit, name="edit"),
]