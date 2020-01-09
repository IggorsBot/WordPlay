from django.db import models
from django.utils import timezone


class Dictionary(models.Model):
    title = models.CharField(max_length=100)
    owner = models.ForeignKey(Person, related_name='dictionaries', on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Word(models.Model):
    ru_word = models.CharField(max_length=100)
    en_word = models.CharField(max_length=100)
    example = models.CharField(max_length=300, blank=True)
    status = models.CharField(blank=True, default="Необходимо повторить", max_length=50)
    progress = models.IntegerField(default=1)
    date_of_changes = models.DateTimeField(default=timezone.now())
    img = models.ImageField(blank=True)
    dictionary = models.ForeignKey(Dictionary, related_name='dict_words', on_delete=models.CASCADE)

    def __str__(self):
        return '{}: {}'.format(self.ru_word, self.en_word)
