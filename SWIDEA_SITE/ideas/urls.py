from django.urls import path
from . import views

urlpatterns = [
    path('', views.idea_list, name='idea_list'),
    path('idea/<int:pk>/', views.idea_detail, name='idea_detail'),
    path('idea/new/', views.idea_new, name='idea_new'),
    path('idea/<int:pk>/edit/', views.idea_edit, name='idea_edit'),
    path('idea/<int:pk>/delete/', views.idea_delete, name='idea_delete'),
    path('devtools/', views.devtool_list, name='devtool_list'),
    path('devtool/<int:pk>/', views.devtool_detail, name='devtool_detail'),
    path('devtool/new/', views.devtool_new, name='devtool_new'),
    path('devtool/<int:pk>/edit/', views.devtool_edit, name='devtool_edit'),
    path('devtool/<int:pk>/delete/', views.devtool_delete, name='devtool_delete'),
]

urlpatterns += [
    path('idea/<int:pk>/star/', views.idea_star, name='idea_star'),
    path('idea/<int:pk>/interest/<str:action>/', views.idea_interest, name='idea_interest'),
]
