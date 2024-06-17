let usuarios = [], totalCompraroupa, qtdRP, usuRegistrado

// Função para cadastrar um novo usuário
    function cadastrarUsuario() {
        let nome = document.getElementById('nome').value
        let senha = document.getElementById('senha').value
        if (nome != '' & senha.lenght > 7){

        usuRegistrado = JSON.parse(localStorage.getItem("usuarios")) || {} // Verificar se já existe algum dado armazenado para evitar sobrescrever


            usuRegistrado[nome] = { // Adicionar o novo usuário
                nome: nome,
                senha: senha,
            };
            localStorage.setItem("usuarios", JSON.stringify(usuRegistrado))
        alert("Usuário cadastrado com sucesso!")
        window.location.href = "loginsitedecompra.html" // Redirecionar para a página de login
    }else{
        alert(`Preencha todos os requisítos.\nA senha deve conter no mínimo 8 digitos`)
      return false; // Impede o envio do formulário
    }
    }
function login() {
    let nome = document.getElementById('nome').value
    let senha = document.getElementById('senha').value

    // Obter os dados do usuário do Local Storage
    usuRegistrado = JSON.parse(localStorage.getItem("usuarios")) || {}

    if (nome != '' & senha.lenght > 7){
        // Verificar se os dados do usuário coincidem
        if (usuRegistrado.hasOwnProperty(nome)) {

            if (usuRegistrado[nome].senha === senha) {
                alert(`Login bem-sucedido! Bem-vindo, ${nome} !`)
                localStorage.setItem("usuarioLogado", nome)
                window.location = "Lojadeinicio2.html"
            } else {
                alert("Nome de usuário ou senha incorretos. Por favor, tente novamente.")
            }
        } else {
            alert(`o nome: ${nome} não esta cadastrado.`)
        }
    }else{
        alert(`Preencha todos os requisítos.\nA senha deve conter no mínimo 8 digitos`)
        }
}

function bemVindo() {
    let nome = localStorage.getItem("usuarioLogado") // Obtém o nome do usuário logado do Local Storage
    document.getElementById("nome").textContent = nome // Atualiza o conteúdo do elemento com o nome do usuário
}

// Chamada à função bemVindo() quando o documento é carregado
document.addEventListener('DOMContentLoaded', bemVindo)

function carrinho(){
    let totalCompraRoupaF = ""
    qtdRP = parseInt(document.getElementById("pdt").value)
    totalCompraroupa = qtdRP * parseFloat(document.getElementById("rp").innerText.replace(',' , '.'))
    let nomeProduto = document.getElementById("np").innerText
    totalCompraRoupaF = totalCompraroupa.toFixed(2)
    document.getElementById("roupa").innerHTML = `${qtdRP} x ${nomeProduto} = R$${totalCompraRoupaF}`
}


function compraRoupa(){ 
    qtdRP = parseInt(document.getElementById("pdt").value)
    totalCompraroupa = qtdRP * parseFloat(document.getElementById("rp").innerText.replace(',' , '.'))
}

function abreCarrinho(){
    let carrinhoTela
    carrinhoTela = document.createElement("button")
    carrinhoTela.setAttribute("id", "tCarrinho")
    carrinhoTela.append(document.createTextNode("Teste"))
    document.header.append(carrinhoTela)
}