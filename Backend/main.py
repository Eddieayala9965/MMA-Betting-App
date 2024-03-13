from fastapi import FastAPI ,HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from supabase import Client, create_client
from db.supabase import create_supabase_client
from typing import List, Dict
from models import Fighter, User

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
origins = [
    "http://localhost", 
    "http://localhost:5173", 
]

supabase = create_supabase_client()

@app.get('/')
def test():
    return {"message": "yooooo"}

@app.post("/register")
def register_user(request: User):
    email = request.email
    password = request.password
    response = supabase.auth.sign_up({
        "email": email, 
        "password": password, 
    })
    if response ['statsus'] == 400:
        return {"message": "user regitrated succqessfully"}



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




