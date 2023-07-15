import logging

from django.db.models import Sum
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


from .serializers import BuyerSerializer, ProductSerializer, PurchaseSerializer
from .models import Buyer, Product, Purchase


log = logging.getLogger(__name__)


class BuyerViewSet(viewsets.ModelViewSet):
    queryset = Buyer.objects.all()
    serializer_class = BuyerSerializer
    
    swagger_tags = ['Справочник покупателей']

    @swagger_auto_schema(tags=swagger_tags)
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(tags=swagger_tags)
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(tags=swagger_tags)
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(tags=swagger_tags)
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(tags=swagger_tags)
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    @swagger_auto_schema(tags=swagger_tags)
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    swagger_tags = ['Справочник товаров']

    @swagger_auto_schema(tags=swagger_tags)
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(tags=swagger_tags)
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(tags=swagger_tags)
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(tags=swagger_tags)
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(tags=swagger_tags)
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    @swagger_auto_schema(tags=swagger_tags)
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class PurchaseViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

    swagger_tags = ['Реестр покупок']

    @swagger_auto_schema(tags=swagger_tags)
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(tags=swagger_tags)
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(tags=swagger_tags)
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(tags=swagger_tags)
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(tags=swagger_tags)
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    @swagger_auto_schema(tags=swagger_tags)
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @action(detail=False, methods=['get'])
    @swagger_auto_schema(manual_parameters=[openapi.Parameter('date', openapi.IN_QUERY, type=openapi.TYPE_STRING)], tags=swagger_tags)
    def report(self, request):
        """
        Отчет выводит всех покупателей и суммарную стоимость совершенных покупок. 
        Сортировка отчета осуществляться по убыванию суммарной стоимости покупок.

        Параметры отчета: дата совершения покупок. 
        """
        # Да логику можно вынести в отдельный файл и не получим мы жирных вьюшек
        # Но так как приложение тестовое - оставим так для простоты
        date = request.query_params.get('date', '1970-01-01')
        purchases = Purchase.objects.filter(
            purchase_date=date).prefetch_related('buyer')
        report = purchases.values('buyer').annotate(
            total_price=Sum('total_price'), ).order_by('-total_price')
        return Response(report)
