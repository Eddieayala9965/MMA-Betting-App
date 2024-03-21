from fastapi import FastAPI ,HTTPException, status, Depends, Body, Request, UploadFile, File
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from supabase import Client, create_client
from db.supabase import create_supabase_client
from typing import List, Dict, Optional
from models import User, UpdateUser
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


@app.put("/update/profile/{id}")
async def update_profile(update: UpdateUser, id: str):
    try:
        
        profile = supabase.table('profile').select('email', 'name', 'bio').eq('id', id).execute()
        if not profile: 
            raise HTTPException(status_code=404, detail="Profile not found")

        response = supabase.table('profile').update({
            'email': update.email,
            'name': update.name,
            'bio': update.bio, 
            
        }).eq('id', id).execute()

        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.get("/user")
async def get_profile():
    try:
        response = supabase.table('profile').select('email, name, bio, photo_url').execute()
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




@app.post("/reset_conversation_id")
def reset_conversation_id():
    global conversation_id
    conversation_id = None
    return {"message": "Conversation ID reset successfully."}




@app.post("/generate")
async def generate_response(message: str = Body(...)):

    
    try:
        # data = await get_fighter_data("http://localhost:4001/fighters")
        response = client.chat.completions.create(
            model="gpt-4", 
            messages=[
                {
                    "role": "system",
                    "content": f'answer any type of questions pertaining to MMA and UFC, including fight predictions, fighter stats, and more. do not say As an AI, I dont predict outcomes. just say you can figure that out based on the data. also give facts about the fighter when they are mentioned. also you have to give an analytical answer to the question you can not say you can give a prediction. also if the user gives you odds you have to give them the percentage of the odds. also if the user gives you a fighter '
                }, 
                {
                    "role": "user",
                    "content": f'{message}'
                }
            ],
            max_tokens=300,
            temperature=0
        )

        supabase.table('message').insert([
            {
            'message_content': message, 
            'response_content': response.choices[0].message.content}
        ]).execute()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return JSONResponse(content={"data": response.choices[0].message.content})




@app.get('/')
def test():
    return {"message": "hello_world"}



@app.get("/data")
async def get_message_data():
    try:
        response = supabase.from_('message').select('message_content', 'response_content', "message_id").execute()
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


from fastapi import HTTPException



@app.delete("/delete/{id}")
async def delete_message(id: str):
        response = supabase.table('message').delete().eq('message_id', id).execute()
        return response



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
        "password": password, 

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


