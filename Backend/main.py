from fastapi import FastAPI ,HTTPException, status, Depends, Body
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from supabase import Client, create_client
from db.supabase import create_supabase_client
from typing import List, Dict
from models import Fighter, User
from openai import OpenAI
from dotenv import load_dotenv
import os

oauth2 = OAuth2PasswordBearer(tokenUrl="/login")

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



client = OpenAI(
  organization='org-qt4oJEpC6WIFhU0iZk7QwEnC',
  api_key=os.getenv("OPEN_API_AIKEY")
)




@app.post("/generate")
async def root(message: str = Body(...)):
    try:
        response = client.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=f'Answer the following question: {message}',
            max_tokens=100,
            temperature=0
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return JSONResponse(content={"data": response.choices[0].text.strip()})


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

@app.post('/logout')
def logout_user():
    res = supabase.auth.sign_out()
    return res


