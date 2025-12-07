from django.urls import path

from . import views

urlpatterns = [
    path("add", views.add, name="add"),
    path("", views.edit, name="edit"),
    path("", views.get_all, name="get_all"),
    path("<int:id>/", views.get_id, name="get_id"),
]


