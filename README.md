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
├── K6/                       # Testes de performance
└── .github/workflows/        # Pipelines de integração contínua (GitHub Actions)
```

## Status geral do projeto

| Camada | Status |
|---|---|
| Estratégia de teste, critérios de aceitação (Gherkin) e casos de teste | ✅ Concluído (8 histórias) |
| Automação de API (Supertest) | ✅ Concluído e validado |
| Automação de UI (Cypress) | ✅ Concluído e validado |
| Automação Mobile (WebdriverIO + Appium) | ⚠️ Não concluída — ver `docs/limitacoes-mobile.md` |
| Testes de performance (K6) | ✅ Concluído e validado |
| Integração contínua (GitHub Actions) | ✅ Configurado e funcional |

## Histórias de usuário e cobertura de automação

| ID | História | Camada automatizada | Caminho feliz | Caminho negativo |
|---|---|---|---|---|
| US-0001 | Adicionar item ao carrinho | UI (Cypress) | ✅ Aprovado | ⚠️ Reprovado — defeito real confirmado (ver DEF-001 em `docs/defeitos.md`) |
| US-0002 | Login na plataforma | UI (Cypress) + K6 | ✅ Aprovado | ✅ Aprovado |
| US-0003 | API de cupons | API (Supertest) + K6 | ✅ Aprovado | ✅ Aprovado |
| US-0004 | Catálogo de Produtos | UI (Cypress) | ✅ Aprovado | ✅ Aprovado |
| US-0005 | Painel Minha Conta | Não automatizado (apenas manual/critérios definidos) | — | — |
| US-0006 | Meus Pedidos | Não automatizado (apenas manual/critérios definidos) | — | — |
| US-0007 | Endereços | Não automatizado (apenas manual/critérios definidos) | — | — |
| US-0008 | Detalhes da Conta | UI (Cypress) | ✅ Aprovado | ✅ Aprovado |

**Observação:** todas as 8 histórias possuem critérios de aceitação em Gherkin e casos de teste documentados (seções 4.2 e 4.3 do documento em `docs/`), independentemente de terem sido automatizadas. As histórias US-0005, US-0006 e US-0007 foram cobertas apenas por planejamento de teste (Gherkin + casos de teste), sem automação, por não fazerem parte do escopo mínimo de automação exigido pelo enunciado.

**Pendências conhecidas:**
- A automação mobile da US-0004 (Catálogo de Produtos no app Android) não foi concluída — detalhes completos em `docs/limitacoes-mobile.md`.
- No K6, o login mantém p95 abaixo de 3 s, mas a taxa de falha oscilou entre 3,99% e 7,91% nas quatro execuções (limite: 5%), e a causa não foi investigada — ver `docs/performance.md`.
- O defeito DEF-001 (limite de 10 itens por produto no carrinho não aplicado pela loja) segue em aberto — o caso de teste correspondente foi mantido no código, falhando intencionalmente, até a correção do defeito.

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

Enrico Alencar Tomaz
2026
