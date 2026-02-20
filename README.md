# Resume ATS

Uma aplicação moderna de Resume ATS (Applicant Tracking System) construída com **Next.js 15+**, **Tailwind CSS**, **Zustand** e **Axios**. Esta aplicação oferece uma solução completa para gerenciamento de currículos com autenticação de usuários, gerenciamento de perfil e recursos de exportação de documentos.

## 🎯 Funcionalidades

- **Autenticação de Usuário**: Sistema de autenticação completo com login, registro, redefinição de senha e fluxos de recuperação de senha
- **Dashboard do Usuário**: Dashboard personalizado para usuários autenticados
- **Gerenciamento de Perfil**: Atualizar e gerenciar informações de perfil do usuário
- **Gerenciamento de Estado**: Gerenciamento de estado global com o store Zustand
- **Exportação de Documentos**: Converter currículos para PDF e formatos DOCX com html2pdf.js
- **Design Responsivo**: Design responsivo mobile-first com Tailwind CSS
- **Type Safe**: Suporte completo a TypeScript para segurança de tipo e melhor experiência do desenvolvedor

## 📋 Stack de Tecnologias

| Categoria | Tecnologia |
|----------|------------|
| **Framework** | Next.js 15+ (App Router) |
| **Linguagem** | TypeScript |
| **Estilização** | Tailwind CSS |
| **Gerenciamento de Estado** | Zustand |
| **Cliente HTTP** | Axios |
| **Exportação de Documentos** | html2pdf.js |
| **Ferramenta de Build** | npm |

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── (auth)/                 # Rotas de autenticação
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── (public)/               # Páginas públicas
│   ├── dashboard/              # Dashboard protegido
│   │   ├── page.tsx
│   │   └── profile/
│   ├── globals.css
│   ├── layout.tsx
├── services/
│   └── api.ts                  # Cliente API com Axios
├── store/
│   └── userStore.ts            # Store de usuário com Zustand
```

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/isabelxis/resume-ats.git
cd resume-ats
```

2. Instale as dependências:
```bash
npm install
npm install axios

```

### Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

### Scripts Disponíveis

```bash
# Servidor de desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Inicie o servidor de produção
npm start

# Execute ESLint para verificações de qualidade de código
npm run lint
```

## 📝 Como Usar

1. **Criar uma Conta**: Visite a página de registro para criar uma nova conta
2. **Fazer Login**: Use suas credenciais para acessar o dashboard
3. **Gerenciar Perfil**: Atualize suas informações de perfil na página de perfil
4. **Exportar Currículo**: Converta e baixe seu currículo como PDF ou DOCX

## 🔐 Fluxo de Autenticação

A aplicação utiliza um sistema de autenticação estruturado com as seguintes rotas:
- `/login` - Página de login do usuário
- `/register` - Página de registro do usuário
- `/forgot-password` - Recuperação de senha
- `/reset-password` - Redefinição de senha com validação de token

As rotas protegidas redirecionam usuários não autenticados para a página de login.

## 🎨 Estilização

O projeto usa **Tailwind CSS** para toda a estilização. Estilos personalizados podem ser adicionados aos estilos globais em `src/app/globals.css` ou usando classes Tailwind diretamente nos componentes.

## 🔧 Diretrizes de Desenvolvimento

- Use TypeScript para segurança de tipo
- Siga as melhores práticas do React
- Gerencie o estado global com Zustand
- Use classes utilitárias do Tailwind CSS para estilização
- Mantenha os componentes modulares e reutilizáveis

## 🚀 Implantação

A aplicação pode ser implantada no Vercel, Netlify ou qualquer plataforma de hospedagem Node.js.

### Implantar no Vercel

A forma mais fácil de implantar é usando o [Vercel Platform](https://vercel.com):

```bash
npm i -g vercel
vercel
```

Para mais detalhes, confira a [documentação de implantação do Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

## 📚 Saiba Mais

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação do Zustand](https://github.com/pmndrs/zustand)
- [Documentação do Axios](https://axios-http.com/)

## 📄 Licença

Este projeto é código aberto e disponibilizado sob a Licença MIT.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para enviar problemas e solicitações de recursos.

---

**Bom codificando!** 🎉
