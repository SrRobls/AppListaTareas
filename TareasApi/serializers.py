from rest_framework.serializers import ModelSerializer
from .models import Tarea, Tiempo_tarea, User

# En este modulo lo que hacemos es convertir los atributos de los modelos obtenido de la base de datos a formato json

class TareaSerializer(ModelSerializer):

    class Meta:
        # con que modelo trabajar
        model = Tarea
        # los campos a convertir __all__ o ['campo1', 'campo2', ...]
        fields = '__all__' 


class TiempoTareaSerializer(ModelSerializer):

    class Meta:
        model = Tiempo_tarea
        fields = '__all__'

class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']