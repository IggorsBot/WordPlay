from .models import Book
from rest_framework import generics
from .serializers import BookDetailSerializer, BookListSerializer
from rest_framework.response import Response



class BookDetailView(generics.GenericAPIView):
    serializer_class = BookDetailSerializer

    def get(self, request, *args, **kwargs):
        book = Book.objects.get(id=kwargs['id'])
        return Response({
            "book": BookDetailSerializer(book, context=self.get_serializer_context()).data,
        })


class BookListView(generics.ListAPIView):
    serializer_class = BookListSerializer
    queryset = Book.objects.all()
