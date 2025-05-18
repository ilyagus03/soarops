import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler

class WaitTimePredictor:
    def __init__(self):
        self.model = LinearRegression()
        self.scaler = StandardScaler()
        self.is_trained = False
        
    def train(self, historical_data):
        """Train the wait time prediction model using historical operational data."""
        
        X = self._extract_features(historical_data)
        y = historical_data['wait_time_minutes']
        
        X_scaled = self.scaler.fit_transform(X)
        
        self.model.fit(X_scaled, y)
        self.is_trained = True
        
        return self.model.score(X_scaled, y)
    
    def predict(self, current_conditions):
        """Predict wait time based on current park conditions."""
        if not self.is_trained:
            raise Exception("Model must be trained before making predictions")
        
        X = self._extract_features(current_conditions)
        X_scaled = self.scaler.transform(X)
        
        return self.model.predict(X_scaled)[0]
    
    def _extract_features(self, data):
        """Extract and prepare features for the prediction model."""
        features = pd.DataFrame()
        
        features['hour'] = data['timestamp'].dt.hour
        features['is_weekend'] = data['timestamp'].dt.dayofweek >= 5
        features['is_holiday'] = data['is_holiday']
        
        features['park_capacity_pct'] = data['current_park_capacity'] / data['max_park_capacity']
        features['nearby_attraction_wait'] = data['avg_nearby_attraction_wait']
        features['staff_experience_level'] = data['avg_staff_experience_months']
        features['theater_efficiency'] = data['guests_per_hour'] / data['theoretical_max_guests_per_hour']
        
        features['temperature'] = data['temperature']
        features['is_raining'] = data['is_raining']
        
        return features
