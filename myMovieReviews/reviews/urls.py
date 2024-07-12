from django.urls import path
from . import views

urlpatterns = [
    path('', views.review_list, name='review_list'),
    path('create/', views.review_create, name='review_create'),
    path('<int:id>/', views.review_detail, name='review_detail'),
    path('<int:id>/edit/', views.review_edit, name='review_edit'),
    path('<int:id>/delete/', views.review_delete, name='review_delete'),
]
