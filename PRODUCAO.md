# Configuração para Produção

## Variáveis de Ambiente de Produção

### Backend (.env)
```env
DATABASE_URL="postgresql://usuario:senha@host:5432/z4_assessoria_prod"
JWT_SECRET="chave_super_secreta_para_producao_muito_longa_e_complexa"
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://api.z4performance.com/api
REACT_APP_ENVIRONMENT=production
```

## Scripts de Build

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Servir arquivos estáticos com nginx ou similar
```

## Configuração do Nginx

```nginx
server {
    listen 80;
    server_name z4performance.com www.z4performance.com;
    
    # Frontend
    location / {
        root /var/www/z4performance/frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL com Let's Encrypt

```bash
# Instalar certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d z4performance.com -d www.z4performance.com
```

## Backup do Banco de Dados

```bash
# Backup diário
pg_dump z4_assessoria_prod > backup_$(date +%Y%m%d).sql

# Restaurar backup
psql z4_assessoria_prod < backup_20240101.sql
```

## Monitoramento

### PM2 para Node.js
```bash
npm install -g pm2
pm2 start backend/dist/index.js --name "z4-backend"
pm2 startup
pm2 save
```

### Logs
```bash
pm2 logs z4-backend
pm2 monit
```
