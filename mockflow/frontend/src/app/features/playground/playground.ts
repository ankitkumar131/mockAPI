import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

import { ProjectService } from '../../core/services/project';
import { MockTestService } from '../../core/services/mock-test';
import { Project } from '../../core/models/project';
import { EndpointConfig } from '../../core/models/endpoint';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
  ],
  templateUrl: './playground.html',
  styleUrl: './playground.scss',
})
export class Playground implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly mockTestService = inject(MockTestService);
  private readonly snackBar = inject(MatSnackBar);

  project = signal<Project | null>(null);
  loading = signal(true);
  testing = signal(false);

  selectedEndpoint = signal<EndpointConfig | null>(null);
  requestBody = '';
  responseStatus = signal<number | null>(null);
  responseBody = signal<string>('');
  responseTime = signal<number>(0);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.projectService.get(slug).subscribe({
      next: (project: Project) => {
        this.project.set(project);
        if (project.endpoints.length > 0) {
          this.selectEndpoint(project.endpoints[0]);
        }
        this.loading.set(false);
      },
      error: () => {
        this.snackBar.open('Project not found', 'Close', { duration: 3000 });
        this.loading.set(false);
      },
    });
  }

  selectEndpoint(ep: EndpointConfig): void {
    this.selectedEndpoint.set(ep);
    this.requestBody = '';
    this.responseStatus.set(null);
    this.responseBody.set('');
  }

  getFullUrl(): string {
    const project = this.project();
    const ep = this.selectedEndpoint();
    if (!project || !ep) return '';
    return `http://localhost:8001/mock/${project.slug}${ep.path}`;
  }

  sendRequest(): void {
    const ep = this.selectedEndpoint();
    if (!ep) return;

    this.testing.set(true);
    const startTime = performance.now();

    this.mockTestService
      .test({
        method: ep.method,
        url: this.getFullUrl(),
        body: this.requestBody ? JSON.parse(this.requestBody) : undefined,
      })
      .subscribe({
        next: (response: any) => {
          this.responseTime.set(Math.round(performance.now() - startTime));
          this.responseStatus.set(response.status);
          this.responseBody.set(JSON.stringify(response.body, null, 2));
          this.testing.set(false);
        },
        error: (err: any) => {
          this.responseTime.set(Math.round(performance.now() - startTime));
          this.responseStatus.set(err.status || 0);
          this.responseBody.set(JSON.stringify(err.error, null, 2));
          this.testing.set(false);
        },
      });
  }

  getStatusClass(): string {
    const status = this.responseStatus();
    if (!status) return '';
    if (status >= 200 && status < 300) return 'status-success';
    if (status >= 400 && status < 500) return 'status-warn';
    return 'status-error';
  }
}
