/*
* Um arquivo de tipografia personalizado é usado para declarar tipos que são
* criados fora de seu aplicativo angular, portanto, o compilador de TypeScript
* está ciente deles e não fornece erros sobre tipos desconhecidos. Este arquivo
* de tipografia contém uma declaração para o configobjeto global que é criado
* pelo webpack
*/

declare var config: any; // então o compilador typescript não reclama sobre o objeto de configuração global
