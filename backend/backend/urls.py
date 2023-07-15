from django.urls import path, include, re_path
from django.views.generic import TemplateView

from rest_framework import permissions
from django.conf.urls.static import static
from django.conf import settings
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Shop API",
        default_version='v0.1',
        description='API для ведения справочников покупателей, товаров и реестра покупок',
        contact=openapi.Contact(email="a.andreev411@ya.ru"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    path('api/', include('api.urls')),

    re_path(r'^docs(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^docs/$', schema_view.with_ui('swagger',
            cache_timeout=0), name='schema-swagger-ui'),
            
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)