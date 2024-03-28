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
import asyncio
import bs4
import sys
from langchain import hub
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import Chroma, FAISS
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain, create_history_aware_retriever
from langchain_core.documents import Document
from langchain_core.prompts import MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage


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
  organization='org-joqjVZtb6tI7OPvBCosHKgwd',
  api_key=os.getenv("OPEN_API_KEY")
)

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

@app.post("/generate")
async def generate_response(message: str = Body(...)):
    try:
        fighter_data = await get_fighter_data("http://localhost:4002/fighters")
        response = client.chat.completions.create(
            model="gpt-3.5-turbo", 
            messages=[
                {
                    "role": "system",
                    "content": f'you will answer questions about {fighter_data}, when asked about fighter data. you will provide the correct answer. When asked about fight predictions you have to proivde a prediction for the fight based on the data you have on fighter data ,you have to give a predictioin based on the data you have and what betting odds they give you.If the user does not provide any odds data than answer regardless, Also Max Holloway and Justin Gaethje are fighting April 13th. When given a prediction you need to give an answer to who will win and how they will win, Dont say However, its important to note that MMA fights can be unpredictable and the outcome can be influenced by various factors such as the fighters current form, strategy, and even luck. You Must pick a winner, Also dont say based on data, just say who the winner will be, you know its the data, but you dont have to say `based on the data` give details about the fighter and then the winner.Also only answer Questions about MMA and UFC fights, anything outside of that tell the user you are not designed to answer that question. Give information about fighters when asked, so provide stats, ufc history, last fight, fighter bio, wins and loses. alex pereiras last fight was Prochazka vs Pereira. make the responses short '
                }, 
                {
                    "role": "user",
                    "content": f'{message}'
                }
            ],
            max_tokens=200,
            temperature=0.1
        )
        supabase.table('message').insert([
            {
            'message_content': message, 
            'response_content': response.choices[0].message.content}
        ]).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return JSONResponse(content={"data": response.choices[0].message.content})





def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = supabase.auth.get_user()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    return user

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
        response = supabase.table('profile').select('email, name, bio, photo').execute()
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


    






@app.post("/reset_conversation_id")
def reset_conversation_id():
    global conversation_id
    conversation_id = None
    return {"message": "Conversation ID reset successfully."}








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


