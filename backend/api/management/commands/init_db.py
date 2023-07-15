import logging

from django.core.management.base import BaseCommand
from django.conf import settings

from ...models import Buyer, Product


log = logging.getLogger('command.init_db')


class Command(BaseCommand):
    help = 'Заполнение Бд тестовыми данными'

    def handle(self, *args, **options):
        create_Buyers()
        create_Products()


def create_Buyers():
    buyers = [{
        'full_name': 'Германов Герман Германсик',
        'birth_year': 1970,
        'gender': 'M',
        'consent_to_processing': True
    }, {
        'full_name': 'Иван Иванович Иванов',
        'birth_year': 1971,
        'gender': 'M',
        'consent_to_processing': False
    }, {
        'full_name': 'Дмитрий Сергеевич Крикетов',
        'birth_year': 1933,
        'gender': 'M',
        'consent_to_processing': True
    }]

    log.info(f'Заполнение модели Buyer')
    db_data = [Buyer(**buyer) for buyer in buyers]
    Buyer.objects.bulk_create(db_data)

    log.info(f'Результат:')
    for obj in Buyer.objects.all():
        log.info(obj.full_name)


def create_Products():
    products = [{
        'name': 'Корзинка',
        'purchase_price': 250.40,
        'sale_price': 560.00
    }, {
        'name': 'Молоток',
        'purchase_price': 780.90,
        'sale_price': 2900.00
    }]

    log.info(f'Заполнение модели Product')
    db_data = [Product(**product) for product in products]
    Product.objects.bulk_create(db_data)

    log.info(f'Результат:')
    for obj in Product.objects.all():
        log.info(obj.name)
