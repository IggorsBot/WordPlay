# Generated by Django 3.0.2 on 2020-01-14 17:09

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('learning', '0004_auto_20200114_1458'),
    ]

    operations = [
        migrations.AlterField(
            model_name='word',
            name='date_of_changes',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
