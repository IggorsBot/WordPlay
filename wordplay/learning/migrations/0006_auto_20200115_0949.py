# Generated by Django 3.0.2 on 2020-01-15 09:49

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('learning', '0005_auto_20200114_1709'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dictionary',
            name='updated',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
