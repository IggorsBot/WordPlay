from django.urls import path, re_path, include
from . import api as views
from frontend import views as frontend_views
from knox import views as knox_views



name = 'accounts'
urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', views.RegisterAPI.as_view()),
    path('api/auth/login', views.LoginAPI.as_view()),
    path('api/auth/user', views.UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),

    re_path(r'^(?:.*)/?$', frontend_views.index, name='index'),
]
