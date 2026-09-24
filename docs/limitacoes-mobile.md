# Limitacoes encontradas na automacao Mobile (US-0004)

## Contexto

Durante a tentativa de automatizar o Catalogo de Produtos no aplicativo Android da EBAC Shop (pacote br.com.lojaebac), identificou-se um bloqueio que impediu a conclusao dos testes automatizados dentro do prazo da sessao de trabalho.

## Ambiente utilizado

- Emulador: Android Studio AVD ebac_rooted (Android 13, API 33)
- App instalado a partir de ebacshop/android/output-apks/universal.apk
- Framework de teste planejado: WebdriverIO + Appium (UiAutomator2)
- Ferramenta de inspecao: adb shell uiautomator dump (inspecao manual via terminal, sem Appium Inspector grafico)

## Problema identificado

A funcionalidade de busca de produtos (tela "Browse") nao retorna resultados para nenhum termo testado ("Aero", "s", "a"), sempre exibindo a mensagem "No products found", mesmo para termos que retornam centenas de resultados na versao web da mesma loja.

## Passos de investigacao realizados

1. Confirmacao de conectividade do emulador: ping 8.8.8.8 respondeu normalmente (0% de perda), descartando problema de rede no nivel do dispositivo.
2. Inspecao do logcat filtrando por erros, excecoes, timeouts e chamadas de rede: nenhuma evidencia de erro de rede ou requisicao HTTP relacionada a busca foi encontrada.
3. Verificacao de cleartext/Network Security Config: o app declara uma configuracao de seguranca de rede customizada, o que descarta bloqueio padrao de trafego HTTP nao criptografado.
4. Extracao e analise estatica do APK (base.apk, extraido via adb pull do dispositivo): identificado que o app e construido em React Native, com a logica de negocio compilada em assets/index.android.bundle.
5. Busca por URLs no bundle JavaScript: confirmou-se que o app aponta para o dominio correto, http://lojaebac.ebaconline.art.br/, mas o caminho especifico do endpoint de busca nao pode ser identificado via analise estatica (provavelmente construido dinamicamente em tempo de execucao, nao como string fixa no bundle).
6. Tentativa de login no app para testar se a busca depende de autenticacao: o formulario de login foi localizado e preenchido via adb shell input, mas o teclado virtual do Android alterou o layout da tela durante a digitacao, fazendo com que os toques por coordenada fixa nao acertassem os campos corretos de forma consistente - limitacao inerente a automacao por coordenadas (sem uso de seletores), que reforca a necessidade do Appium (nao configurado a tempo) para esse tipo de interacao.

## Causa raiz nao confirmada

Nao foi possivel confirmar com certeza se o problema e:
- Um defeito real do app (endpoint de busca quebrado ou apontando para ambiente incorreto);
- Uma dependencia de autenticacao nao documentada na US-0004;
- Uma limitacao do ambiente de teste (emulador/dados de teste) nao relacionada ao app em producao.

## Status da automacao Mobile

Nao foi possivel concluir a automacao end-to-end da busca de produtos dentro do prazo desta etapa. Ambiente de automacao (WebdriverIO + Appium) documentado e parcialmente configurado em Mobile/, pronto para retomada em uma sessao futura com Appium Inspector para identificacao precisa de seletores e depuracao da causa raiz da busca sem resultados.

## Recomendacao

Para dar continuidade a este ponto:
1. Configurar o Appium Server e o Appium Inspector graficamente, o que permite inspecionar elementos e testar seletores de forma interativa, sem a fragilidade de comandos adb shell input tap por coordenada.
2. Validar com o time de desenvolvimento se a busca de produtos no app mobile realmente aponta para o mesmo backend da versao web, ou se ha um ambiente/mock diferente configurado no build do APK utilizado.
