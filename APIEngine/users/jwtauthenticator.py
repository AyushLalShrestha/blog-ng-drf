
import json
from users.models import User
from rest_framework.authentication import get_authorization_header, BaseAuthentication
from django.http import HttpResponse
from rest_framework import status, exceptions
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
    try:
        valid_data = VerifyJSONWebTokenSerializer().validate(data)
        if valid_data:
            user = valid_data['user']
            return JsonResponse({"username": user.username})
    except Exception as ex:
        return JsonResponse({"error": "Invalid Token"})


# - - - - -  - - - - - JWT Authentication Class - - - - -  - - - - -  - - - - -


class TokenAuthentication(BaseAuthentication):

    model = None

    def get_model(self):
        return User

    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        print("Authenticating JWT Token")
        # if not auth or auth[0].lower() != 'token':
        #     return None

        if len(auth) == 1:
            msg = 'Invalid token header. No credentials provided.'
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = 'Invalid token header'
            raise exceptions.AuthenticationFailed(msg)

        try:
            token = auth[1]
            if token == "null":
                msg = 'Null token not allowed'
                raise exceptions.AuthenticationFailed(msg)
        except UnicodeError:
            msg = 'Invalid token header. Token string should not contain invalid characters.'
            raise exceptions.AuthenticationFailed(msg)

        return self.authenticate_credentials(token)

    def authenticate_credentials(self, token):
        payload = jwt.decode(token, SECRET_KEY)
        """
    	# Alternatively
		# data = {'token': token}
     	# valid_data = VerifyJSONWebTokenSerializer().validate(data)
     	# user = valid_data['user']
    	"""
        model = self.get_model()
        email = payload['email']
        userid = payload['user_id']
        try:
            user = User.objects.get(
                email=email,
                id=userid,
                is_active=True
            )
            # if not user.token['token'] == token:
            #     raise exceptions.AuthenticationFailed({'Error': "Token mismatch",'status' :"401"})
        except jwt.ExpiredSignature or jwt.DecodeError or jwt.InvalidTokenError:
            return HttpResponse({'Error': "Token is invalid"}, status="403")
        except User.DoesNotExist:
            return HttpResponse({'Error': "Internal severe error"}, status="500")

        return (user, token)

    def authenticate_header(self, request):
        return 'Token'
