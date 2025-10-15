# Z4 Assessoria System

Sistema completo de assessoria esportiva desenvolvido com React, Node.js, PostgreSQL e TypeScript.

## 🚀 Funcionalidades

### Área Administrativa
- **Cadastro de Alunos**: Gerenciamento completo de alunos da assessoria
- **Configuração de Planilhas**: Criação de treinos personalizados
  - Modalidades: Corrida e Musculação
  - Tipos de treino e percursos
  - Exercícios com séries, carga, intervalo e repetições
  - Geração de PDF das planilhas
- **Calendário de Eventos**: Criação e gerenciamento de eventos
- **Avaliação Física**: Acompanhamento de performance dos alunos

### Área do Aluno
- **Dashboard Personalizado**: Visualização de treinos e progresso
- **Registro de Treinos**: Cadastro de treinos realizados
- **Gráficos de Evolução**: 
  - Pace (corrida)
  - Velocidade
  - Tempo
  - Visualização por semana, mês e ano
- **Histórico de Provas**: Participações e resultados
- **Calendário de Eventos**: Confirmação de presença

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT
- **UI**: Material-UI + Styled Components
- **Gráficos**: Chart.js
- **PDF**: jsPDF

## 📦 Instalação

1. Clone o repositório
2. Execute o comando de instalação:
```bash
npm run install:all
```

3. Configure o banco de dados:
```bash
npm run db:setup
```

4. Execute o projeto:
```bash
npm run dev
```

## 🔧 Configuração

### Banco de Dados
Configure as variáveis de ambiente no arquivo `backend/.env`:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/z4_assessoria
JWT_SECRET=sua_chave_secreta_jwt
PORT=5000
```

### Frontend
Configure a URL da API no arquivo `frontend/src/config/api.ts`:

```typescript
export const API_BASE_URL = 'http://localhost:5000/api';
```

## 📱 Uso

1. **Administrador**: Acesse `/admin` para gerenciar alunos e criar planilhas
2. **Aluno**: Acesse `/login` para entrar na área do aluno
3. **Landing Page**: Mantém o design original com integração ao sistema

## 🎯 Funcionalidades Principais

### Sistema de Login
- Login diferenciado para administrador e alunos
- Cadastro de alunos pelo administrador
- Controle de acesso baseado em roles

### Planilhas de Treino
- Criação de treinos estruturados
- Exercícios com parâmetros detalhados
- Geração automática de descrições
- Exportação para PDF

### Acompanhamento
- Gráficos de evolução de performance
- Histórico completo de treinos
- Sistema de avaliação física
- Calendário de eventos

## 📄 Licença

MIT License - Desenvolvido por Lucas Eduardo
