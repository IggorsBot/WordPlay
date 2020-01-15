from rest_framework import generics
from .serializers import PostListSerializer, PostDetailSerializer, CommentSerializer
from .models import Post, Comment
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from .pagination import PageNumberPagination
from rest_framework import filters


class PostDetailView(generics.RetrieveAPIView):
    serializer_class = PostDetailSerializer

    def get(self, request, *args, **kwargs):
        try:
            post = Post.objects.get(id=kwargs['id'])
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = PostDetailSerializer(post)
        return Response(serializer.data)

class PostListView(generics.ListAPIView):
    serializer_class = PostListSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        posts = Post.objects.all()
        return posts


class CommentView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        try:
            comments = Comment.objects.filter(post_id=self.kwargs['id'])
        except Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return comments
