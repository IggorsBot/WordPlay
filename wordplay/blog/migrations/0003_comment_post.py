# Generated by Django 3.0.2 on 2020-01-17 20:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_remove_comment_post'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='post',
            field=models.ForeignKey(default=4, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='blog.Post'),
            preserve_default=False,
        ),
    ]
