from django.shortcuts import render, HttpResponse
from rest_framework.decorators import api_view
from .serializer import UserSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated


# Create your views here.

@api_view(['POST'])
def login(request):
    # print(f'info {request.GET}')
    usernamee = request.data['username']
    password = request.data['password']
    print(usernamee, password)

    try:
        user = User.objects.get(username = usernamee)
    except User.DoesNotExist:
        return Response('Usuario no existente')

    pwd_valid = check_password(password, user.password)
    if not pwd_valid:
        return Response('Contraseña invalida')
    token, _ = Token.objects.get_or_create(user = user)
    info = {
        "token":token.key,
        "username": user.username,
        "id": user.id
    }
    return Response(info)


@api_view(['POST'])
def createUser(request):
    userInfo = request.data
    verificarUser = User.objects.filter(username=userInfo['username'])

    if verificarUser.exists():
        return Response('nombre de usuario existente')

    serializer = UserSerializer(data = userInfo)
    if serializer.is_valid():
        user = serializer.save()
        return Response('Usuario Creado')
    else:
        return Response(serializer.errors)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    id_user_log = request.data['id']
    token_user_log = Token.objects.get(user_id = id_user_log)
    token_user_log.delete()
    # token_user_log.save()

    user = User.objects.get(id = id_user_log)
    token, _ = Token.objects.get_or_create(user = user)
    token.save()

    return Response('Sesion de usuario finalizada, se le asigno un nuevo token')

