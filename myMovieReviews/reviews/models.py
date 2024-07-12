from django.db import models

class Review(models.Model):
    title = models.CharField(max_length=100)
    release_year = models.IntegerField()
    genre = models.CharField(max_length=100)
    rating = models.IntegerField()
    director = models.CharField(max_length=100)
    main_actor = models.CharField(max_length=100)
    running_time = models.IntegerField()
    content = models.TextField()
    image = models.ImageField(upload_to='posters/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
