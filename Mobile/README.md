# Mobile — Testes automatizados (a implementar)

Testes mobile cobrindo apenas a funcionalidade de **Catálogo de Produtos** (US-0004), usando **WebdriverIO + Appium**.

## Escopo

Conforme o enunciado do TCC, a automação mobile considera apenas os apps disponíveis em:
- Android: https://github.com/EBAC-QE/testes-mobile-ebac-shop/tree/main/app/android
- iOS: https://github.com/EBAC-QE/testes-mobile-ebac-shop/tree/ios-tests/app/ios

Este projeto implementará os testes para **Android**.

## Pré-requisitos (a configurar antes da implementação)

- Android Studio + SDK instalado
- Emulador Android configurado (ou dispositivo físico com depuração USB habilitada)
- Appium Server instalado (`npm install -g appium`)
- Driver UiAutomator2 do Appium (`appium driver install uiautomator2`)
- Java JDK instalado (requisito do Android SDK)

## Estrutura planejada

```
Mobile/
├── tests/       # Specs de teste
├── pages/       # Page Objects (Testing Pattern)
├── wdio.conf.js # Configuração do WebdriverIO (a criar)
└── package.json # A criar
```

## Status

Estrutura de pastas criada. Implementação dos testes e configuração do ambiente Appium serão feitas na etapa de automação mobile (item 4.5.3 do trabalho).
