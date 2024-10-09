import { Knex } from 'knex';
import bcrypt from 'bcryptjs'; // Importar bcrypt para verificar senhas

interface User {
  id: number;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export class UserModel {
  constructor(private knex: Knex) {}

  public async getUserByEmail(email: string): Promise<User | undefined> {
    return this.knex<User>('users').where({ email }).first();
  }

  public async getAllUsers(): Promise<User[]> {
    return this.knex<User>('users').select('*');
  }

  public async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<number[]> {
    // Você pode optar por hash a senha aqui se ainda não estiver sendo feito no controlador
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.knex('users').insert({ ...user, password: hashedPassword }).returning('id');
  }

  public async updateUser(id: number, user: Partial<Omit<User, 'id'>>): Promise<number> {
    return this.knex('users').where({ id }).update(user);
  }

  public async deleteUser(id: number): Promise<number> {
    return this.knex('users').where({ id }).del();
  }

  public async login(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email); 
    if (!user) {
      return null; 
    }
    const isMatch = await bcrypt.compare(password, user.password.trim()); 
    return isMatch ? user : null; 
  }
}
