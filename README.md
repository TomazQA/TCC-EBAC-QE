# TCC-EBAC-QE

Trabalho de Conclusão de Curso — Profissão: Engenheiro de Qualidade de Software (EBAC).

Estratégia de testes e automação para o e-commerce **EBAC Shop** (http://lojaebac.ebaconline.art.br/).

## Estrutura do repositório

```
TCC-EBAC-QE/
├── docs/                     # Documento do TCC, mapa mental, evidências
├── API/                      # Testes de API (Supertest)
├── UI/                       # Testes de interface web (automação)
├── Mobile/                   # Testes mobile (Catálogo de Produtos)
└── .github/workflows/        # Pipelines de integração contínua (GitHub Actions)
```

## Histórias de usuário testadas

| ID | História |
|---|---|
| US-0001 | Adicionar item ao carrinho |
| US-0002 | Login na plataforma |
| US-0003 | API de cupons |
| US-0004 | Catálogo de Produtos |
| US-0005 | Painel Minha Conta |
| US-0006 | Meus Pedidos |
| US-0007 | Endereços |
| US-0008 | Detalhes da Conta |

## Como rodar os testes

Cada pasta (`API`, `UI`, `Mobile`) possui seu próprio `README.md` com instruções específicas de instalação e execução.

## Ambiente de testes

- Loja: http://lojaebac.ebaconline.art.br/
- Alternativa via Docker:
  ```
  docker network create --attachable ebac-network
  docker run -d --name wp_db -p 3306:3306 --network ebac-network ernestosbarbosa/lojaebacdb:latest
  docker run -d --name wp -p 80:80 --network ebac-network ernestosbarbosa/lojaebac:latest
  ```
  A loja fica disponível em `http://localhost:80`.

## Autor

Nome completo
Ano
