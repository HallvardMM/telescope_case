from django.shortcuts import render
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .models import Property, Portfolio
from .serializers import PropertySerializer, PortfolioSerializer, UserSerializer
from django.contrib.auth.models import User


class UserViewSet(ModelViewSet):
    """
    A viewset for creating, retrieving, updating, and deleting users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PropertyViewSet(ModelViewSet):
    """
    A viewset for managing CRUD operations on properties.
    """
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Property deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

class PortfolioViewSet(ModelViewSet):
    queryset = Portfolio.objects.prefetch_related('users').all()
    serializer_class = PortfolioSerializer

    def perform_create(self, serializer):
        # Automatically associate the currently logged-in user with the portfolio
        portfolio = serializer.save()
        if self.request.user.is_authenticated:
            portfolio.users.add(self.request.user)

    def perform_update(self, serializer):
        # Ensure users can be updated properly
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Portfolio deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
