from pydantic import BaseModel

class Fighter(BaseModel):
    id: int
    name: str
    weight_class: str
    record: str
    user_id: int