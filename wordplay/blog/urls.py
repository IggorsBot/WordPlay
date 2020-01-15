from django.urls import path
from . import api as views

app_name = 'blog'

urlpatterns = [
    path('api/posts', views.PostListView.as_view()),
    path('api/posts/detail/<slug:slug>', views.PostDetailView.as_view()),

    path('api/comments/<slug:slug>', views.CommentView.as_view()),
]
