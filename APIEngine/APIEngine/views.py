from django.http import JsonResponse

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