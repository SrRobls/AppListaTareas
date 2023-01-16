from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class Tiempo_tarea(models.Model):

    tiempo = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.tiempo


class Tarea(models.Model):

    titulo = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=150)
    tiempo_tarea = models.ForeignKey(Tiempo_tarea, on_delete = models.CASCADE)

    fk_idUsuario = models.ForeignKey(User, on_delete = models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created"]
        db_table = "Tarea"
        verbose_name_plural = "Tareas"
        verbose_name = "Tarea"

    def __str__(self) -> str:
        return self.titulo