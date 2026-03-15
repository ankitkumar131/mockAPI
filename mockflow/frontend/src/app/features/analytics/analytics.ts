import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProjectService } from '../../core/services/project';
import { Project } from '../../core/models/project';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);

  project = signal<Project | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.projectService.get(slug).subscribe({
      next: (project: Project) => {
        this.project.set(project);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  totalHits(): number {
    const p = this.project();
    if (!p) return 0;
    return p.endpoints.reduce((sum, ep) => sum + (ep.hit_count || 0), 0);
  }

  sortedEndpoints() {
    const p = this.project();
    if (!p) return [];
    return [...p.endpoints].sort((a, b) => (b.hit_count || 0) - (a.hit_count || 0));
  }
}
