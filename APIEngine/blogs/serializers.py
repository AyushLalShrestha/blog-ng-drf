from rest_framework.serializers import (HyperlinkedIdentityField, SerializerMethodField,
                                        ModelSerializer
                                        )

from django.contrib.auth import get_user_model
from .models import Blog
from users.serializers import UserDetailSerializer

User = get_user_model()


class BlogCreateSerializer(ModelSerializer):
    class Meta:
        model = Blog
        fields = [
            'title',
            'content',
            'publish',
        ]

class BlogListSerializer(ModelSerializer):
    user = UserDetailSerializer(read_only=True)
    class Meta:
        model = Blog
        fields = [
            'user',
            'title',
            'content',
            'read_time',
            'publish',
            'claps',
        ]
