from fastapi import APIRouter, HTTPException

from app.models.schemas import ProjectCreate, ProjectUpdate, ProjectResponse
from app.services.project_service import (
    create_project,
    list_projects,
    get_project,
    update_project,
    delete_project,
)

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.post("", response_model=ProjectResponse, status_code=201)
async def create(data: ProjectCreate):
    return await create_project(data)


@router.get("", response_model=list[ProjectResponse])
async def list_all():
    return await list_projects()


@router.get("/{slug}", response_model=ProjectResponse)
async def get_one(slug: str):
    project = await get_project(slug)
    if not project:
        raise HTTPException(404, "Project not found")
    return project


@router.put("/{slug}", response_model=ProjectResponse)
async def update(slug: str, data: ProjectUpdate):
    project = await update_project(slug, data)
    if not project:
        raise HTTPException(404, "Project not found")
    return project


@router.delete("/{slug}", status_code=204)
async def delete(slug: str):
    if not await delete_project(slug):
        raise HTTPException(404, "Project not found")
