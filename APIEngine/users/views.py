
from __future__ import unicode_literals

import logging as log
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db.models import Q
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from .models import Profile

# For Rest framework API
from rest_framework.filters import (SearchFilter, OrderingFilter, )
from rest_framework.views import APIView
from rest_framework.generics import (CreateAPIView, DestroyAPIView, ListAPIView, UpdateAPIView,
                                     RetrieveAPIView, RetrieveUpdateAPIView)

from rest_framework.permissions import (AllowAny, IsAuthenticated, IsAdminUser,
                                        IsAuthenticatedOrReadOnly, )

# from .pagination import PostLimitOffsetPagination, PostPageNumberPagination
# from .permissions import IsOwnerOrReadOnly
from .serializers import (ProfileListSerializer)


# LISTS API
class ProfileListAPIView(ListAPIView):
    serializer_class = ProfileListSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    # permission_classes = [IsAdminUser]
    search_fields = ['bio', 'location', 'user__first_name',
                     'user__username', 'user__last_name']
    # pagination_class = PostPageNumberPagination #PageNumberPagination

    def get_queryset(self, *args, **kwargs):
        queryset_list = Profile.objects.all()  # filter(user=self.request.user)
        query = self.request.GET.get("q")
        if query:
            queryset_list = queryset_list.filter(
                Q(bio__icontains=query) |
                Q(location__icontains=query) |
                Q(phone__icontains=query) |
                Q(user__username__icontains=query) |
                Q(user__first_name__icontains=query) |
                Q(user__last_name__icontains=query)
            ).distinct()
        return queryset_list


def session_details(request):
    """
    Old session details, deprecated
    """
    data = {
        'logged_in_user': request.session.get('username', 'Nobody')
    }
    return JsonResponse(data)


def login(request):
    username = request.GET.get("username") or request.POST.get("username")
    password = request.GET.get("password") or request.POST.get("password")
    user = auth.authenticate(username=username, password=password)
    if user:
        # print("Successful login from: %s" % username)
        auth.login(request, user)
        request.session['username'] = username
        data = {
            'newly_logged_in': username,
            'login_status': 'True',
            'message': 'Successfully logged in'
        }
    else:
        data = {
            'login_status': 'False',
            'message': 'Bad Credentials'
        }
    return JsonResponse(data)


def logout(request):
    name = "Nobody was logged in"
    if request.user:
        name = request.session.pop("username")
        auth.logout(request)
    data = {
        'logged_out_user': name,
        'logged_out': 'Successful',
    }
    return JsonResponse(data)
