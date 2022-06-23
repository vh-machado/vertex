export class PilhaImpl{
    vertices = [];
    tamanho = this.vertices.length

    empilhar(elemento){
        this.vertices.push(elemento)
    }

    desempilhar(estaVazio){
        if(estaVazio){
            return null;
        }
        return this.vertices.splice(this.tamanho-1)
    }

    elementoTopo(){
        return this.vertices.slice(-1)[0]
    }

    criar(items){
        pilha = []
        items.array.forEach(element => {
            pilha.empilhar(element)
        });
        return pilha
    }

    toString(){
        print("----top----")
        this.vertices.reverse.forEach(element=>{
            print(element)
        })
        print("-----------")   
        }

    pilhaPartir(elementos){
        return PilhaImpl.criar(elementos)
    }    
    }


