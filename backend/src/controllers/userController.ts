import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import jwt from 'jsonwebtoken'; // Importar JWT
import bcrypt from 'bcryptjs'; // Importar bcrypt para verificar senhas
import dotenv from 'dotenv';

dotenv.config(); // Carregar variáveis de ambiente

export class UserController {
  constructor(private userModel: UserModel) {}

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userModel.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }

  public async getUserByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const user = await this.userModel.getUserByEmail(email);
      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const userId = await this.userModel.createUser({ email, password });
      res.status(201).json({ message: 'Usuário criado', id: userId });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedRows = await this.userModel.updateUser(Number(id), userData);
      if (updatedRows) {
        res.status(200).json({ message: 'Usuário atualizado' });
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedRows = await this.userModel.deleteUser(Number(id));
      if (deletedRows) {
        res.status(200).json({ message: 'Usuário deletado' });
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }

  // Método de login atualizado
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email e senha são obrigatórios.' });
      return;
    }

    try {
      const user = await this.userModel.login(email, password); // Chama o método login do UserModel

      if (!user) {
        res.status(401).json({ message: 'Email ou senha incorretos.' });
        return;
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor.' });
    }
  }
}
