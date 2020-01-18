from rest_framework import generics
from .serializers import PostListSerializer, PostDetailSerializer, CommentSerializer, CommentCreateSerializer
from .models import Post, Comment
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from .pagination import PageNumberPagination
from rest_framework import filters
from accounts.models import Person
from django.shortcuts import get_object_or_404


class PostDetailView(generics.RetrieveAPIView):
    serializer_class = PostDetailSerializer

    def get(self, request, *args, **kwargs):
        try:
            post = Post.objects.get(slug=kwargs['slug'])
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
            post = Post.objects.get(slug=self.kwargs['slug'])
            comments = Comment.objects.filter(post=post)
        except Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return comments


class CommentCreateView(generics.CreateAPIView):
    """ Create new comment """

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = CommentCreateSerializer

    def post(self, request, *args, **kwargs):
        print("request", request.data)
        try:
            person = Person.objects.get(user=request.user)
        except Person.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        request.data.update({'name': person.id})
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        comment = serializer.save()
        return Response({
            "comment": CommentCreateSerializer(comment, context=self.get_serializer_context()).data
        })
