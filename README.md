# ViaLivre, um aplicativo parar livrar seu caminho
A ideia do aplicativo e garantir o acesso e o direito de ir e vir à todos independente da dificulade. O aplicativo conta com mapas em que os próprios usuários, incentivados a cultivar um senso de comunidade, contribui para a notificação de passagens perigosas principalmente para pessoas com necessidades específicas.

## Como rodar:
- Software necessário: É preciso que você utilize Android Studio para rodar o aplicativo, pois há bibliotecas e dependências que não funcionam pelo ExpoGO.
- Keys: Para utilizar o projeto, é necessário chaves específicas. Garanta que a key do Supabase, Google Maps e Google OAuth 2.0 estão em seus devidos lugares. As keys do Maps devem ir no App.json antes de criar a pasta android, pois é necessário que a pasta gerada, em seu `AndroidManifest.xml`, haja a key dentro de um `<meta-data>`. Dentro de `src` existe o arquivo `config.ts`, as keys para OAuth e Supabase devem estar lá
- Comandos:
    Após baixar ou clonar o aplicativo, rode
  
    ```bash
    npm install
    ```
    e depois
    ```bash
    npx expo run:android
    ```
  para instalar as pastas `node_modules` e `android`.
  _disclaimer.: pode ser necessário outros comandos, sofremos na mão do Android Studio, boa sorte professor_ 

## Desenvolvedores:
- Estêvão Viana Cunha
- Gabriel Martins Chinelli Maia
- Mateus Tamaki Yoshisaki
- Patrick Nunes Pires Melo De Souza
- Pedro Pinto Martins de Souza
- Yuri dos Santos Martins
