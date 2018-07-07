# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.db.models import Q

from rest_framework.filters import ( SearchFilter, OrderingFilter, )
from rest_framework.generics import ( CreateAPIView, DestroyAPIView, ListAPIView, UpdateAPIView,
    RetrieveAPIView, RetrieveUpdateAPIView )

from rest_framework.permissions import ( AllowAny, IsAuthenticated, IsAdminUser, 
    IsAuthenticatedOrReadOnly, )

from models import Blog

# from .pagination import PostLimitOffsetPagination, PostPageNumberPagination
from .permissions import IsOwner
from .serializers import ( BlogCreateSerializer, BlogListSerializer, BlogDetailSerializer )
from .pagination import BlogPageNumberPagination

# Create Blog API
class BlogCreateAPIView(CreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogCreateSerializer
    permission_classes = [ IsAuthenticated ]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# List Blog API
class BlogListAPIView(ListAPIView):
    serializer_class = BlogListSerializer
    filter_backends= [ SearchFilter, OrderingFilter ]
    permission_classes = [ AllowAny ]
    search_fields = ['title', 'content', 'user__first_name']
    pagination_class = BlogPageNumberPagination #PageNumberPagination
    
    def get_queryset(self, *args, **kwargs):
        #queryset_list = super(PostListAPIView, self).get_queryset(*args, **kwargs)
        queryset_list = Blog.objects.all() #filter(user=self.request.user)
        query = self.request.GET.get("q")
        if query:
            queryset_list = queryset_list.filter(
                    Q(title__icontains=query)|
                    Q(content__icontains=query)|
                    Q(user__first_name__icontains=query) |
                    Q(user__last_name__icontains=query)
                    ).distinct()
        return queryset_list

# Detail Blog API
class BlogDetailAPIView(RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogDetailSerializer
    lookup_field = 'pk'
    permission_classes = [AllowAny]
    #lookup_url_kwarg = "abc"