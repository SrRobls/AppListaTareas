from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.Serializer):

    email = serializers.EmailField()
    username = serializers.CharField()
    password = serializers.CharField()


    def create(self, validated_data):
        user = User()
        user.email = validated_data.get('email')
        user.username = validated_data.get('username')
        user.set_password(validated_data.get('password'))
        user.save()
        return user

    def validate_username(self, data):
        users = User.objects.filter(username = data)
        if len(users) > 0:
            raise serializers.ValidationError('Nombre de usuario ya esta en uso. Intenta con otro')
        else:
            return data
