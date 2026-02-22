# Resume ATS

Aplicacao web em Next.js para autenticacao de usuarios e gerenciamento de perfil, com foco em fluxo de curriculo ATS.

## Visao geral

O projeto atualmente entrega:

- Pagina publica com CTAs dinamicos (usuario logado vai para `/dashboard`, usuario nao logado vai para `/register`)
- Fluxo de autenticacao completo
  - login
  - registro
  - forgot password
  - reset password
- Dashboard com resumo de perfil
- Edicao de perfil (nome, headline, telefone, localidade, LinkedIn, GitHub e portfolio)
- Navegacao responsiva com menu mobile no navbar para rotas de dashboard
- Estado global de autenticacao com Zustand
- Integracao HTTP com Axios

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Zustand
- Axios
- Font Awesome

## Requisitos

- Node.js 18+
- npm

## Como rodar

1. Instale dependencias:

```bash
npm install
```

2. Rode em desenvolvimento:

```bash
npm run dev
```

3. Acesse:

- Frontend: `http://localhost:3000`

## Scripts

```bash
npm run dev    # desenvolvimento
npm run build  # build de producao
npm run start  # sobe build de producao
npm run lint   # analise estatica
```

## Backend esperado

O frontend usa API em:

- `http://localhost:8080/api`

Configurado em `src/lib/axios.ts` com `withCredentials: true`.

Endpoints usados no frontend:

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/refresh`
- `POST /auth/logout`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /profile/me`
- `PUT /profile/me`

## Estrutura atual do projeto

```text
src/
|-- app/
|   |-- (auth)/
|   |   |-- forgot-password/
|   |   |   `-- page.tsx
|   |   |-- login/
|   |   |   `-- page.tsx
|   |   |-- register/
|   |   |   `-- page.tsx
|   |   `-- reset-password/
|   |       `-- page.tsx
|   |-- (public)/
|   |   `-- page.tsx
|   |-- components/
|   |   `-- navbar.tsx
|   |-- dashboard/
|   |   |-- profile/
|   |   |   `-- page.tsx
|   |   |-- layout.tsx
|   |   `-- page.tsx
|   |-- providers/
|   |   `-- AuthInitializer.tsx
|   |-- favicon.ico
|   |-- globals.css
|   `-- layout.tsx
|-- lib/
|   `-- axios.ts
`-- store/
    |-- types/
    |   `-- auth.ts
    |-- authStore.ts
    `-- fontawesome.ts
```

## Rotas

Publicas:

- `/`
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password?token=...`

Autenticadas (interface de dashboard):

- `/dashboard`
- `/dashboard/profile`

## Estilizacao

Tailwind v4 com configuracao central em `tailwind.config.ts`.

Arquivos principais:

- `src/app/globals.css`
- `postcss.config.mjs`
- `tailwind.config.ts`

## Estado de autenticacao

Gerenciado por `src/store/authStore.ts`.

Responsabilidades principais:

- persistir estado em memoria de sessao (`authUser`, `profile`, `accessToken`)
- carregar perfil apos login/registro
- validar sessao via refresh (`checkAuth`) no bootstrap da aplicacao
- logout

`AuthInitializer` (`src/app/providers/AuthInitializer.tsx`) executa `checkAuth()` ao montar o app.

## Observacoes

- Existem alertas/erros de lint de TypeScript em alguns arquivos (ex.: uso de `any`).
- O projeto depende de um backend compativel com os endpoints listados acima.

## Licenca

Projeto privado para estudo/evolucao.
