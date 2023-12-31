# Nest JS - Testes automatizado
Projeto criado para demonstrar a utilização de testes automatizado com o `Nest JS`, `Jest` e o `Supertest`

## Execuções
Primeiro instale as dependências com o seguinte comando
```bash
npm i
```

### Testes unitários
Para executar todos os testes unitário utilize este atalho
```bash
npm run test
```

Para criar o `coverage` dos testes unitário mostrando a cobertura dos testes
```bash
npm run test:cov
```

### Testes e2e
Primeiro precisamos criar as migrations com o `Prisma` utilizando o seguinte comando
```bash
npx prisma migrate dev
```

Para executar todos os testes e2e utilize este atalho
```bash
npm run test:e2e
```

Para criar o `coverage` dos testes e2e mostrando a cobertura dos testes
```bash
npm run test:e2e:cov
```

## Execução da aplicação
Depois de realizar a criação do banco de dados basta utilizar este atalho
```bash
npm run start:dev
```

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/28245172-44e94ff0-cfdf-4a92-aaa5-a06c3b510be3?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D28245172-44e94ff0-cfdf-4a92-aaa5-a06c3b510be3%26entityType%3Dcollection%26workspaceId%3Dce60cf7e-ad48-4ffe-aa27-7279b192887a)
