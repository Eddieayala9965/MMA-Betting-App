from fastapi import FastAPI ,HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
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




@app.get("/get_user")
async def get_current_user():
    user = await supabase.auth.get_user("access_token")
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    return User( username=user['username'], email=user['email'])


@app.post("/fighters")
async def create_fighter(weight_class: str, record: str, name: str ,current_user: str = Depends(get_current_user)):
    fighter_data = {"id": current_user, "weight_class": weight_class, "record": record, "name": name}
    fighter = await supabase.table("Fighter").insert(fighter_data)
    return fighter

# @app.get("/fighters/{fighter_id}")
# async def read_fighter(fighter_id: int, current_user: str = Depends(get_current_user)):
#     fighter = await supabase.table("fighters").select("*").eq("user_id", current_user).eq("fighter_id", fighter_id).single()
#     if not fighter:
#         raise HTTPException(status_code=404, detail="Fighter not found")
#     return fighter

# @app.put("/fighters/{fighter_id}")
# async def update_fighter(fighter_id: int, current_user: str = Depends(get_current_user)):
#     fighter_data = {"user_id": current_user, "fighter_id": fighter_id}
#     updated_fighter = await supabase.table("fighters").update(fighter_data).eq("fighter_id", fighter_id)
#     return updated_fighter


# @app.delete("/fighters/{fighter_id}")
# async def delete_fighter(fighter_id: int, current_user: str = Depends(get_current_user)):
#     deleted_fighter = await supabase.table("fighters").delete().eq("fighter_id", fighter_id)
#     return {"message": "Fighter deleted", "fighter_id": fighter_id}