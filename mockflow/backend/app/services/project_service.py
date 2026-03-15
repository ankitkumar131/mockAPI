import re
from datetime import datetime, timezone

from bson import ObjectId

from app.core.database import get_db
from app.models.schemas import ProjectCreate, ProjectUpdate, ProjectResponse


def _slugify(name: str) -> str:
    slug = re.sub(r"[^\w\s-]", "", name.lower().strip())
    return re.sub(r"[-\s]+", "-", slug)


def _doc_to_response(doc: dict) -> ProjectResponse:
    return ProjectResponse(
        id=str(doc["_id"]),
        name=doc["name"],
        slug=doc["slug"],
        endpoints=doc.get("endpoints", []),
        created_at=doc["created_at"],
        updated_at=doc["updated_at"],
    )


async def create_project(data: ProjectCreate) -> ProjectResponse:
    db = get_db()
    now = datetime.now(timezone.utc)
    slug = _slugify(data.name)

    existing = await db.mock_projects.find_one({"slug": slug})
    if existing:
        slug = f"{slug}-{ObjectId()}"

    doc = {
        "name": data.name,
        "slug": slug,
        "endpoints": [ep.model_dump() for ep in data.endpoints],
        "created_at": now,
        "updated_at": now,
    }
    result = await db.mock_projects.insert_one(doc)
    doc["_id"] = result.inserted_id
    return _doc_to_response(doc)


async def list_projects() -> list[ProjectResponse]:
    db = get_db()
    cursor = db.mock_projects.find().sort("created_at", -1)
    return [_doc_to_response(doc) async for doc in cursor]


async def get_project(slug: str) -> ProjectResponse | None:
    db = get_db()
    doc = await db.mock_projects.find_one({"slug": slug})
    return _doc_to_response(doc) if doc else None


async def update_project(slug: str, data: ProjectUpdate) -> ProjectResponse | None:
    db = get_db()
    update_fields: dict = {"updated_at": datetime.now(timezone.utc)}

    if data.name is not None:
        update_fields["name"] = data.name
    if data.endpoints is not None:
        update_fields["endpoints"] = [ep.model_dump() for ep in data.endpoints]

    result = await db.mock_projects.find_one_and_update(
        {"slug": slug},
        {"$set": update_fields},
        return_document=True,
    )
    return _doc_to_response(result) if result else None


async def delete_project(slug: str) -> bool:
    db = get_db()
    result = await db.mock_projects.delete_one({"slug": slug})
    if result.deleted_count:
        await db.request_logs.delete_many({"project_slug": slug})
        return True
    return False
