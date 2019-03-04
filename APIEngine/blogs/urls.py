from .views import ( BlogListAPIView, BlogCreateAPIView, BlogDetailAPIView, BlogUpdateAPIView )
from django.conf.urls import url, include

urlpatterns = [
	url(r'^create/$', BlogCreateAPIView.as_view(), name='blog_create'),     
    url(r'^list/$', BlogListAPIView.as_view(), name='blog_list'),
    url(r'^(?P<pk>(\d+))/$', BlogDetailAPIView.as_view(), name='blog_detail'),
    url(r'^(?P<pk>(\d+))/update$', BlogUpdateAPIView.as_view(), name='blog_update'),
    # url(r'^article/(\d+)/', 'viewArticle', name = 'article'),
]