Como o TypeScript é o encarregado de transpilar nossos aplicativos angulares,
nos certificaremos de configurar nossos caminhos no tsconfig.json.

No tsconfig.json, faremos duas coisas usando duas das opções do compilador :
  .baseUrl: Definir a pasta base como /src
  .paths: Diz ao TypeScript para procurar @app na pasta /src/app

baseUrl: será o diretório base usado para resolver nomes de módulo não relativos.
paths: é uma matriz de entradas de mapeamento para nomes de módulos para locais relativos ao baseUrl.

Com isso em nosso tsconfig.json, agora podemos referenciar itens absolutamente!

Isso é ótimo porque agora podemos mover nossos arquivos e não ter que se preocupar
com a atualização de caminhos em todos os lugares.


Reference:
https://scotch.io/tutorials/reference-angular-imports-absolutely-for-easier-development#toc-setting-up-absolute-paths
