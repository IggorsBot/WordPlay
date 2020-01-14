from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class PublishedManager(models.Manager):
    def get_queryset(self):
        return super(PublishedManager, self).get_queryset().filter(status='published')


class Post(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    title = models.CharField(max_length=250)
    description = models.TextField()
    slug = models.SlugField(max_length=250, unique_for_date='publish')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    body = models.TextField()
    img = models.ImageField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    objects = models.Manager()
    published = PublishedManager()

    class Meta:
        ordering = ('-publish',)

    def __str__(self):
        return self.title

    def getTime(self):
        td = timezone.now() - self.publish

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
