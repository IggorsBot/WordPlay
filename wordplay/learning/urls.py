from django.urls import path, re_path
from . import api as views
from frontend import views as frontend_views

name = 'learning'
urlpatterns = [
    path('api/dictionaries/', views.DictionaryListView.as_view()),
    path('api/dictionaries/detail/<int:pk>', views.DictionaryDetailView.as_view()),
    path('api/dictionaries/create', views.DictionaryCreateView.as_view()),
    path('api/dictionary/update/<int:id>', views.DictionaryUpdateView.as_view()),

    path('api/word/create/', views.WordCreateView.as_view()),
    path('api/word/detail/<int:pk>', views.WordDetailView.as_view()),

    path('api/dictionary/words/<int:pk>', views.WordOfDictionary.as_view()),


    path('api/dictionary/words/learning/<int:pk>', views.WordForLearning.as_view()),

    re_path(r'^(?:.*)/?$', frontend_views.index, name='index'),
]
