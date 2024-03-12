from fastapi import FastAPI
from supabase import Client, create_client
from db.supabase import create_supabase_client

app = FastAPI()

supabase = create_supabase_client()

@app.get('/')
def test():
    return {"message": "yooooo"}

@app.post("/register")
def register_user(email: str, password: str):
    response = supabase.auth.sign_up({
        "email": email, 
        "password": password, 
    })
    return response

@app.post('/login')
def login_user(email: str, password: str):
    data = supabase.auth.sign_in_with_password({
        "email": email, 
        "password": password
    })
    return data

@app.post('/logout')
def logout_user():
    res = supabase.auth.sign_out()
    return res



