let usuarios = [], totalCompraroupa, qtdRP, usuRegistrado

// Função para cadastrar um novo usuário
    function cadastrarUsuario() {
        let nome = document.getElementById('nome').value
        let senha = document.getElementById('senha').value
        if (nome != '' & senha.length > 7){

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

    if (nome != '' & senha.length > 7){
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


if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready()
}

var totalAmount = "0,00"

function ready(){
    const removeProductButtons = document.getElementsByClassName("remove-product-button")
    for(var i = 0; i < removeProductButtons.length; i++){
        removeProductButtons[i].addEventListener("click", removeProduct)
    }
    const quantityInputs = document.getElementsByClassName("product-qtd-input")
    for(var i = 0; i < quantityInputs.length; i++){
        quantityInputs[i].addEventListener("change", updateTotal)
    }
    const addToCartButtons = document.getElementsByClassName("botaodecompra")
    for(var i = 0; i < addToCartButtons.length; i++){
        addToCartButtons[i].addEventListener("click", addProductToCart)
    }

    const purchaseButton = document.getElementsByClassName("purchase-button")
    purchaseButton.addEventListener("click", makePurchase)
}

function makePurchase(){
    if(totalAmount == "0,00"){
        alert("Seu carrinho está vazio!")
    }else{
        alert(
            `
            Obrigado pela sua compra!
            Valor do pedido: ${totalAmount}
            Volte sempre :)
            `
        )
    }
    document.querySelector(".cart-table tbody").innerHTML = ""
    updateTotal()
}



function checkIfInputIsNull(event){
    if(event.target.value == "0"){
        event.target.parentElement.parentElement.remove()
    }
    updateTotal()
}

function addProductToCart(event){
    const button = event.target
    const productInfos = button.parentElement
    const productImage = productInfos.getElementsByClassName("product-imagee")[0].src
    const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText
    const productsCartName = document.getElementsByClassName("cart-product-title")
    for(var i = 0; i < productsCartName.length; i++){
        if(productsCartName[i].innerText == productTitle){
            productsCartName[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
            return
        }
    }
    
    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")

    newCartProduct.innerHTML = 
    `
        <td class="product-identification">
            <img class="cart-product-image" src="${productImage}" alt="${productTitle}">
            <strong class="cart-product-title">${productTitle}</strong>
          </td>
          <td>
            <span class="cart-product-price">${productPrice}</span>
          </td>
          <td>
            <input class="product-qtd-input" type="number" value="1" min="0" max="10">
            <button class="remove-product-button" type="button">Remover</button>
          </td>
    `

    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCartProduct)
    updateTotal()
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
    newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)
}

function removeProduct(event){
    event.target.parentElement.parentElement.remove()
    updateTotal()
}

function updateTotal(){
    totalAmount = 0
const cartProducts = document.getElementsByClassName("cart-product")
for(var i = 0; i < cartProducts.length; i++){
    const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".")
    const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value

    totalAmount += productPrice * productQuantity
}
totalAmount = totalAmount.toFixed(2)
totalAmount = totalAmount.replace(".", ",")
document.querySelector(".cart-total-container span").innerText ="R$" + totalAmount
}
