from django.db import models


class Product(models.Model):
    title = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200)
    info = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)


class Book(Product):
    author = models.CharField(max_length=200)
    about_the_author = models.TextField(null=True, blank=True)
    image = models.ImageField()
    level = models.CharField(max_length=100)
