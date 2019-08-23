
import logging as log
from rest_framework.serializers import (HyperlinkedIdentityField, SerializerMethodField,
                                        ModelSerializer
                                        )

from django.contrib.auth import get_user_model
from .models import Blog
from users.models import Profile

User = get_user_model()

# for BLOG CREATE
class BlogCreateSerializer(ModelSerializer):
    class Meta:
        model = Blog
        fields = [
            'title',
            'content',
            'publish',
            'image',
            'tags'
        ]
    
    def to_internal_value(self, data):
        ret = super().to_internal_value(data)
        if ret.get('tags'):
            ret['tags'] = ret['tags'][0].split(",")

        return ret

# for BLOG LIST
class BlogProfileListSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'bio',
            'location',
            'phone'
        ]


class BlogUserDetailSerializer(ModelSerializer):
    profile = BlogProfileListSerializer(read_only=True)
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
            'profile'
        ]


class BlogListSerializer(ModelSerializer):
    user = BlogUserDetailSerializer(read_only=True)
    class Meta:
        model = Blog
        fields = [
            'title',
            'pk',
            'user',
            'read_time',
            'publish',
            'claps',
            'tags'
        ]


# Detail serializer
class BlogDetailSerializer(ModelSerializer):
    user = BlogUserDetailSerializer(read_only=True)
    # url = post_detail_url
    # image = SerializerMethodField()
    # html = SerializerMethodField()
    # comments = SerializerMethodField()

    class Meta:
        model = Blog
        fields = [
            'pk',
            'id',
            'user',
            'title',
            'slug',
            'content',
            'read_time',
            # 'html',
            'publish',
            'image',
            'tags'
            # 'comments',
        ]

    # def get_html(self, obj):
    #     return obj.get_markdown()

    def get_image(self, obj):
        try:
            image = obj.image.url
        except:
            image = None
        return image

    # def get_comments(self, obj):
    #     c_qs = Comment.objects.filter_by_instance(obj)
    #     comments = CommentSerializer(c_qs, many=True).data
    #     return comments
