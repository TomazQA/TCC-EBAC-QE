# Mobile — Testes automatizados (Android)

Testes mobile cobrindo a funcionalidade de **Catálogo de Produtos** (US-0004), usando **WebdriverIO + Appium** (UiAutomator2).

## Status

⚠️ **Não concluído.** Ver `docs/limitacoes-mobile.md` para o relato completo da investigação e das evidências coletadas.

O ambiente de automação (Android SDK, emulador, app instalado, estrutura WebdriverIO) foi configurado com sucesso, mas a funcionalidade de busca de produtos no app não retornou resultados durante os testes manuais exploratórios, o que impediu a escrita de testes automatizados confiáveis dentro do prazo desta etapa.

## Ambiente configurado

- Emulador Android: `ebac_rooted` (Android 13, API 33), via Android Studio AVD Manager
- App instalado: pacote `br.com.lojaebac`, activity `.MainActivity`
- Framework: WebdriverIO + `appium-uiautomator2-driver`

## Estrutura

```
Mobile/
├── package.json
├── config/
│   └── wdio.conf.js
└── test/
    ├── specs/        (ainda vazio - ver limitações)
    └── pageobjects/   (ainda vazio - ver limitações)
```

## Como retomar

1. Instalar dependências: `npm install`
2. Subir o emulador: `~/Android/Sdk/emulator/emulator -avd ebac_rooted`
3. Instalar e configurar o Appium Server com Appium Inspector para inspeção interativa de elementos (recomendado fortemente, em vez de `adb shell uiautomator dump` manual)
4. Investigar a causa raiz da busca de produtos não retornar resultados (ver hipóteses em `docs/limitacoes-mobile.md`)
5. Escrever os Page Objects e specs de teste com os seletores já parcialmente identificados:
   - Campo de busca: `resource-id="searchInput"`
   - Botão de busca/limpar: ícone ao lado do campo (`iconIcon`)
   - Filtros: `resource-id="SortBy"`, `resource-id="Category"`
   - Navegação: `resource-id="tab-home"`, `tab-Search`, `tab-order`, `tab-profile`
   - Login: `resource-id="email"`, `password`, `btnLogin`
