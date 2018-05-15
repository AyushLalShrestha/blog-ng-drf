
from __future__ import unicode_literals
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render


def session_details(request):
    print(request.user)
    data = {
        'logged_in_user': request.session.get('username', 'Nobody'),
        'location': 'Nepal',
        'enjoy': 'True True'
    }
    return JsonResponse(data)


def login(request):
    username = request.GET.get("username", "NONAME")
    password = request.GET.get("password", "NOPWD")
    user = auth.authenticate(username=username, password=password)
    if user:
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
    if request.user:
        name = request.session.pop("username", "Nobody was logged in")
        auth.logout(request)
    data = {
        'logged_out_user': name,
        'session_cleared': 'True',
        'logged_out': 'Successful',
    }
    return JsonResponse(data)


def who_am_i(request):
    if request.user:
        data = {
            'username': request.user.username,
            'full_name': request.user.first_name + " " + request.user.last_name,
            'email_id': request.user.email,
        }
    else:
        data = {
            'message': 'Anonymous! Please Log In'
        }    
    return JsonResponse(data)
