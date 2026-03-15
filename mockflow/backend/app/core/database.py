from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

client: AsyncIOMotorClient = None
db = None


async def connect_db():
    global client, db
    client = AsyncIOMotorClient(settings.mongodb_url)
    db = client[settings.database_name]
    await db.mock_projects.create_index("slug", unique=True)
    await db.request_logs.create_index("project_slug")


async def close_db():
    global client
    if client:
        client.close()


def get_db():
    return db
