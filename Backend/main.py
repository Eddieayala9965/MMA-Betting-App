from fastapi import FastAPI ,HTTPException, status, Depends, Body, Request, UploadFile, File
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from supabase import Client, create_client
from db.supabase import create_supabase_client
from typing import List, Dict, Optional
from models import User
from openai import OpenAI
from dotenv import load_dotenv
from typing import Annotated
from pydantic import BaseModel
from uuid import uuid4
import uuid
import requests
import os
import json

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

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

def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = supabase.auth.get_user()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    return user

client = OpenAI(
  organization='org-joqjVZtb6tI7OPvBCosHKgwd',
  api_key=os.getenv("OPEN_API_AIKEY")
)


@app.put("/update/profile")
async def update_profile(email: str, name: str, bio: str ):
    print(email, name, bio)
    try:
        response = supabase.table('profile').update(
            {'email': email, 'name': name, 'bio': bio}
            ).eq("id", "51212cdf-ea40-4273-a71c-28b8241340c8").execute() 
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/user")
async def get_profile():
    try:
        response = supabase.table('profile').select('email, name, bio').execute()
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def get_fighter_data(url):
    try:
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            return data
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def get_odds_data(url):
    try:
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
           
            return data
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




@app.post("/generate")
async def generate_response(message: str = Body(...)):
    
    try:
        # odds_data = await get_odds_data('http://localhost:4001/odds')
        # string_odds = json.dumps(odds_data)
        # odds_data = json.loads(string_odds)
        # fighter_data = await get_fighter_data('http://localhost:4000/fighters')
        # string_fighter = json.dumps(fighter_data)
        # fighter_data = json.loads(string_fighter)
        response = client.chat.completions.create(
            model="gpt-4", 
            messages=[
                {
                    "role": "system",
                    "content": f'answer any type of questions:'
                }, 
                {
                    "role": "user",
                    "content": f'{message}'
                }
            ],
            max_tokens=100,
            temperature=0
        )


        supabase.table('message').insert([
            {'message_content': message, 'response_content': response.choices[0].message.content}
        ]).execute()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return JSONResponse(content={"data": response.choices[0].message.content})




@app.get('/')
def test():
    return {"message": "hello_world"}




@app.post("/register")
def register_user(request: User):
    email = request.email
    name = request.name
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
    name = request.name
    data = supabase.auth.sign_in_with_password({
        "email": email, 
        "password": password, 
        "options": {
            "data": {
                "name": name
            }
        }

    })
    return data


@app.post('/logout')
def logout_user():
    res = supabase.auth.sign_out()
    return res





@app.post("/refresh")
async def refresh_token(request: Request):
    data = await request.json()
    token = data.get('refresh_token')

    session = supabase.auth.refresh_session(token)
    if session is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid session",
        )
    return session

@app.get("/protected")
async def protected_route(user: User = Depends(get_current_user)):
    if user is not None:
        return {"detail": "PROTECTED ROUTE IS ACCESSIBLE!"}
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
        )


