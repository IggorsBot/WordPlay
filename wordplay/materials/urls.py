from django.urls import path, re_path
from . import api as views
from frontend import views as frontend_views

name = 'materials'
urlpatterns = [
    path('api/books/', views.BookListView.as_view()),
    path('api/book/detail/<int:slug>', views.BookDetailView.as_view()),

    re_path(r'^(?:.*)/?$', frontend_views.index, name='index'),
]
