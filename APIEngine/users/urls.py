from .views import ( login, logout, session_details, who_am_i, ProfileListAPIView )
from django.conf.urls import url, include

urlpatterns = [
    url(r'^sessiondetails/', session_details, name='session_detail'),
    url(r'^login/', login, name='login_view'),
    url(r'^logout/', logout, name='logout_view'),
    url(r'^whoami/', who_am_i, name='whoami'),
    url(r'^api/profiles/$', ProfileListAPIView.as_view(), name='profile_list'),
    # url(r'^article/(\d+)/', 'viewArticle', name = 'article'),
]