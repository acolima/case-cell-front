# CaseCellShop

Loja virtual simples e objetiva para vendas de capinhas de celular.

## Tecnologias

<p>
  <img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' alt="React" />
  <img src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white' alt="TypeScript" />
  <img src='https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white' alt="MaterialUI"/>
  <img src='https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E' alt="Vite"/>
  <img src='https://img.shields.io/badge/axios%20-%2320232a.svg?&style=for-the-badge&color=informational' alt="Axios">
</p>

## Como rodar
1. Clone o repositório

```
git clone git@github.com:acolima/case-cell-front.git
```

2. Vá até a pasta do projeto

```
 cd case-cell-front
```

3. Instale as dependências

```
npm install
```
4. Crie um arquivo `.env` na raiz do projeto (veja `.env.example`) com a URL da sua API

```
VITE_API_URL=
```

5. Rode o projeto com

```
npm run dev
```

6. Acesse `http://localhost:5173` no seu navegador

## Decisões Técnicas
- Vite para configurar o projeto: escolhido pelo tempo de build rápido e por trazer um ambiente de desenvolvimento mais moderno e leve.
- Material UI (MUI): oferece componentes com design limpo e acessíveis, afim de acelerar o desenvolvimento da interface.
- Gerenciamento de Estado do Carrinho: são utilizados a Context API juntamente com o localStorage para persistir as informações.
- Idempotência: implementado no momento do checkout para evitar cobranças duplicadas.

## Limitações 
- Autenticação: o projeto ainda não conta com um sistema de cadastro e autenticação de usuários, sendo gerenciado atualmente através de um clientId aleatório e salvo no localStorage.
- Pagamento: o sistema não conta com pagamentos reais, apenas simulados, não processando transações financeiras reais.

## Próximos Passos
[ ] Implementar testes unitários para os componentes React e Contextos utilizando Vitest e React Testing Library.

[ ] Criar testes E2E com Cypress simulando a jornada completa de compra.

[ ] Desenvolver uma tela de cadastro de usuários.

[ ] Desenvolver uma tela de perfil do usuário, exibindo o histórico de pedidos.

## Sobre mim

<img src='https://avatars.githubusercontent.com/acolima' width='150px'/>

<p>
  <a href='https://www.linkedin.com/in/ana-caroline-oliveira-lima/'>
    <img src='https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white' alt='LinkedIn' />
  </a>
  <a href='mailto:acolima@gmail.com'>
    <img src='https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white' alt='Gmail' />
  </a>
</p>
