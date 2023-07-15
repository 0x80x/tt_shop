from django.db import models


class Buyer(models.Model):
    full_name = models.CharField(max_length=100)
    birth_year = models.PositiveIntegerField()
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    registration_date = models.DateField(auto_now_add=True)
    consent_to_processing = models.BooleanField(default=False)
    photo = models.ImageField(upload_to='buyers/', blank=True, null=True)

    class Meta:
        db_table = 'r_buyers'
        ordering = ['id']


class Product(models.Model):
    name = models.CharField(max_length=100)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'r_products'
        ordering = ['id']


class Purchase(models.Model):
    buyer = models.ForeignKey(Buyer, on_delete=models.CASCADE)
    purchase_date = models.DateField(auto_now_add=True)
    total_price = models.DecimalField(
        max_digits=10, decimal_places=2, editable=False, default=0.00)  # Подсчитывается в signals

    class Meta:
        db_table = 'r_purchases'
        ordering = ['id']


class PurchaseItem(models.Model):
    purchase = models.ForeignKey(
        Purchase, on_delete=models.CASCADE, related_name='items', editable=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(
        max_digits=10, decimal_places=2, editable=False)  # Подсчитывается в signals

    class Meta:
        db_table = 'r_purchase_items'
        ordering = ['id']
