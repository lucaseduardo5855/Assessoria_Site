# 🚨 SOLUÇÃO PARA ERRO P1000 - PostgreSQL no Windows

## Problema Identificado
O erro P1000 indica que o PostgreSQL não está instalado ou configurado corretamente no seu sistema Windows.

## 🔧 Soluções Possíveis

### Opção 1: Instalar PostgreSQL (Recomendado)

1. **Baixar PostgreSQL:**
   - Acesse: https://www.postgresql.org/download/windows/
   - Baixe a versão mais recente (15.x ou 16.x)

2. **Instalar PostgreSQL:**
   - Execute o instalador
   - **IMPORTANTE:** Anote a senha do usuário `postgres` que você definir
   - Mantenha a porta padrão 5432
   - Instale o pgAdmin (opcional, mas útil)

3. **Verificar instalação:**
   ```cmd
   # Abrir Command Prompt como Administrador
   psql --version
   ```

4. **Criar banco de dados:**
   ```cmd
   # Conectar ao PostgreSQL
   psql -U postgres
   
   # Criar banco
   CREATE DATABASE z4_assessoria;
   
   # Sair
   \q
   ```

### Opção 2: Usar Docker (Alternativa)

Se preferir usar Docker:

1. **Instalar Docker Desktop:**
   - Baixe em: https://www.docker.com/products/docker-desktop/

2. **Executar PostgreSQL no Docker:**
   ```cmd
   docker run --name z4-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=z4_assessoria -p 5432:5432 -d postgres:15
   ```

### Opção 3: Usar SQLite (Desenvolvimento Rápido)

Para desenvolvimento rápido, podemos usar SQLite:

1. **Modificar schema.prisma:**
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```

2. **Instalar dependência SQLite:**
   ```cmd
   cd backend
   npm install sqlite3
   ```

## 📝 Configuração do Arquivo .env

Após instalar o PostgreSQL, crie o arquivo `backend/.env`:

```env
# Para PostgreSQL local
DATABASE_URL="postgresql://postgres:SUA_SENHA_AQUI@localhost:5432/z4_assessoria"
JWT_SECRET="sua_chave_secreta_jwt_aqui_muito_longa_e_segura_para_producao"
PORT=5000
NODE_ENV=development
```

**⚠️ IMPORTANTE:** Substitua `SUA_SENHA_AQUI` pela senha que você definiu para o usuário `postgres`.

## 🚀 Próximos Passos

Após resolver o PostgreSQL:

1. **Gerar cliente Prisma:**
   ```cmd
   cd backend
   npx prisma generate
   ```

2. **Executar migrações:**
   ```cmd
   npx prisma migrate dev --name init
   ```

3. **Popular com dados iniciais:**
   ```cmd
   npm run db:seed
   ```

4. **Iniciar o sistema:**
   ```cmd
   cd ..
   npm run dev
   ```

## 🔍 Verificação de Problemas

### Se ainda der erro P1000:

1. **Verificar se PostgreSQL está rodando:**
   ```cmd
   # Windows Services
   services.msc
   # Procurar por "postgresql" e verificar se está "Running"
   ```

2. **Verificar credenciais:**
   ```cmd
   psql -U postgres -h localhost
   # Digite a senha quando solicitado
   ```

3. **Verificar se o banco existe:**
   ```cmd
   psql -U postgres -c "\l"
   # Procurar por "z4_assessoria" na lista
   ```

## 💡 Dica Rápida

Se você não quiser instalar PostgreSQL agora, posso modificar o sistema para usar SQLite temporariamente. É mais simples para desenvolvimento inicial!

Qual opção você prefere seguir?
