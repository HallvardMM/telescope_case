from rest_framework import serializers
from .models import Property, Portfolio
from django.contrib.auth.models import User

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'

    def validate(self, data):
        # Custom validation: handled_risks cannot exceed relevant_risks
        if data['handled_risks'] > data['relevant_risks']:
            raise serializers.ValidationError("Handled risks cannot exceed relevant risks.")
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']  # Include password for creation
        extra_kwargs = {
            'password': {'write_only': True}  # Password should not be readable
        }

    def create(self, validated_data):
        # Create a new user with a hashed password
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user

    def update(self, instance, validated_data):
        # Update user fields and handle password separately
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)

        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)

        instance.save()
        return instance


class PortfolioSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)  # Display user details
    user_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=User.objects.all(), write_only=True, source="users"
    )  # Allow adding users by their IDs

    class Meta:
        model = Portfolio
        fields = ['id', 'name', 'users', 'user_ids']