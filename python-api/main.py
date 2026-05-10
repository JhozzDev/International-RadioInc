from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    "https://radiolanguages.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/radios")
def GET(country: str):
    url = f"https://de1.api.radio-browser.info/json/stations/bycountry/{country}"
    header = {"User-Agent": "RadioIn1.0"}
    response = requests.get(url, headers=header)
    radios = response.json()
    return [
        {
            "name": i["name"],
            "country": i["country"],
            "language": i["language"],
            "url": i["url_resolved"],
            "icon": i["favicon"],
        }
        for i in radios
        if i["url_resolved"]
    ]

@app.get("/test")
def TEST(country: str = "Colombia"):
    url = f"https://de1.api.radio-browser.info/json/stations/bycountry/{country}"
    header = {"User-Agent": "RadioIn1.0"}
    response = requests.get(url, headers=header)
    return response.json()
