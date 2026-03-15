from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class EndpointConfig(BaseModel):
    method: str = Field(..., pattern="^(GET|POST|PUT|PATCH|DELETE)$")
    path: str = Field(..., min_length=1, examples=["/api/users"])
    response_body: dict[str, Any] = Field(default_factory=dict)
    status_code: int = Field(default=200, ge=100, le=599)
    delay_ms: int = Field(default=0, ge=0, le=30000)
    headers: dict[str, str] = Field(default_factory=dict)
    use_faker: bool = False
    faker_template: dict[str, Any] = Field(default_factory=dict)


class ProjectCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    endpoints: list[EndpointConfig] = Field(default_factory=list)


class ProjectUpdate(BaseModel):
    name: str | None = None
    endpoints: list[EndpointConfig] | None = None


class ProjectResponse(BaseModel):
    id: str
    name: str
    slug: str
    endpoints: list[EndpointConfig]
    created_at: datetime
    updated_at: datetime


class RequestLog(BaseModel):
    id: str
    project_slug: str
    endpoint_path: str
    method: str
    timestamp: datetime
    response_time_ms: int
