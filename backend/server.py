from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator
from typing import List, Optional, Annotated
from bson import ObjectId
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

PyObjectId = Annotated[str, BeforeValidator(str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: PyObjectId = Field(default_factory=lambda: str(ObjectId()), alias="_id")

    def to_mongo(self) -> dict:
        return self.model_dump(by_alias=True)

    @classmethod
    def from_mongo(cls, doc: dict):
        return cls(**doc)


class QuoteCreate(BaseModel):
    name: str
    email: str
    phone: str = ""
    property_type: str
    surface: int = 0
    frequency: str
    message: str = ""
    estimate: Optional[int] = None


class Quote(BaseDocument):
    name: str
    email: str
    phone: str = ""
    property_type: str
    surface: int = 0
    frequency: str
    message: str = ""
    estimate: Optional[int] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


@api_router.get("/")
async def root():
    return {"message": "Ecuanet API"}


@api_router.post("/quotes", response_model=Quote, response_model_by_alias=False)
async def create_quote(payload: QuoteCreate):
    quote = Quote(**payload.model_dump())
    await db.quotes.insert_one(quote.to_mongo())
    return quote


@api_router.get("/quotes", response_model=List[Quote], response_model_by_alias=False)
async def list_quotes():
    docs = await db.quotes.find().sort("created_at", -1).to_list(1000)
    return [Quote.from_mongo(d) for d in docs]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
