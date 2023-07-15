import logging

from django.db.models.signals import pre_save
from django.dispatch import receiver

from .models import PurchaseItem


log = logging.getLogger(__name__)


@receiver(pre_save, sender=PurchaseItem)
def pre_save_purchase_item(sender, **kwargs):
    obj = kwargs.get('instance')
    if obj.quantity <= 0:
        obj.quantity = 1
    obj.unit_price = obj.product.sale_price
    
    obj.purchase.total_price += float(obj.product.sale_price * obj.quantity)
    obj.purchase.save()
    
