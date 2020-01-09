from rest_framework import serializers, generics
from .models import Word, Dictionary, Person


class WordListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = '__all__'


class WordDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = '__all__'


class DictionaryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dictionary
        fields = '__all__'


class DictionaryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dictionary
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        person = Person.objects.get(user=user)
        title = self.validated_data['title']
        return Dictionary.objects.create(owner=person, title=title)
