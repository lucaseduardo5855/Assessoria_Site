import express, { Request, Response } from 'express'; // <--- CORREÇÃO AQUI: Importando Request e Response
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { AuthRequest, authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Schemas de validação
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required(),
    phone: Joi.string().optional(),
    birthDate: Joi.date().optional(),
    height: Joi.number().min(100).max(250).optional(),
    weight: Joi.number().min(30).max(200).optional(),
    role: Joi.string().valid('STUDENT', 'ADMIN').default('STUDENT')
});


// Login
router.post('/login', asyncHandler(async (req: Request, res: Response) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        throw createError(error.details[0].message, 400);
    }

    const { email, password } = value;

    // Buscar usuário
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            studentProfile: true
        }
    });

    if (!user) {
        throw createError('Email ou senha incorretos', 401);
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw createError('Email ou senha incorretos', 401);
    }

    // Gerar token JWT
    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET || 'z4_performance_secret_key_2024',
        { expiresIn: '7d' }
    );

    // Remover senha da resposta <--- LINHA FALTANDO!
    const { password: _, ...userWithoutPassword } = user; // <--- INSERIR AQUI

    res.json({
        message: 'Login realizado com sucesso',
        token,
        user: userWithoutPassword
    });
}));

// Registro de aluno (apenas admin)
router.post('/register', authenticateToken, requireAdmin, asyncHandler(async (req: AuthRequest, res: Response) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
        throw createError(error.details[0].message, 400);
    }

    const { email, password, name, phone, birthDate, height, weight, role } = value;

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw createError('Email já cadastrado', 400);
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Criar usuário
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            phone,
            birthDate,
            role: role || 'STUDENT'
        }
    });

    // Se for aluno, criar perfil com altura e peso
    if (role === 'STUDENT' || !role) {
        await prisma.studentProfile.create({
            data: {
                userId: user.id,
                height: height || null,
                weight: weight || null
            }
        });
    }

    // Remover senha da resposta <--- LINHA FALTANDO!
    const { password: _, ...userWithoutPassword } = user; // <--- INSERIR AQUI

    res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: userWithoutPassword
    });
}));

// Verificar token
router.get('/verify', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        include: {
            studentProfile: true
        }
    });

    if (!user) {
        throw createError('Usuário não encontrado', 404);
    }

    // Remover senha da resposta <--- LINHA FALTANDO!
    const { password: _, ...userWithoutPassword } = user; // <--- INSERIR AQUI

    res.json({
        user: userWithoutPassword
    });
}));
// Logout (opcional - token é invalidado no frontend)
router.post('/logout', (req: Request, res: Response) => { // <--- CORRIGIDO
    res.json({ message: 'Logout realizado com sucesso' });
});

export default router;