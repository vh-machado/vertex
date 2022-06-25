export class FilaPilha{
    pilhaEsquerda = [];
    pilhaDireita = [];
    enfileirar(elemento){
        this.pilhaDireita.push(elemento)
        return true;
    }
    desenfileirar(){
        if(this.pilhaDireita.length === 0){
            return null;
        }
        if(this.pilhaEsquerda.length === 0){
            this.pilhaEsquerda = this.pilhaDireita.reverse
            this.pilhaDireita = []
        }
        return this.pilhaEsquerda.splice(this.pilhaEsquerda.length-1)
    }
    count = this.pilhaEsquerda.length + this.pilhaDireita.length
    recuperarElementoFrente(){
      if(!this.pilhaEsquerda.length===0){
        return this.pilhaEsquerda.slice(-1)[0]
      }else{
        this.pilhaDireita.slice(0,1)[0]
      }
    }
}