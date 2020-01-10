from rest_framework import generics
from .serializers import WordListSerializer, DictionaryListSerializer, \
    WordDetailSerializer, DictionaryDetailSerializer
from .models import Word, Dictionary
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from .pagination import WordOfDictionaryPagination
from django.utils import timezone
from django.apps import apps


Person = apps.get_model('accounts', 'Person')



class DictionaryListView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = DictionaryListSerializer

    def get_queryset(self):
        return Person.objects.get(user=self.request.user).dictionaries.all()


class DictionaryDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DictionaryDetailSerializer
    queryset = Dictionary.objects.all()

    def delete(self, request, *args, **kwargs):
        dictionary = Dictionary.objects.get(id=kwargs['pk'])
        dictionary.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DictionaryCreateView(generics.CreateAPIView):
    """ Create new dictionary """
    serializer_class = DictionaryDetailSerializer

    def post(self, request, *args, **kwargs):
        person = Person.objects.get(user=request.user)
        request.data.update({'owner': person.id})
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        dictionary = serializer.save()
        return Response({
            "dictionary": DictionaryDetailSerializer(dictionary, context=self.get_serializer_context()).data,
        })


class WordCreateView(generics.GenericAPIView):
    """ Create new word """
    serializer_class = WordDetailSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        word = serializer.save()
        return Response({
            "word": WordDetailSerializer(word, context=self.get_serializer_context()).data,
        })


class WordDetailView(generics.RetrieveUpdateDestroyAPIView):
    """ Delete and edit word """
    serializer_class = WordDetailSerializer
    queryset = Word.objects.all()

    def put(self, request, *args, **kwargs):
        word = Word.objects.get(id=kwargs['pk'])
        serializer = WordDetailSerializer(word, data=request.data)
        if serializer.is_valid():
            serializer.save()
            word.date_of_changes = timezone.now()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        word = Word.objects.get(id=kwargs['pk'])
        word.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class WordOfDictionary(generics.ListAPIView):
    """ All words of dictionary with pagination """
    serializer_class = WordListSerializer
    pagination_class = WordOfDictionaryPagination

    def get_queryset(self):
        person = Person.objects.get(user=self.request.user)
        dictionary = Dictionary.objects.get(id=self.kwargs['pk'])
        return dictionary.dict_words.order_by('-id')


class WordForLearning(generics.ListAPIView):
    """ All words of dictionary """
    serializer_class = WordListSerializer

    def get_queryset(self):
        person = Person.objects.get(user=self.request.user)
        dictionary = Dictionary.objects.get(id=self.kwargs['pk'])
        return dictionary.dict_words.all()
