# https://github.com/rdassignies/pylegifrance
import os 
from dotenv import load_dotenv

load_dotenv()
# from pylegifrance import LegiHandler, recherche_CODE
# client = LegiHandler()
# client.set_api_keys(
#         legifrance_api_key=os.getenv("LEGIFRANCE_API_KEY"),
#         legifrance_api_secret=os.getenv("LEGIFRANCE_API_SECRET")
#         )

# art7 = recherche_CODE(code_name="Code civil", search="7")
# print(art7)

# https://dev.to/h4c5/scraping-de-legifrance-considerez-plutot-lapi-5afi

import requests
from requests_oauthlib import OAuth2Session




client_id = os.getenv("LEGIFRANCE_CLIENT_ID")
client_secret = os.getenv("LEGIFRANCE_CLIENT_SECRET")
# url_piste = "https://oauth.piste.gouv.fr/api/oauth/token"
url_piste = "https://sandbox-oauth.piste.gouv.fr/api/oauth/token"
# ok sur sandbox avec les client_id et client_secret de la premiere appli

# print(client_id)
# print(client_secret)

res = requests.post(
  url_piste,
  data={
    "grant_type": "client_credentials",
    "client_id": client_id,
    "client_secret": client_secret,
    "scope": "openid"
  }
)

token = res.json()
print(token)

# client = OAuth2Session(client_id, token=token)

# art = client.get("https://api.piste.gouv.fr/dila/legifrance/lf-engine-app/consult/getArticle", params={"id": "LEGIARTI000006307920"})
# print(art)
# import requests
# auth = "Bearer " + token["access_token"]

# response = requests.post(
#     "https://sandbox-api.piste.gouv.fr/dila/legifrance/lf-engine-app/consult/code",
#     json={"id": "LEGITEXT000006069577"},
#     headers={
#         "Authorization": auth,
#         "Content-Type": "application/json",
#     },
# )

# code =response.json()
# print(code)

# auth_token='kbkcmbkcmbkcbc9ic9vixc9vixc9v'
headers = {'Authorization': f'Bearer {token["access_token"]}', 'Content-Type': 'application/json', 'accept': 'application/json'}

url_ping = 'https://sandbox-api.piste.gouv.fr/dila/legifrance/lf-engine-app/list/ping'
ping = requests.get(url_ping, headers=headers)
print('PING',ping)

# data = {'app' : 'aaaaa'}
data ={
  "abrogated": True,
  "textId": "LEGITEXT000006075116",
  "searchedString": "constitution 1958",
  "date": "2021-04-15",
  "fromSuggest": True,
  "sctCid": "LEGISCTA000006112861"
}

# url = 'https://api.xy.com'
root_url = 'https://sandbox-api.piste.gouv.fr'
base_url='/dila/legifrance/lf-engine-app'
url = 'https://sandbox-api.piste.gouv.fr/dila/legifrance/lf-engine-app/consult/code'
response = requests.post(url, json=data, headers=headers)
print(response)
print(response.json())