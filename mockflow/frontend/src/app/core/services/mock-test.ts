import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

export interface MockTestRequest {
  method: string;
  url: string;
  body?: any;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class MockTestService {
  private readonly http = inject(HttpClient);

  test(request: MockTestRequest) {
    const options: any = {
      observe: 'response' as const,
      headers: request.headers || {},
    };

    switch (request.method) {
      case 'POST':
        return this.http.post(request.url, request.body || {}, options);
      case 'PUT':
        return this.http.put(request.url, request.body || {}, options);
      case 'PATCH':
        return this.http.patch(request.url, request.body || {}, options);
      case 'DELETE':
        return this.http.delete(request.url, options);
      default:
        return this.http.get(request.url, options);
    }
  }
}
