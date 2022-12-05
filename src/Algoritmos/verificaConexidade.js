import componentesFortes from './componentesFortes';
import criaMatrizCaminho from './criaMatrizCaminho';

export function verificaConexidade(listaVertices, listaArestas) {

  // Função para encontrar a característica do gráfico dado
  function verificaConectado(graph, n) {
    //Verifica se o grafo eh fortemente conectado
    let fortementeConectado = true;

    // Percorre a matriz
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        //Se os elementos nao forem iguais, entao o grafo nao eh fortemente
        //conectado
        if (graph[i][j] != graph[j][i]) {
          fortementeConectado = false;
          break;
        }
      }

      // Para o loop se ele nao for fortemente conectado
      if (!fortementeConectado) {
        break;
      }
    }

    //Se o grafo for fortemente conectado
    // entao eh retornado "Fortemente conectado"
    if (fortementeConectado) {
      console.log('Fortemente Conexo');
      return 'Fortemente Conexo';
    }

    //Verifique se o gráfico está conectado unilateralmente 
    //verificando o elemento do triângulo superior
    let trianguloSuperior = true;

    // Percorre a matriz
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
       // Se os elementos do triângulo superior forem 0, 
       //o loop para e verifica-se os elementos
       // da matriz do triângulo inferior
        if (i > j && graph[i][j] == 0) {
          trianguloSuperior = false;
          break;
        }
      }

      // Para o loop se ele nao for unilateralmente conectado
      if (!trianguloSuperior) {
        break;
      }
    }

    //Se o grafo for fortemente conectado
    // entao eh retornado "Unilateralmente conectado"
    if (trianguloSuperior) {
      console.log('Unilateralmente Conexo');
      return 'Unilateralmente Conexo';
    }

    // Verifica os elementos do triangulo inferior
    let trianguloInferior = true;

    // Percorre a matriz
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        //Se os elementos triangulo inferior forem 0, então o laço para
        // Espera-se que os elementos da matriz inferior
        //sejam 1
        if (i < j && graph[i][j] == 0) {
          trianguloInferior = false;
          break;
        }
      }

      //  Para o loop se ele nao for unilateralmente conectado
      if (!trianguloInferior) {
        break;
      }
    }

    //Se o grafo for fortemente conectado
    // entao eh retornado "Unilateralmente conectado"
    if (trianguloInferior) {
      
      console.log('Unilateralmente Conexo');
      return 'Unilateralmente Conexo';
    }

    //Se as condições anteriores nao forem atendidas
    // retorne "Fracamente conectado"
    else {
     // console.log('Fracamente Conexo');
    }
    console.log('Fracamente Conexo');
    return 'Fracamente Conexo';
  }

 

  // Número de nós
  let n = listaVertices.length;

  // Matriz de caminho
  
  var graph = criaMatrizCaminho(listaVertices, listaArestas);

  // Chamada da função
  return verificaConectado(graph, n);
}
