from django.contrib import admin

from .models import Author, Book, Chapter, Genre, Comment, Review, Bookmark, Follow, History

admin.site.register(Author)
admin.site.register(Book)
admin.site.register(Chapter)
admin.site.register(Genre)
admin.site.register(Comment)
admin.site.register(Review)
admin.site.register(Bookmark)
admin.site.register(Follow)
admin.site.register(History)
