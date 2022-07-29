const formulario = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

//cria lista inicial da pagina.
itens.forEach( (item) => {
    criaElementoLista(item);
});

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const novoItem = {
        "nome":event.target.elements.nome.value,
        "quantidade":event.target.elements.quantidade.value 
    }

    const existe = itens.find(item => item.nome === novoItem.nome);

    if(existe){
        atualizaElemento(novoItem);
        atualizaItemLocalStorage(novoItem);
    }
    else{
        criaElementoLista(novoItem);
        itens.push(novoItem);
    }

    armazenaNovoItemLocalStorage();
    formulario.reset();
});

function atualizaItemLocalStorage(novoItem){
    itens.find((elemento) => {
        if(elemento.nome === novoItem.nome){
            elemento.quantidade = novoItem.quantidade;
        }
    });
}

function armazenaNovoItemLocalStorage(){
    //armazenando no localStorage.
    localStorage.setItem("itens", JSON.stringify(itens));    
}


function criaElementoLista(elemento){
    const item = document.createElement('li');
    item.classList.add('item');
    
    const strong = document.createElement('strong');
    strong.innerHTML = elemento.quantidade;
    strong.dataset.nome = elemento.nome;
    
    item.appendChild(strong);
    item.innerHTML += elemento.nome;

    item.appendChild(botaoDeleta(elemento.nome));

    lista.appendChild(item);
}

function atualizaElemento(elemento){
    document.querySelector(`[data-nome=${elemento.nome}]`).innerHTML = elemento.quantidade;
}

function botaoDeleta(nome){
    const botao = document.createElement("button");
    botao.innerText = "X";

    botao.addEventListener("click", function(){
        deletaElemento(nome);
    })

    return botao;
}

function deletaElemento(nome){
    document.querySelector(`[data-nome=${nome}]`).parentNode.remove();
    
    itens.splice(itens.findIndex(item => item.nome === nome), 1);
    armazenaNovoItemLocalStorage();
}
