# Mobile - Testes automatizados (Android)

Testes mobile cobrindo a funcionalidade de Catalogo de Produtos (US-0004), usando WebdriverIO + Appium (UiAutomator2).

## Status

Nao concluido. Ver docs/limitacoes-mobile.md para o relato completo da investigacao e das evidencias coletadas.

O ambiente de automacao (Android SDK, emulador, app instalado, estrutura WebdriverIO) foi configurado com sucesso, mas a funcionalidade de busca de produtos no app nao retornou resultados durante os testes manuais exploratorios, o que impediu a escrita de testes automatizados confiaveis dentro do prazo desta etapa.

## Ambiente configurado

- Emulador Android: ebac_rooted (Android 13, API 33), via Android Studio AVD Manager
- App instalado: pacote br.com.lojaebac, activity .MainActivity
- Framework: WebdriverIO + appium-uiautomator2-driver

## Estrutura

Mobile/
- package.json
- config/wdio.conf.js
- test/specs/ (ainda vazio - ver limitacoes)
- test/pageobjects/ (ainda vazio - ver limitacoes)

## Como retomar

1. Instalar dependencias: npm install
2. Subir o emulador: ~/Android/Sdk/emulator/emulator -avd ebac_rooted
3. Instalar e configurar o Appium Server com Appium Inspector para inspecao interativa de elementos (recomendado fortemente, em vez de adb shell uiautomator dump manual)
4. Investigar a causa raiz da busca de produtos nao retornar resultados (ver hipoteses em docs/limitacoes-mobile.md)
5. Escrever os Page Objects e specs de teste com os seletores ja parcialmente identificados:
   - Campo de busca: resource-id="searchInput"
   - Botao de busca/limpar: icone ao lado do campo (iconIcon)
   - Filtros: resource-id="SortBy", resource-id="Category"
   - Navegacao: resource-id="tab-home", tab-Search, tab-order, tab-profile
   - Login: resource-id="email", password, btnLogin
