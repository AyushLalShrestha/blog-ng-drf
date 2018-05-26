from .views import ( BlogListAPIView, BlogCreateAPIView, BlogDetailAPIView )
from django.conf.urls import url, include

urlpatterns = [
	url(r'^create/$', BlogCreateAPIView.as_view(), name='blog_create'),     
    url(r'^list/$', BlogListAPIView.as_view(), name='blog_list'),
    url(r'^(?P<pk>(\d+))/$', BlogDetailAPIView.as_view(), name='blog_detail'),
    # url(r'^article/(\d+)/', 'viewArticle', name = 'article'),
]