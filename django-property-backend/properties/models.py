from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User

class Portfolio(models.Model):
    """
    A portfolio of properties owned by one or more users.
    """
    name = models.CharField(max_length=100, help_text="Name of the portfolio")
    users = models.ManyToManyField(User, related_name="portfolios", help_text="Users who own this portfolio")

    def __str__(self):
        return self.name


class Property(models.Model):
    """
    A real estate property with associated data.
    """
    address = models.CharField(max_length=255, help_text="Street address of the property")
    zip_code = models.CharField(max_length=10, help_text="Postal code of the property")
    city = models.CharField(max_length=100, help_text="City where the property is located")
    coordinates = models.JSONField(help_text="Coordinates of the property in {'lat': value, 'lng': value} format")
    name = models.CharField(max_length=100, help_text="Name of the property")
    estimated_value = models.PositiveIntegerField(help_text="Estimated value of the property in NOK")
    relevant_risks = models.PositiveIntegerField(help_text="Number of relevant risks associated with the property")
    handled_risks = models.PositiveIntegerField(help_text="Number of risks that have been handled")
    total_financial_risk = models.PositiveIntegerField(help_text="Total financial risk in NOK")
    portfolio = models.ForeignKey(
    Portfolio,
    on_delete=models.CASCADE,
    related_name="properties",
    help_text="Portfolio this property belongs to",
    )

    def clean(self):
        # Custom validation: handled_risks cannot exceed relevant_risks
        if self.handled_risks > self.relevant_risks:
            raise ValidationError("Handled risks cannot exceed the number of relevant risks.")

    def save(self, *args, **kwargs):
        self.full_clean()  # Run validations
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
