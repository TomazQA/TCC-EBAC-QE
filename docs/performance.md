# Resultados dos Testes de Performance (K6)

## Configuração utilizada (conforme especificado no enunciado)

- Usuários virtuais (VUs): 20
- Ramp-up: 20 segundos
- Tempo de execução total: 2 minutos
- Massa de dados (cenário de login): 5 usuários (`user1_ebac` a `user5_ebac`)

---

## Cenário 1 — Login na plataforma (US-0002)

**Script:** `scenarios/login.js`

| Métrica | Resultado | Limite (threshold) | Status |
|---|---|---|---|
| p95 do tempo de resposta | 2,29s | < 3s | Dentro do limite |
| Taxa de falha | 4,30% | < 5% | Dentro do limite |
| Tempo médio de resposta | 1,57s | — | — |
| Total de requisições | 860 | — | — |

**Conclusão:** o endpoint de login (`wp-login.php`) suportou a carga de 20 usuários virtuais simultâneos dentro dos limites de performance estabelecidos. O tempo de resposta cresce de forma esperada sob carga (de 83ms no melhor caso a 2,91s no pior), mas se mantém dentro de um patamar aceitável para um fluxo de autenticação.

---

## Cenário 2 — Listagem de cupons via API (US-0003)

**Script:** `scenarios/coupons.js`

| Métrica | Resultado | Limite (threshold) | Status |
|---|---|---|---|
| p95 do tempo de resposta | 4,56s | < 2s | Fora do limite |
| Taxa de falha | 40,15% | < 5% | Fora do limite |
| Tempo médio de resposta | 3,26s | — | — |
| Total de requisições | 523 | — | — |

### Diagnóstico complementar

Para investigar a causa das falhas, foi executado um teste reduzido (`scenarios/diagnostico-coupons.js`), com apenas **5 VUs por 15 segundos**, mantendo a mesma autenticação e endpoint:

| Carga | Taxa de sucesso | Tempo médio de resposta |
|---|---|---|
| 5 VUs | 100% | 885ms |
| 20 VUs | ~60% (falha de 40,15%) | 3,26s (p95: 4,56s) |

Com apenas 5 usuários simultâneos, a API respondeu com 100% de sucesso e tempo médio de 885ms — descartando problemas de autenticação, endpoint incorreto ou erro no script de teste.

**Conclusão:** o endpoint `GET /wc/v3/coupons` da API REST do WooCommerce degrada significativamente sob concorrência de 20 usuários simultâneos, apresentando alta taxa de falha (40,15%) e tempo de resposta elevado (p95 de 4,56s). Isso sugere uma limitação de capacidade de concorrência do ambiente de teste.

**Recomendação:** investigar a configuração de concorrência do servidor (PHP-FPM, limites de conexão com o banco) caso esse endpoint precise suportar tráfego mais alto em produção.

---

## Comparativo entre os dois cenários

| Cenário | Taxa de falha a 20 VUs | p95 a 20 VUs |
|---|---|---|
| Login (`wp-login.php`) | 4,30% | 2,29s |
| Cupons GET (`wc/v3/coupons`) | 40,15% | 4,56s |

O endpoint de login se mostrou mais resiliente à concorrência do que o endpoint de cupons, apesar de ambos rodarem na mesma infraestrutura WordPress/WooCommerce. Isso indica que o comportamento observado está associado especificamente ao processamento da API REST de cupons.
