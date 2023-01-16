from .views import login, createUser, logout
from django.urls import path

urlpatterns = [
    path('login', login, name = 'Login'),
    path('crearUsuario', createUser, name='crear'),
    path('logout', logout, name = 'logout')
]
