import { EndpointConfig } from './endpoint';

export interface Project {
  id: string;
  name: string;
  slug: string;
  endpoints: EndpointConfig[];
  created_at: string;
  updated_at: string;
}

export interface ProjectCreate {
  name: string;
  endpoints: EndpointConfig[];
}

export interface ProjectUpdate {
  name?: string;
  endpoints?: EndpointConfig[];
}
