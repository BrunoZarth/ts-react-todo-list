import { Knex } from 'knex';

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
    return this.knex('users').insert(user).returning('id');
  }

  public async updateUser(id: number, user: Partial<Omit<User, 'id'>>): Promise<number> {
    return this.knex('users').where({ id }).update(user);
  }

  public async deleteUser(id: number): Promise<number> {
    return this.knex('users').where({ id }).del();
  }
}
