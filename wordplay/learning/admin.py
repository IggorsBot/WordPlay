from django.contrib import admin
from .models import Dictionary, Word


@admin.register(Dictionary)
class DictionaryAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug']
    list_filter = ['title']


@admin.register(Word)
class WordAdmin(admin.ModelAdmin):
    list_display = ['ru_word', 'en_word', 'status', 'date_of_changes', 'created', 'updated']
    list_filter = ['ru_word', 'en_word']
