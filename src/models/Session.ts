export interface CreateSession {
  username: string;
  password: string;
}

export interface UserAuthenticated {
  username: string;
  token: string;
}
