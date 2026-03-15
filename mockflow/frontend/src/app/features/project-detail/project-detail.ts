import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProjectService } from '../../core/services/project';
import { Project } from '../../core/models/project';
import { EndpointConfig } from '../../core/models/endpoint';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDividerModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly projectService = inject(ProjectService);
  private readonly snackBar = inject(MatSnackBar);

  project = signal<Project | null>(null);
  loading = signal(true);
  saving = signal(false);
  methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    endpoints: this.fb.array([]),
  });

  get endpoints(): FormArray {
    return this.form.get('endpoints') as FormArray;
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.projectService.get(slug).subscribe({
      next: (project: Project) => {
        this.project.set(project);
        this.form.patchValue({ name: project.name });
        project.endpoints.forEach((ep: EndpointConfig) => {
          this.endpoints.push(
            this.fb.group({
              method: [ep.method, Validators.required],
              path: [ep.path, Validators.required],
              response_body: [JSON.stringify(ep.response_body, null, 2), Validators.required],
              status_code: [ep.status_code, [Validators.required, Validators.min(100), Validators.max(599)]],
              delay_ms: [ep.delay_ms],
              use_faker: [ep.use_faker],
              faker_template: [ep.use_faker ? JSON.stringify(ep.faker_template, null, 2) : ''],
            })
          );
        });
        this.loading.set(false);
      },
      error: () => {
        this.snackBar.open('Project not found', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      },
    });
  }

  addEndpoint(): void {
    this.endpoints.push(
      this.fb.group({
        method: ['GET', Validators.required],
        path: ['/api/', [Validators.required]],
        response_body: ['{\n  "message": "Hello"\n}', Validators.required],
        status_code: [200, [Validators.required, Validators.min(100), Validators.max(599)]],
        delay_ms: [0],
        use_faker: [false],
        faker_template: [''],
      })
    );
  }

  removeEndpoint(index: number): void {
    this.endpoints.removeAt(index);
  }

  save(): void {
    if (this.form.invalid || !this.project()) return;
    this.saving.set(true);

    const value = this.form.value;
    const payload = {
      name: value.name!,
      endpoints: (value.endpoints || []).map((ep: any) => ({
        method: ep.method,
        path: ep.path,
        response_body: this.parseJson(ep.response_body),
        status_code: ep.status_code,
        delay_ms: ep.delay_ms || 0,
        headers: {},
        use_faker: ep.use_faker || false,
        faker_template: ep.use_faker ? this.parseJson(ep.faker_template) : {},
      })),
    };

    this.projectService.update(this.project()!.slug, payload).subscribe({
      next: (updated: Project) => {
        this.project.set(updated);
        this.snackBar.open('Project saved!', 'Close', { duration: 2000 });
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.open('Save failed', 'Close', { duration: 3000 });
        this.saving.set(false);
      },
    });
  }

  getMockUrl(): string {
    return `http://localhost:8001/mock/${this.project()?.slug}`;
  }

  copyUrl(): void {
    navigator.clipboard.writeText(this.getMockUrl());
    this.snackBar.open('Mock URL copied!', 'Close', { duration: 2000 });
  }

  private parseJson(str: string): Record<string, any> {
    try {
      return JSON.parse(str);
    } catch {
      return {};
    }
  }
}
