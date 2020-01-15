from django.urls import path
from . import api as views

app_name = 'blog'

urlpatterns = [
    path('api/posts', views.PostListView.as_view()),
    path('api/posts/detail/<int:id>', views.PostDetailView.as_view()),

    path('api/comments/<int:id>', views.CommentView.as_view()),
]
