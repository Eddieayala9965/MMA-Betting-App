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
import os

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


@app.post("/generate")
async def generate_response(message: str = Body(...)):
    try:
        response = client.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=f'Answer the following question: {message}',
            max_tokens=100,
            temperature=0
        )

        supabase.table('message').insert([
            {'message_content': message, 'response_content': response.choices[0].text.strip()}
        ]).execute()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return JSONResponse(content={"data": response.choices[0].text.strip()})



# may need session id to be able to hold those logs
# do a trigger for the conersation id
# post request for conversation include id
# pull data from backend to render on front end as component




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


