from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
<<<<<<< HEAD
    allow_origins=[
        "http://localhost:3000",
    "https://radiolanguage.onrender.com"
    ],
=======
    allow_origins=["http://localhost:3000", "https://Radiolanguage.onrender.com"],
>>>>>>> 1dab861 (Ping)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
def ping():
    return {"Status": "OK"}

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
            "geo_lat": i["geo_lat"],
            "geo_long": i["geo_long"]
        }
        for i in radios
        if i["url_resolved"]
    ]

@app.get("/all")
def GET():
    try:
        url = "https://de1.api.radio-browser.info/json/stations"
        headers = {"User-Agent": "RadioIn1.0"}
        params = {
            "limit": 1000,
            "hidebroken": "true",
            "has_geo_info": "true"
        }
        response = requests.get(url, headers=headers, params=params, timeout=30)
        
        print("Status:", response.status_code)
        print("Respuesta cruda:", response.text[:300])  # ver qué devuelve
        
        if response.status_code != 200 or not response.text.strip():
            return {"error": f"Radio-browser falló: status={response.status_code}"}
        
        radios = response.json()
        return [
            {
                "id": i["stationuuid"],  
                "name": i["name"],
                "country": i["country"],
                "language": i["language"],
                "url": i["url_resolved"],
                "icon": i["favicon"],
                "geo_lat": i["geo_lat"],
                "geo_long": i["geo_long"]
            }
            for i in radios
            if i["url_resolved"] and i["geo_lat"] and i["geo_long"]  
        ]
    except Exception as e:
        print("ERROR:", str(e))
        return {"error": str(e)}
    
@app.get("/test")
def TEST(country: str = "Colombia"):
    url = f"https://de1.api.radio-browser.info/json/stations/bycountry/{country}"
    header = {"User-Agent": "RadioIn1.0"}
    response = requests.get(url, headers=header)
    return response.json()
