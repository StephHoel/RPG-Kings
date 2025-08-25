export interface User {
  id: string
  email: string
  name?: string
}

export interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (email: string, password: string) => Promise<boolean>
}
