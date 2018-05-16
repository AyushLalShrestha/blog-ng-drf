from .views import ( login, logout, session_details, ProfileListAPIView )
from django.conf.urls import url, include

urlpatterns = [
    url(r'^sessiondetails/', session_details, name='session_detail'),
    url(r'^login/', login, name='login_view'),
    url(r'^logout/', logout, name='logout_view'),
    url(r'^api/profiles/$', ProfileListAPIView.as_view(), name='profile_list'),
    # url(r'^article/(\d+)/', 'viewArticle', name = 'article'),
]