from django.contrib import admin
from .models import Portfolio, Property

@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    filter_horizontal = ('users',)  # Makes Many-to-Many selection easier

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'zip_code', 'total_financial_risk')
    search_fields = ('name', 'city', 'zip_code')
