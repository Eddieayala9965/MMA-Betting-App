from fastapi import FastAPI ,HTTPException, status, Depends, Header
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from supabase import Client, create_client
from db.supabase import create_supabase_client
from typing import List, Dict
from models import Fighter, User
import jwt 

import os


# can you create a get user function




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



# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# def get_current_user(token: str = Depends(oauth2_scheme)): 
#     supabase_user = supabase.auth.get_user(token)
#     if supabase_user is None:
#         raise HTTPException(status_code=401, detail="Invalid token")
#     return User(email=supabase_user['email'], password="")

# @app.get('/getUser', status_code=200)
# async def get_user_id(current_user: User = Depends(get_current_user)):
#     return {"email": current_user.email, "id": current_user.id}

@app.get('/get_user')
def get_user():
    user = supabase.auth.get_user()
    return user


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
    return response



@app.post('/login')
def login_user(request: User):
    email = request.email
    password = request.password
    data = supabase.auth.sign_in_with_password({
        "email": email, 
        "password": password
    })
    return data

@app.get('/logout')
def logout_user():
    res = supabase.auth.sign_out()
    return res


