from fastapi import FastAPI ,HTTPException, status, Depends, Body, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from supabase import Client, create_client
from db.supabase import create_supabase_client
from typing import List, Dict
from models import User
from openai import OpenAI
from dotenv import load_dotenv
from typing import Annotated
from pydantic import BaseModel
from uuid import uuid4
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


client = OpenAI(
  organization='org-qt4oJEpC6WIFhU0iZk7QwEnC',
  api_key=os.getenv("OPEN_API_AIKEY")
)



async def get_fighter_data():
    try:
        response = requests.get('http://localhost:4000/fighters')

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
            stringified_data = json.dumps(data)
            return stringified_data
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




@app.post("/generate")
async def generate_response(message: str = Body(...)):
    
    try:
        odds_data = await get_odds_data('http://localhost:4001/odds')
        response = client.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=f'Respond to questions about UFC and MMA fighters. Limit responses to provided data. For missing stats or odds, mention you dont have the information. Ensure matchups are between female fighters. Avoid matchups with fighters from different weight classes. For predictions, focus on MMA-related questions. Be descriptive when providing odds or fighter stats. {message} {odds_data}', 
            max_tokens=100,
            temperature=0
        )

        supabase.table('message').insert([
            {'message_content': message, 'response_content': response.choices[0].text.strip()}
        ]).execute()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return JSONResponse(content={"data": response.choices[0].text.strip()})












@app.post("/create_conversation_and_message/")
async def create_conversation_and_message(request: Request):
        # Retrieve Supabase session
        session = supabase.auth.get_session()

        # Generate UUIDs for conversation_id and message_id
        conversation_id = str(uuid4())
        message_id = str(uuid4())
        
        # Insert records into conversation and message tables
        conversation_response = supabase.table("conversation").insert({"conversation_id": conversation_id}).execute()
       
        
        return JSONResponse(content={"conversation_id": conversation_id})






class Conversation(BaseModel):
    conversation_id: int

class Message(BaseModel):
    conversation_id: int
    






@app.get('/')
def test():
    return {"message": "hello_world"}

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

def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = supabase.auth.get_user()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    return user

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


