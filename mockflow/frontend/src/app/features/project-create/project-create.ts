import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
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

import { ProjectService } from '../../core/services/project';
import { Project } from '../../core/models/project';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [
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
  ],
  templateUrl: './project-create.html',
  styleUrl: './project-create.scss',
})
export class ProjectCreate {
  private readonly fb = inject(FormBuilder);
  private readonly projectService = inject(ProjectService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  saving = signal(false);
  methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    endpoints: this.fb.array([]),
  });

  get endpoints(): FormArray {
    return this.form.get('endpoints') as FormArray;
  }

  addEndpoint(): void {
    this.endpoints.push(
      this.fb.group({
        method: ['GET', Validators.required],
        path: ['/api/', [Validators.required, Validators.minLength(1)]],
        response_body: ['{\n  "message": "Hello from MockFlow"\n}', Validators.required],
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

  submit(): void {
    if (this.form.invalid) return;

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

    this.projectService.create(payload).subscribe({
      next: (project: Project) => {
        this.snackBar.open('Project created!', 'Close', { duration: 2000 });
        this.router.navigate(['/projects', project.slug]);
      },
      error: () => {
        this.snackBar.open('Failed to create project', 'Close', { duration: 3000 });
        this.saving.set(false);
      },
    });
  }

  private parseJson(str: string): Record<string, any> {
    try {
      return JSON.parse(str);
    } catch {
      return {};
    }
  }
}
