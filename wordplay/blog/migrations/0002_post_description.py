# Generated by Django 3.0.2 on 2020-01-14 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='description',
            field=models.TextField(default='Description for new post'),
            preserve_default=False,
        ),
    ]
