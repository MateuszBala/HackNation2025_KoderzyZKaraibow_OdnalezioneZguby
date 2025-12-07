from django.urls import path

from . import views

urlpatterns = [
    path("<slug:district>/<int:count>/", views.get_all, name="get_all"),
    path("<int:id>/", views.get_id, name="get_id"),
]


