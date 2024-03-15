from pydantic import BaseModel, UUID4



class Fighter(BaseModel):
    name: str
    weight_class: str
    record: str

class Prompt(BaseModel):
    id: UUID4
    text: str
    category: str
    user_id: UUID4

class User(BaseModel):
    email: str
    password: str