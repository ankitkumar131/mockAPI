import asyncio
from datetime import datetime, timezone

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from app.core.database import get_db
from app.services.faker_service import generate_fake_data

router = APIRouter(prefix="/mock", tags=["mock-engine"])


@router.api_route(
    "/{slug}/{path:path}",
    methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
)
async def serve_mock(slug: str, path: str, request: Request):
    db = get_db()
    project = await db.mock_projects.find_one({"slug": slug})

    if not project:
        return JSONResponse({"error": "Project not found"}, status_code=404)

    target_path = f"/{path}"
    method = request.method

    matched = None
    for ep in project.get("endpoints", []):
        if ep["path"] == target_path and ep["method"] == method:
            matched = ep
            break

    if not matched:
        return JSONResponse(
            {"error": f"No mock defined for {method} {target_path}"},
            status_code=404,
        )

    if matched.get("delay_ms", 0) > 0:
        await asyncio.sleep(matched["delay_ms"] / 1000)

    if matched.get("use_faker") and matched.get("faker_template"):
        body = generate_fake_data(matched["faker_template"])
    else:
        body = matched.get("response_body", {})

    await db.request_logs.insert_one({
        "project_slug": slug,
        "endpoint_path": target_path,
        "method": method,
        "timestamp": datetime.now(timezone.utc),
        "response_time_ms": matched.get("delay_ms", 0),
    })

    await db.mock_projects.update_one(
        {"slug": slug, "endpoints.path": target_path, "endpoints.method": method},
        {"$inc": {"endpoints.$.hit_count": 1}},
    )

    headers = matched.get("headers", {})
    return JSONResponse(
        body, status_code=matched.get("status_code", 200), headers=headers
    )
