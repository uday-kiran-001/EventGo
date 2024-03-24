from django.contrib.auth.hashers import make_password, check_password
from django.db import models



class User(models.Model):
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255, default = 'root')

    def set_password(self, password):
        self.password_hash = make_password(password)

    def check_password(self, password):
        return check_password(password, self.password_hash)
    

class Event(models.Model):
    event_title = models.CharField(max_length = 50)
    start_date = models.DateField()
    end_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    description = models.TextField()
    location = models.CharField(max_length = 50)
    image = models.ImageField(upload_to= 'images/')
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    # on delete is used because when the referenced user is deleted, also delete the likes and events associated with that user.

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # A user can like many events and an event can be liked by many users.
    liked_events = models.ManyToManyField(Event)
