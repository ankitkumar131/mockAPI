import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { ProjectService } from '../../core/services/project';
import { Project } from '../../core/models/project';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  projects = signal<Project[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading.set(true);
    this.projectService.list().subscribe({
      next: (projects: Project[]) => {
        this.projects.set(projects);
        this.loading.set(false);
      },
      error: () => {
        this.snackBar.open('Failed to load projects', 'Close', { duration: 3000 });
        this.loading.set(false);
      },
    });
  }

  deleteProject(slug: string, name: string): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { title: 'Delete Project', message: `Delete "${name}"? This cannot be undone.` },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.projectService.delete(slug).subscribe({
          next: () => {
            this.snackBar.open('Project deleted', 'Close', { duration: 2000 });
            this.loadProjects();
          },
          error: () => this.snackBar.open('Delete failed', 'Close', { duration: 3000 }),
        });
      }
    });
  }

  getMockUrl(slug: string): string {
    return `http://localhost:8001/mock/${slug}`;
  }

  copyUrl(slug: string): void {
    navigator.clipboard.writeText(this.getMockUrl(slug));
    this.snackBar.open('Mock URL copied!', 'Close', { duration: 2000 });
  }

  totalEndpoints(project: Project): number {
    return project.endpoints.length;
  }

  totalHits(project: Project): number {
    return project.endpoints.reduce((sum, ep) => sum + (ep.hit_count || 0), 0);
  }
}
