import requests
import os

# Load API Key from environment variables
GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API")

def get_nearest_hospital(latitude, longitude):
    """Find the nearest emergency hospital using Google Places API."""
    search_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": f"{latitude},{longitude}",
        "radius": 5000,  # Search within 5km
        "type": "hospital",
        "keyword": "emergency room",
        "key": GOOGLE_MAPS_API_KEY
    }

    response = requests.get(search_url, params=params)
    results = response.json()

    if results.get("results"):
        hospital = results["results"][0]  # Closest hospital
        return {
            "name": hospital["name"],
            "address": hospital["vicinity"],
            "lat": hospital["geometry"]["location"]["lat"],
            "lng": hospital["geometry"]["location"]["lng"],
            "place_id": hospital["place_id"]
        }
    return None
