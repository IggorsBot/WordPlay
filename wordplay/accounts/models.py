from django.db import models
from django.conf import settings


class Person(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    email = models.EmailField(max_length=200)
    avatar = models.ImageField(blank=True)

    def __str__(self):
        return self.user.username
