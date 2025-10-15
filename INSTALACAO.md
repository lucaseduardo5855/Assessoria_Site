# 🚀 Guia de Instalação - Sistema Z4 Assessoria

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **PostgreSQL** (versão 12 ou superior)
- **npm** ou **yarn**

## 🛠️ Instalação Passo a Passo

### 1. Configurar o Banco de Dados

```bash
# Criar banco de dados PostgreSQL
createdb z4_assessoria

# Ou usando psql
psql -U postgres
CREATE DATABASE z4_assessoria;
\q
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/` com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/z4_assessoria"
JWT_SECRET="sua_chave_secreta_jwt_aqui_muito_longa_e_segura"
PORT=5000
NODE_ENV=development
```

**⚠️ IMPORTANTE:** Substitua `password` pela sua senha do PostgreSQL e `sua_chave_secreta_jwt_aqui_muito_longa_e_segura` por uma chave segura.

### 3. Instalar Dependências

```bash
# Na raiz do projeto
npm run install:all
```

Este comando instalará as dependências de:
- Backend (Node.js + TypeScript)
- Frontend (React + TypeScript)
- Dependências globais

### 4. Configurar o Banco de Dados

```bash
# Gerar cliente Prisma
cd backend
npx prisma generate

# Executar migrações
npx prisma migrate dev --name init

# Popular com dados iniciais
npm run db:seed
```

### 5. Executar o Sistema

```bash
# Na raiz do projeto
npm run dev
```

Este comando iniciará:
- Backend na porta 5000
- Frontend na porta 3000

## 🔑 Credenciais Padrão

Após executar o seed, você terá acesso com:

### Administrador
- **Email:** admin@z4performance.com
- **Senha:** admin123

### Alunos de Exemplo
- **Email:** adriane.xavier@email.com
- **Senha:** 123456

- **Email:** amanda.melo@email.com
- **Senha:** 123456

- **Email:** bruno.camargo@email.com
- **Senha:** 123456

## 🌐 Acessos

- **Sistema:** http://localhost:3000
- **API:** http://localhost:5000/api
- **Admin:** http://localhost:3000/admin
- **Aluno:** http://localhost:3000/dashboard

## 🔧 Integração com Landing Page

Para integrar o sistema com sua landing page existente:

1. **Inclua o script de integração:**
```html
<script src="integration.js"></script>
```

2. **Os botões "Área do Atleta" e "Área do Aluno" serão automaticamente redirecionados para o sistema.**

3. **Funções disponíveis:**
```javascript
// Verificar se está logado
if (window.isLoggedIn()) {
  console.log('Usuário logado');
}

// Obter dados do usuário
const user = window.getCurrentUser();
console.log(user);

// Fazer logout
window.logoutFromSystem();
```

## 📱 Funcionalidades Implementadas

### ✅ Sistema de Autenticação
- Login diferenciado para admin e alunos
- Cadastro de alunos pelo administrador
- Controle de acesso baseado em roles

### ✅ Dashboard Administrativo
- Visão geral das estatísticas
- Gerenciamento de alunos
- Criação de planilhas de treino
- Sistema de eventos
- Avaliações físicas

### ✅ Dashboard do Aluno
- Visualização de progresso
- Registro de treinos realizados
- Acompanhamento de eventos
- Histórico de avaliações

### ✅ Estrutura Base
- Backend completo com Node.js + TypeScript
- Frontend React com Material-UI
- Banco PostgreSQL com Prisma
- Sistema de rotas protegidas
- Responsividade mobile

## 🚧 Funcionalidades em Desenvolvimento

- Configuração completa de planilhas de treino
- Sistema de calendário avançado
- Gráficos de evolução de performance
- Geração de PDF das planilhas
- Sistema de avaliação física completo

## 🐛 Solução de Problemas

### Erro de Conexão com Banco
```bash
# Verificar se PostgreSQL está rodando
sudo service postgresql status

# Verificar conexão
psql -U postgres -d z4_assessoria
```

### Erro de Porta em Uso
```bash
# Verificar processos usando as portas
lsof -i :3000
lsof -i :5000

# Matar processo se necessário
kill -9 PID
```

### Erro de Dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique os logs do console
- Consulte a documentação do Prisma
- Verifique as configurações do banco de dados

## 🎯 Próximos Passos

1. **Personalizar o sistema** com suas cores e logo
2. **Configurar domínio** para produção
3. **Implementar funcionalidades específicas** da assessoria
4. **Adicionar mais tipos de exercícios** e modalidades
5. **Integrar com APIs externas** (Strava, Garmin, etc.)

---

**Desenvolvido por Lucas Eduardo para Z4 Performance** 🏃‍♂️💪
