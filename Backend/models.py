from pydantic import BaseModel, UUID4




class User(BaseModel):
    email: str
    password: str

class Message(BaseModel):
    pass