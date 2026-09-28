# Limitações encontradas na automação Mobile (US-0004)

## Contexto

Durante a tentativa de automatizar o Catálogo de Produtos no aplicativo Android da EBAC Shop (pacote `br.com.lojaebac`), identificou-se um bloqueio que impediu a conclusão dos testes automatizados dentro do prazo da sessão de trabalho.

## Ambiente utilizado

- Emulador: Android Studio AVD `ebac_rooted` (Android 13, API 33)
- App instalado a partir de `ebacshop/android/output-apks/universal.apk`
- Framework de teste planejado: WebdriverIO + Appium (UiAutomator2)
- Ferramenta de inspeção: `adb shell uiautomator dump` (inspeção manual via terminal, sem Appium Inspector gráfico)

## Problema identificado

A funcionalidade de busca de produtos (tela "Browse") não retorna resultados para nenhum termo testado (`"Aero"`, `"s"`, `"a"`), sempre exibindo a mensagem `"No products found"`, mesmo para termos que retornam centenas de resultados na versão web da mesma loja.

![Busca de produtos sem resultado no app mobile](evidencias/mobile-busca-sem-resultado.png)

## Passos de investigação realizados

1. **Confirmação de conectividade do emulador**: `ping 8.8.8.8` respondeu normalmente (0% de perda), descartando problema de rede no nível do dispositivo.
2. **Inspeção do `logcat`** filtrando por erros, exceções, timeouts e chamadas de rede: nenhuma evidência de erro de rede ou requisição HTTP relacionada à busca foi encontrada.
3. **Verificação de cleartext/Network Security Config**: o app declara uma configuração de segurança de rede customizada (`Using Network Security Config from resource network_security_config`), o que descarta bloqueio padrão de tráfego HTTP não criptografado.
4. **Extração e análise estática do APK** (`base.apk`, extraído via `adb pull` do dispositivo): identificado que o app é construído em **React Native**, com a lógica de negócio compilada em `assets/index.android.bundle`.
5. **Busca por URLs no bundle JavaScript**: confirmou-se que o app aponta para o domínio correto, `http://lojaebac.ebaconline.art.br/`, mas o caminho específico do endpoint de busca não pôde ser identificado via análise estática (provavelmente construído dinamicamente em tempo de execução, não como string fixa no bundle).
6. **Tentativa de login no app** para testar se a busca depende de autenticação: o formulário de login foi localizado e preenchido via `adb shell input`, mas o teclado virtual do Android alterou o layout da tela durante a digitação, fazendo com que os toques por coordenada fixa não acertassem os campos corretos de forma consistente - limitação inerente à automação por coordenadas (sem uso de seletores), que reforça a necessidade do Appium (não configurado a tempo) para esse tipo de interação.

## Causa raiz não confirmada

Não foi possível confirmar com certeza se o problema é:
- Um defeito real do app (endpoint de busca quebrado ou apontando para ambiente incorreto);
- Uma dependência de autenticação não documentada na US-0004;
- Uma limitação do ambiente de teste (emulador/dados de teste) não relacionada ao app em produção.

## Status da automação Mobile

Não foi possível concluir a automação end-to-end da busca de produtos dentro do prazo desta etapa. Ambiente de automação (WebdriverIO + Appium) documentado e parcialmente configurado em `Mobile/`, pronto para retomada em uma sessão futura com Appium Inspector para identificação precisa de seletores e depuração da causa raiz da busca sem resultados.

## Recomendação

Para dar continuidade a este ponto:
1. Configurar o Appium Server e o Appium Inspector graficamente, o que permite inspecionar elementos e testar seletores de forma interativa, sem a fragilidade de comandos `adb shell input tap` por coordenada.
2. Validar com o time de desenvolvimento se a busca de produtos no app mobile realmente aponta para o mesmo backend da versão web, ou se há um ambiente/mock diferente configurado no build do APK utilizado.
