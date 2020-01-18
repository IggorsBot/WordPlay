from django.contrib import admin
from .models import Person

@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('user', 'email')
    list_filter = ('user', 'email')
    search_fields = ('user', 'email')
