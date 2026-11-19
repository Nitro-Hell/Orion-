import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// In-memory user store for simulation / fallback when database is not provisioned
// In production, this ties into PostgreSQL users table.
const usersStore: any[] = [
  {
    id: 'user-default-1',
    name: 'Senior Developer',
    email: 'admin@codesphere.dev',
    // hashed password for 'password123'
    passwordHash: bcrypt.hashSync('password123', 10),
    role: 'Lead Engineer',
    codingStreak: 14,
    totalProjects: 12,
    completedChallenges: 28,
  },
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, password, name } = body;

    if (action === 'register') {
      if (!email || !password || !name) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
      const existing = usersStore.find((u) => u.email === email);
      if (existing) {
        return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
      }

      const passwordHash = bcrypt.hashSync(password, 10);
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        passwordHash,
        role: 'Developer',
        codingStreak: 1,
        totalProjects: 1,
        completedChallenges: 0,
      };
      usersStore.push(newUser);

      const { passwordHash: _, ...safeUser } = newUser;
      return NextResponse.json({ success: true, user: safeUser });
    }

    if (action === 'login') {
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
      }
      const user = usersStore.find((u) => u.email === email);
      if (!user) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      const isValid = bcrypt.compareSync(password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      const { passwordHash: _, ...safeUser } = user;
      return NextResponse.json({ success: true, user: safeUser });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Auth API error:', error);
    return NextResponse.json({ error: error.message || 'Authentication failed' }, { status: 500 });
  }
}
