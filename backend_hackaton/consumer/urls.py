from django.urls import path

from . import views

urlpatterns = [
    path("creds/", views.creds, name="creds"),
    path("add/", views.add, name="add"),
    path("edit/", views.edit, name="edit"),
]