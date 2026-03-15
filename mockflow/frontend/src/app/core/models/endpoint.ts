export interface EndpointConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  response_body: Record<string, any>;
  status_code: number;
  delay_ms: number;
  headers: Record<string, string>;
  use_faker: boolean;
  faker_template: Record<string, any>;
  hit_count?: number;
}
