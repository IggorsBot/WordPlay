from django.db import models
from django.utils import timezone
from django.apps import apps
from accounts.models import Person


class Dictionary(models.Model):
    title = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True)
    owner = models.ForeignKey(Person, related_name='dictionaries', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ('title',)
        verbose_name = 'dictionary'
        verbose_name_plural = 'dictionaries'

    def __str__(self):
        return self.title

    def getUpdatedTime(self):
        td = timezone.now() - self.updated

        if td.days // 30 > 0:
            if td.days // 30 >= 5:
                return "{} месяцев назад".format(td.days // 30)
            elif td.days // 30 >=2:
                return "{} месяца назад".format(td.days // 30)
            else:
                return "1 месяц назад"
        elif td.days > 0:
            if td.days >= 5:
                return "{} дней назад".format(td.days)
            elif td.days // 30 >=2:
                return "{} дня назад".format(td.days)
            else:
                "1 день назад"
        elif td.seconds // 3600 > 0:
            if td.seconds // 3600 >= 5:
                return "{} часов назад".format(td.seconds // 3600)
            elif td.seconds // 3600 >=2:
                return "{} часа назад".format(td.seconds // 3600)
            else:
                return "1 час назад".format(td.seconds // 3600)
        elif td.seconds // 60 % 60 > 0:
            if td.seconds // 60 % 60 >= 5:
                if td.seconds // 60 % 60 % 10 >=5:
                    return "{} минут назад".format(td.seconds // 60 % 60)
                elif td.seconds // 60 % 60 % 10 >=2:
                    return "{} минуты назад".format(td.seconds // 60 % 60)
                else:
                    return "{} минуту назад".format(td.seconds // 60 % 60)
            elif td.seconds // 60 % 60 >=2:
                return "{} минуты назад".format(td.seconds // 60 % 60)
            else:
                return "1 минуту назад"
        return "1 минуту назад"



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
