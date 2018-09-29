from .views import (login, logout, session_details, ProfileListAPIView)
from .jwtauthenticator import (UserLoginViewJwt, GetMyUsername, TokenAuthentication)
from django.conf.urls import url, include

from rest_framework_jwt.views import (obtain_jwt_token, verify_jwt_token, refresh_jwt_token)

urlpatterns = [
    url(r'^sessiondetails/', session_details, name='session_detail'),
    url(r'^login/', login, name='login_view'),
    url(r'^logout/', logout, name='logout_view'),
    url(r'^profiles/$', ProfileListAPIView.as_view(), name='profile_list'),
    # url(r'^article/(\d+)/', 'viewArticle', name = 'article'),
    url(r'^api-token-refresh', refresh_jwt_token),
    url(r'^api-token-verify', verify_jwt_token),
    # url(r'^api-register-user', views.CreateUserView.as_view()),
    url(r'^api-login-user', UserLoginViewJwt.as_view()),
    url(r'^checkuname/', GetMyUsername, name='checktokentest'),

    # url(r'^checktoken', TokenAuthentication.as_view()),
]
