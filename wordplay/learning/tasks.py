from wordplay.celery import app
from .models import Word
from django.utils import timezone
from datetime import timedelta


@app.task(name='change_status')
def change_status_of_word():
    print('change status')

    for word in Word.objects.all():
        if word.status != "Необходимо повторить":
            if word.progress == 1 and timezone.now() - word.date_of_changes > timedelta(hours=1):
                word.status = "Необходимо повторить"
                word.save()

            elif word.progress == 2 and timezone.now() - word.date_of_changes > timedelta(days=1):
                word.status = "Необходимо повторить"
                word.save()

            elif word.progress == 3 and timezone.now() - word.date_of_changes > timedelta(weeks=2):
                word.status = "Необходимо повторить"
                word.save()

            elif word.progress == 4 and timezone.now() - word.date_of_changes > timedelta(weeks=8):
                word.status = "Необходимо повторить"
                word.save()
    return 'change status'
