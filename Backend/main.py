from fastapi import FastAPI
from decouple import config
from supabase_py import create_client, Client

url = config("SUPABASE_URL")
key = config("SUPABASE_KEY")


app = FastAPI()
supabase: Client = create_client(url, key)

