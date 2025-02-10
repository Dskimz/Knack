import os
import requests
from dotenv import load_dotenv  # Only needed for local testing

# Load environment variables (Only for local testing)
load_dotenv()

# API Keys
GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API")
