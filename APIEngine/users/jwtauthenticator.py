
from django.contrib import auth
from django.http import JsonResponse, HttpResponse
import jwt
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from rest_framework.views import APIView

from APIEngine.settings import SECRET_KEY

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class UserLoginViewJwt(APIView):
    def get(self, request, *args, **kwargs):
        username = request.GET.get('username')
        password = request.GET.get('password')
        
        user = auth.authenticate(username=username, password=password)
        if user:
            payload = jwt_payload_handler(user)
            token = {
                'token': jwt.encode(payload, SECRET_KEY),
                'status': 'success'
                }            
            return JsonResponse(token)
        else:
            return JsonResponse({
              'error': 'Invalid credentials',
              'status': 'failed'
              })


def GetMyUsername(request):
    token = request.GET.get('token')
    data = {'token': token}
    valid_data = VerifyJSONWebTokenSerializer().validate(data)
    if valid_data:
        user = valid_data['user']
        return JsonResponse({"username": user.username})
    return JsonResponse({"error": "Invalid Token"})