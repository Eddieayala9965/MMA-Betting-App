from pydantic import BaseModel, UUID4
from sqlalchemy import create_engine, Column, Integer, String, MetaData, Table
from sqlalchemy.orm import declarative_base

Base = declarative_base()



class User(BaseModel):
    email: str
    password: str

class Message(BaseModel):
    pass
