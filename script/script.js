
//формируется обьект верстки document Нам нужно дождаться, пока он загрузится 
// и отловить это событие с помощью DOMContentLoaded
// после этого навешиваем обработчик события addEventListener
document.addEventListener('DOMContentLoaded',function(){ 
// в html есть форма с классом search обращаемся к нему по селектору (находим первый элемент на странице, у которого такой класс)
// если нужны все такие элементы пишем document.querySelectorAll('.search'); но получим колекцию (массив)
    const search = document.querySelector('.search');
//теперь получим элементы по id
// то же самое можно прописать через document.querySelector('#cart');
    const cartBtn = document.getElementById('cart');
    const wishlistBtn = document.getElementById('wishlist');
// получаем карточки товаров 
    const goodsWrapper = document.querySelector('.goods-wrapper');
// получаем элемент корзину из html 
    const cart = document.querySelector('.cart');

    //========================================================================================




    
// для того, чтобы функция работала именно в нужном месте, а не висела в ожидании раньше обьявляем ее через const
// ниже можно вызывать, выше - нет
// function() то же самое () =>
// прописываем аргументы, которые наша функция будет принимать id, title, price, img
const createCardGoods = (id, title, price, img) => {
    // создаем элемент в html
    const card = document.createElement('div');
    // добавим нашей карточке классы через свойство className
    card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
    // заливаем всю верстку в этот созданный div и добавляем в html
    // где угодно через ${} можем вставить переменную или код 
    //innerHTML - вставляет в html
    card.innerHTML = `<div class="card">
                        <div class="card-img-wrapper">
                            <img class="card-img-top" src="img/temp/${img}" alt="">
                            <button class="card-add-wishlist" 
                                data-goods-id="${id}"></button>
                        </div>
                        <div class="card-body justify-content-between">
                            <a href="#" class="card-title" ${title}>Имя товара</a>
                            <div class="card-price"${price}>${555}₽</div>
                            <div>
                                <button class="card-add-cart
                                    data-goods-id="${id}">Добавить в корзину</button>
                            </div>
                        </div>
                    </div>`;
									
 // эту верстку наша функция должна возвращать (вызываем функцию, чтобы создать карточку)
 return card;
    
};

// обращаемся к созданной ранее обертке goodWrapper и через метод appendChild 
// вставляем дочерний элемент - карточку createCardGoods()
goodsWrapper.appendChild(createCardGoods(1, 'Darts', 2000, 'Archer.jpg'));
// вставляем столько карточек, сколько нам нужно 
goodsWrapper.appendChild(createCardGoods(2, 'Фламинго', 3000, 'Flamingo.jpg'));
goodsWrapper.appendChild(createCardGoods(3, 'Носки', 333, 'Socks.jpg'));
goodsWrapper.appendChild(createCardGoods(1, 'Darts', 2000, 'Archer.jpg'));
goodsWrapper.appendChild(createCardGoods(3, 'Носки', 333, 'Socks.jpg'));
goodsWrapper.appendChild(createCardGoods(2, 'Фламинго', 3000, 'Flamingo.jpg'));

// напишем функцию, которая закрывает корзину
const closeCart = (event) => {
    // наша корзина cart-body находится внутри cart потому закрывается и при клике просто на козину
    // чтобы это изменить (target - это событие в консоли, получаем через console.log. 
    // куда кликнули мышкой) используем if (если кликнули равно поле cart то закрыть ИЛИ если кликнули на крестик )
    // contains проверяет есть ли такой класс у элемента и возвращает TRUE или FALSE
    const target = event.target;
    if (target === cart ||
        target.classList.contains('cart-close') ||
        // отслеживаем нажатие на клавишу ESC 
        event.keyCode === 27) {
            cart.style.display = '';
            // удаляем отслеживание события нажатия на клавишу после закрытия корзины
            cart.removeEventListener('click', closeCart);
    } 
    
};

// напишем функцию, которая будет открывать корзину
const openCart = (event) => {
    // запрещаем стандартное поведение браузера по клике на ссылку (при клике на корзину)
    event.preventDefault();
    // модальное окно корзины в css прописано как display: none  Меняем это
    cart.style.display = 'flex';
    // закрывать корзину при нажатии на кнопку ESC
    document.addEventListener('keyup', closeCart);
};
// это наша кнопка-корзина. Через addEventListener навешиваем событие при клике - открыть
cartBtn.addEventListener('click', openCart);
// закрыть корзину, кликнув на сером фоне позади (cart) 
cart.addEventListener('click', closeCart);












});