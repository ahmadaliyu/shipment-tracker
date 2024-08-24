export interface LoginResponse {
  message: string;
  home_page: string;
  full_name: string;
}

export interface LoginRequest {
  usr: string;
  pwd: string;
}
