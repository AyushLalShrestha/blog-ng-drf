from .views import ( BlogListAPIView, BlogCreateAPIView )
from django.conf.urls import url, include

urlpatterns = [
    url(r'^list/$', BlogListAPIView.as_view(), name='blog_list'),
    url(r'^create/$', BlogCreateAPIView.as_view(), name='blog_create'),       
    # url(r'^article/(\d+)/', 'viewArticle', name = 'article'),
]