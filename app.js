let cart = document.querySelector('.cart');
let iconCart = document.querySelector('.iconCart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');
let itemd  = document.querySelector('.item')

iconCart.addEventListener('click', () => {
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }else {
        cart.style.right = '-100%'
        container.style.transform = 'translateX(0)';
    }
})
close.addEventListener('click', () => {
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)'
})
/////////////////////////////////////////////



let products = null;
//получаем json данные
fetch('product.json')
.then(response => response.json())
.then(data => {
    products = data;
    addDataToHTML();
})

function addDataToHTML(){
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    //создаем новые данные
    if(products != null){
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML =
            `<img src="${product.image}">
            <h2>${product.name}</h2>
            <div class="price">${product.price}</div>
            <button onclick="addCart(${product.id})">Add to cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
}

let listCart =[];
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart.JSON.parse(cookieValue.split('=')[1]);

    }
}
function addCart($idProduct){
    let productCopy = JSON.parse(JSON.stringify(products));
    if(!listCart[$idProduct]){
        let dataProduct = productCopy.filter(
            product => product.id == $idProduct
        )[0];
        listCart[$idProduct] = dataProduct;
        listCart[$idProduct].quantity = 1;
    }else{
        listCart[$idProduct].quantity++;
    }
    //сохраняем в куки
    let timeSave = "expires-Thu, 31 Dec 2025 23:59:59 UTC";
    document.cookie = "listCart"+JSON.stringify(listCart)+"; "+timeSave +"; path=/;";
    addCartToHTML();
}

addCartToHTML();
function addCartToHTML(){
    //clear data defolt
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHtml =document.querySelector('.totalQuantity');
    let totalQuantity = 0;


    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                `<img src="${product.image}">
            <div class="content">
                <div class="name">${product.name}</div>
                <div class="price">$${product.price}</div>
            </div>
            <div class="quantity">
                <button onclick="changeQuantity(${product.id}, '-')">-</button>
                <span class="value">${product.quantity}</span>
                <button onclick="changeQuantity(${product.id}, '+')">+</button>
            </div>`;
            listCartHTML.appendChild(newCart);
            totalQuantity = totalQuantity + product.quantity;

            }
        })
    }
    totalHtml.innerText = totalQuantity;
}

function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            console.log('удалено');
            if(listCart[$idProduct].quantity <= 0){
 
                delete listCart[$idProduct];
            }
            break;

        default:
            break;
    }
    //save new data in cookie
    let timeSave = "expires-Thu, 31 Dec 2025 23:59:59 UTC";
    document.cookie = "listCart"+JSON.stringify(listCart)+"; "+timeSave +"; path=/;";

    //reload list cart in HTML
    addCartToHTML();
}
