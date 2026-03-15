import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project, ProjectCreate, ProjectUpdate } from '../models/project';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8001/api/projects';

  list() {
    return this.http.get<Project[]>(this.apiUrl);
  }

  get(slug: string) {
    return this.http.get<Project>(`${this.apiUrl}/${slug}`);
  }

  create(data: ProjectCreate) {
    return this.http.post<Project>(this.apiUrl, data);
  }

  update(slug: string, data: ProjectUpdate) {
    return this.http.put<Project>(`${this.apiUrl}/${slug}`, data);
  }

  delete(slug: string) {
    return this.http.delete<void>(`${this.apiUrl}/${slug}`);
  }
}
