from pydantic import BaseModel, UUID4

class Fighter(BaseModel):
    id: UUID4
    name: str
    weight_class: str
    record: str
    user_id: UUID4

class User(BaseModel):
    email: str
    password: str