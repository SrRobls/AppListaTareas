from django.shortcuts import get_object_or_404
# usamos api_view para mandar informacion con una lista de methodos, de tal forma que los retorne
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user
from .models import Tarea, Tiempo_tarea, User
from .serializers import TareaSerializer, TiempoTareaSerializer, UsuarioSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes

# Create your views here.

# Usamos api_view con el metodo Get, en esta vista vamos a definir los endpoints del proyecto
@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/tareas',
            'method': 'POST',
            'body': None,
            'descrption': 'Retorna las tareas de acuerdo del usuario loggueado'
        },

        {
            'Endpoint': '/tareas/id',
            'method': 'GET',
            'body': None,
            'descrption': 'Retorna la tarea de acuerdo del usuario loggueado y al id de la tarea'
        },

        {
            'Endpoint': '/tareas/create/',
            'method': 'POST',
            'body': {'body': ""},
            'descrption': 'Para crear una tarea que se relaciona con el usuario loggueado'
        },

        {
            'Endpoint': '/tareas/id/delete/',
            'method': 'DELETE',
            'body': None,
            'descrption': 'Elimina una tarea de acuerdo al id de la tarea y al id del usuario loggueado'
        },

        {
            'Endpoint': '/tareas/id/update/',
            'method': 'PUT',
            'body': None,
            'descrption': 'Para actualizar una tarea'
        },

        {
            'Endpoint': '/alltareas/',
            'method': 'GET',
            'body': None,
            'descrption': 'Para obtener todas las tareas'
        },

        {
            'Endpoint': '/tiempo_tareas/',
            'method': 'GET',
            'body': None,
            'descrption': 'Obtener todos los tipo de tiempo disponible de las tareas'
        },

        {
            'Endpoint': '/autenticacion/login/',
            'method': 'POST',
            'body': {'body': ""},
            'descrption': 'Iniciar sesion al recibir un usuario y contraseña valido, se retorna el token, username y id del usuario loggeado'
        },

        {
            'Endpoint': '/autenticacion/logout/',
            'method': 'POST',
            'body': None,
            'descrption': 'Se hace logout del usuario (se hace desde el fron eliminando la informacion del localStorage y se elimina el token y se asigna uno nuevo'
        },

        {
            'Endpoint': '/autenticacion/crearUsuario',
            'method': 'POST',
            'body': {'body': ""},
            'descrption': 'Para crear un nuevo usuario'
        },

    ]

    return Response(data = routes)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getTareas(request):
    tareas = Tarea.objects.all()
    tareas_de_usuario_loggeuado = []
        
    for t in tareas:
            # obtenemos el usuario relacionado con la tarea para luego obtener su id y hacer la comporbacion con el logguea
        if t.fk_idUsuario.id == int(request.data['id']):
            tareas_de_usuario_loggeuado.append(t)
        
    serializer = TareaSerializer(tareas_de_usuario_loggeuado, many=True)

    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getTarea(request, pk):

    # obtenemos la tarea si la tarea no esta relacionada con el usuario, entonces se redirige a la seccion de tareas

    tarea = Tarea.objects.get(id = pk)
    id_user = request.data['id_user']

    if int(tarea.fk_idUsuario.id) != int(id_user):
        return Response('Esta tarea no corresponde a este usuario')
        

    serializer = TareaSerializer(tarea, many = False)
    return Response(serializer.data)
    


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def updateTarea(request, pk):
    data = request.data
    tarea = Tarea.objects.get(id = pk)

    serializer = TareaSerializer(instance = tarea, data = data)

    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def deleteTarea(request, pk):

    tarea = get_object_or_404(Tarea, id=pk)
    id_user = request.data['id_user']

    if int(tarea.fk_idUsuario.id) != int(id_user):
        return Response('Esta tarea no corresponde a este usuario')

    tarea.delete()

    return Response('Tarea Eliminada')


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def crearTarea(request):
    data = request.data
    tiempo_tarea = Tiempo_tarea.objects.get(id = data['tiempo_tarea'])
    usuario = User.objects.get(id = data['fk_idUsuario'])
    tarea = Tarea.objects.create(
        titulo = data['titulo'],
        descripcion = data['descripcion'],

        tiempo_tarea = tiempo_tarea,
        fk_idUsuario = usuario
    )
    tarea.save()
    serializer = TareaSerializer(tarea, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getTiempoTareas(request):

    tiempo_tareas = Tiempo_tarea.objects.all()
    serializer = TiempoTareaSerializer(tiempo_tareas, many = True)

    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getUser(request):

    usuario = get_user(request)
    serilizer = UsuarioSerializer(usuario, many = False)

    return Response(serilizer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getAllTareas(request):

    tareas = Tarea.objects.all()

    serializer = TareaSerializer(tareas, many = True)

    return Response(serializer.data)