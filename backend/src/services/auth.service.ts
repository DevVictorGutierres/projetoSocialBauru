import { prisma } from '../config/prisma.js';
import { generateToken } from '../utils/jwt.js';
import type { AuthLoginDTO } from '../dtos/auth/login.js';
import bcrypt from 'bcrypt';
import { AppError } from '../utils/appError.js';

export const authenticateUser = async ({ email, senha }: AuthLoginDTO) => {
    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        throw new AppError('Usuario ou senha invalidos', 401);
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
        throw new AppError('Usuario ou senha invalidos', 401);
    }

    const token = generateToken(user.id);

    return {
        token,
        user: {
            id: user.id,
            nome: user.nome,
            email: user.email
        }
    };
};