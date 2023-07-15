from django.urls import path, include
from rest_framework_nested import routers

from .views import BuyerViewSet, ProductViewSet, PurchaseViewSet

router = routers.SimpleRouter()
router.register(r'buyers', BuyerViewSet, basename='buyer')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'purchases', PurchaseViewSet, basename='purchase')

urlpatterns = [
    path('', include(router.urls)),
]
