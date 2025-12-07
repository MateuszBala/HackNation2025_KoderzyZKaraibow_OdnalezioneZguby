from django.urls import path

from . import views

urlpatterns = [
    path("", views.get_all, name="get_all"),
    path("<int:id>/", views.get_id, name="get_id"),
]


