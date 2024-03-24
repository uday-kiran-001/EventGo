from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = 'home'),
    path('login/', views.login, name = 'login'),
    path('signup/', views.signup, name = 'signup'),
    path('addevent/', views.addEvent, name = 'addEvent'),
    path('likes/', views.likes, name='likes'),
]