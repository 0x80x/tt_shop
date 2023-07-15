from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from .models import Buyer, Product, Purchase, PurchaseItem


buyer0 = {
    'full_name': 'user0',
    'birth_year': 1970,
    'gender': 'M',
    'consent_to_processing': True
}

buyer1 = {
    'full_name': 'user1',
    'birth_year': 1971,
    'gender': 'M',
    'consent_to_processing': True
}

product0 = {
    'name': 'product0',
    'purchase_price': 250.40,
    'sale_price': 560.00
}

product1 = {
    'name': 'product1',
    'purchase_price': 780.90,
    'sale_price': 2900.00
}


class BuyerTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_buyer(self):
        response = self.client.post('/api/buyers/', buyer0)

        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED, response.json())
        self.assertEqual(Buyer.objects.count(), 1)
        self.assertEqual(Buyer.objects.get().full_name,
                         buyer0.get('full_name'))

    def test_get_buyer_detail(self):
        buyer = Buyer.objects.create(**buyer0)

        response = self.client.get(f'/api/buyers/{buyer.id}/')
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK, response.json())
        self.assertEqual(response.data.get(
            'full_name'), buyer0.get('full_name'))

    def test_get_buyer_list(self):
        Buyer.objects.create(**buyer0)
        Buyer.objects.create(**buyer1)

        response = self.client.get('/api/buyers/')
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK, response.json())
        self.assertEqual(len(response.data.get('results')), 2)

    def test_update_buyer(self):
        response = self.client.post('/api/buyers/', buyer0)
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED, response.json())
        buyer = response.json()

        response = self.client.patch(f'/api/buyers/{buyer.get("id")}/', {
            'consent_to_processing': False
        })
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK, response.json())
        self.assertEqual(Buyer.objects.get(
            id=buyer.get('id')).consent_to_processing, False)

    def test_delete_buyer(self):
        response = self.client.post('/api/buyers/', buyer0)
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED, response.json())
        buyer = response.json()
        response = self.client.delete(f'/api/buyers/{buyer.get("id")}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Buyer.objects.count(), 0)


class ProductTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_product(self):
        response = self.client.post('/api/products/', product0)

        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED, response.json())
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(Product.objects.get().name, product0.get('name'))

    def test_get_product_detail(self):
        product = Product.objects.create(**product0)

        response = self.client.get(f'/api/products/{product.id}/')
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK, response.json())
        self.assertEqual(response.data.get('name'), product0.get('name'))

    def test_get_product_list(self):
        Product.objects.create(**product0)
        Product.objects.create(**product1)

        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK, response.json())
        self.assertEqual(len(response.data.get('results')), 2)

    def test_update_product(self):
        response = self.client.post('/api/products/', product0)
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED, response.json())
        product = response.json()

        response = self.client.patch(f'/api/products/{product.get("id")}/', {
            'purchase_price': 10.00
        })
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK, response.json())
        self.assertEqual(Product.objects.get(
            id=product.get('id')).purchase_price, 10.00)

    def test_delete_buyer(self):
        response = self.client.post('/api/products/', product0)
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED, response.json())
        product = response.json()

        response = self.client.delete(f'/api/products/{product.get("id")}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Product.objects.count(), 0)


class PurchaseTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.buyer = Buyer.objects.create(**buyer0)
        self.product = Product.objects.create(**product0)

    def test_create_purchase(self):
        response = self.client.post('/api/purchases/', {
            'buyer': self.buyer.id,
            'items': [
                {
                    'product': self.product.id,
                    'quantity': 5,
                    'unit_price': self.product.sale_price
                },
            ]
        }, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED, response.json())
        self.assertEqual(Purchase.objects.count(), 1)
        self.assertEqual(PurchaseItem.objects.count(), 1)

# Тут другие тесты
#  так как это тестовое - много тестов не пишем
