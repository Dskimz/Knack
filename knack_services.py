import requests
import os
from google_services import get_nearest_hospital

# Load Knack API credentials
KNACK_API_KEY = os.getenv("KNACK_API_KEY")
KNACK_APP_ID = os.getenv("KNACK_APP_ID")

# Knack API endpoints
KNACK_BASE_URL = f"https://api.knack.com/v1/objects/object_6/records"

# Headers for Knack API
HEADERS = {
    "X-Knack-Application-Id": KNACK_APP_ID,
    "X-Knack-REST-API-KEY": KNACK_API_KEY,
    "Content-Type": "application/json"
}

def get_all_records():
    """Retrieve all records from Knack Object 6."""
    url = f"{KNACK_BASE_URL}?rows_per_page=1000"  # Adjust as needed for pagination
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        return response.json().get("records", [])
    return []

def get_location_coordinates(record):
    """Extract latitude and longitude from Field 30."""
    coordinates = record.get("field_30")  # Field 30 holds coordinates
    if coordinates and "," in coordinates:
        lat, lng = map(str.strip, coordinates.split(","))
        return float(lat), float(lng)
    return None, None

def update_hospital_data(record_id, hospital_data):
    """Update Knack Object 6, Field 358 with hospital data."""
    url = f"{KNACK_BASE_URL}/{record_id}"
    payload = {
        "field_358": hospital_data  # Field 358 stores emergency room info
    }
    
    response = requests.put(url, json=payload, headers=HEADERS)
    return response.status_code == 200

def process_all_locations():
    """Process all records in Object 6, get emergency rooms, and update Knack."""
    records = get_all_records()
    if not records:
        return "⚠️ No records found in Object 6."

    results = []
    for record in records:
        record_id = record["id"]
        latitude, longitude = get_location_coordinates(record)

        if not latitude or not longitude:
            results.append(f"⚠️ Record {record_id}: No valid coordinates.")
            continue

        hospital = get_nearest_hospital(latitude, longitude)
        if not hospital:
            results.append(f"⚠️ Record {record_id}: No hospitals found nearby.")
            continue

        hospital_json = {
            "name": hospital["name"],
            "address": hospital["address"],
            "google_maps_link": f"https://www.google.com/maps/place/?q=place_id:{hospital['place_id']}",
            "lat": hospital["lat"],
            "lng": hospital["lng"]
        }

        success = update_hospital_data(record_id, hospital_json)
        if success:
            results.append(f"✅ Record {record_id}: Hospital data updated.")
        else:
            results.append(f"❌ Record {record_id}: Failed to update.")

    return "\n".join(results)
