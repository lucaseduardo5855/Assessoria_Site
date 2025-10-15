import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

export const authenticateToken = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                error: 'Token de acesso necessário'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

        // Verificar se o usuário ainda existe no banco
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true, role: true }
        });

        if (!user) {
            return res.status(401).json({
                error: 'Usuário não encontrado'
            });
        }

        req.user = user;
        // Mude de: next();
        return next(); // <--- CORREÇÃO AQUI
    } catch (error) {
        console.error('Erro na autenticação:', error);
        return res.status(403).json({
            error: 'Token inválido'
        });
    }
};

export const requireAdmin = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.user?.role !== 'ADMIN') {
        return res.status(403).json({
            error: 'Acesso negado. Apenas administradores.'
        });
    }
    // Mude de: next();
    return next(); // <--- CORREÇÃO AQUI
};

export const requireStudent = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.user?.role !== 'STUDENT') {
        return res.status(403).json({
            error: 'Acesso negado. Apenas alunos.'
        });
    }
    // Mude de: next();
    return next(); // <--- CORREÇÃO AQUI
};
