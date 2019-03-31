from rest_framework.serializers import (HyperlinkedIdentityField, SerializerMethodField,
                                        ModelSerializer
                                        )

from django.contrib.auth import get_user_model
from .models import Blog
# from users.serializers import UserDetailSerializer
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
        ]


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
            'id',
            'user',
            'title',
            'slug',
            'content',
            # 'html',
            'publish',
            'image',
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




