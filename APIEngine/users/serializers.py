from rest_framework.serializers import (HyperlinkedIdentityField, SerializerMethodField,
                                        ModelSerializer
                                        )

from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()


class UserDetailSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
        ]


class ProfileListSerializer(ModelSerializer):
    user = UserDetailSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = [
            'user',
            'bio',
            'location',
            'phone'
        ]
