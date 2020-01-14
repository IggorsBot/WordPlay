from django.db import models
from django.utils import timezone
from django.apps import apps
from accounts.models import Person


class Dictionary(models.Model):
    title = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True)
    owner = models.ForeignKey(Person, related_name='dictionaries', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('title',)
        verbose_name = 'dictionary'
        verbose_name_plural = 'dictionaries'

    def __str__(self):
        return self.title


class Word(models.Model):
    ru_word = models.CharField(max_length=100)
    en_word = models.CharField(max_length=100)
    example = models.CharField(max_length=300, blank=True)
    status = models.CharField(blank=True, default="Необходимо повторить", max_length=50)
    progress = models.IntegerField(default=1)
    img = models.ImageField(blank=True)
    dictionary = models.ForeignKey(Dictionary, related_name='dict_words', on_delete=models.CASCADE)
    date_of_changes = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('ru_word',)

    def __str__(self):
        return '{}: {}'.format(self.ru_word, self.en_word)
