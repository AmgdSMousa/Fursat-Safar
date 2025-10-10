export interface User {
  fullName: string;
  email: string;
  password: string; // In a real app, this would be a hash
  registeredAt: string;
  isAdmin: boolean;
}

export const initialUsers: User[] = [
  {
    fullName: 'Admin User',
    email: 'admin@fursatsafar.com',
    password: 'admin123',
    registeredAt: new Date('2023-01-01T10:00:00Z').toISOString(),
    isAdmin: true,
  },
  {
    fullName: 'Test User',
    email: 'user@fursatsafar.com',
    password: 'user123',
    registeredAt: new Date('2023-01-02T11:30:00Z').toISOString(),
    isAdmin: false,
  },
];