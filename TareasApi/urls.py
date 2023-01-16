from .views import getRoutes, getTareas, getTarea, updateTarea, deleteTarea, crearTarea, getTiempoTareas, getUser, getAllTareas
from django.urls import path


urlpatterns = [
    path('', getRoutes, name="Rutas"),
    path('tareas', getTareas, name="Tareas"),
    path('tareas/<str:pk>/update', updateTarea, name="TareaActualizar"),
    path('tareas/<str:pk>/delete', deleteTarea, name="TareaEliminar"),
    path('tareas/create', crearTarea, name="TareaCrear"),
    path('obtenerUsuario', getUser, name="Usuario"),
    path('tareas/<str:pk>/', getTarea, name="Tarea"),
    path('alltareas', getAllTareas, name='TodasTareas'),
    path('tiempo_tareas', getTiempoTareas, name='tiempoTareas'),
]
