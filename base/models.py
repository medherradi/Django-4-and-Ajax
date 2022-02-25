from distutils.command.upload import upload
from django.db import models

# Create your models here.

class Picture(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    image = models.ImageField(upload_to='images')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.name)
