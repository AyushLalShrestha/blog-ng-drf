from django.conf.urls import include, url
from django.contrib import admin

from .views import who_am_i

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^user/', include('users.urls')),
    url(r'^blog/', include('blogs.urls')),
    url(r'^whoami/', who_am_i, name='whoami'),
]


