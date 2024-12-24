# Generated by Django 5.0.3 on 2024-05-02 02:12

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookly', '0008_remove_comment_book_comment_chapter_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Bookmark',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('page', models.IntegerField(blank=True, null=True)),
                ('chapter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookmarks', to='bookly.chapter')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddConstraint(
            model_name='bookmark',
            constraint=models.UniqueConstraint(fields=('user', 'chapter'), name='unique_bookmark'),
        ),
    ]
