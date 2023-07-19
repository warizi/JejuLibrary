import {parseCartListTemplate, parseWishListTemplate} from "../module/parseTemplate.js";
import {ListManager} from "../module/ListManager.js";
import {CartStorage} from "../module/localStorage.js";

const testDB = [
    {
        wishId: 1,
        bookId: 1,
        registrationCode: '12315',
        title: '한 권으로 읽는 컴퓨터 프로그래밍',
        author: 'k병준',
        imageUrl: 'url',
        createdAt: '1231231',
        locationUrl: 'url',
    },
    {
        wishId: 2,
        bookId: 2,
        registrationCode: '123124',
        title: '두 권으로 읽는 컴퓨터 프로그래밍',
        author: '김병준',
        imageUrl: 'url',
        createdAt: '123123',
        locationUrl: 'url',
    },
];

function main () {
    // cartlist
    const $cartListContainer = document.querySelector('#cart_list_container');
    const $borrowBtn = document.querySelector('.order_all');
    const cartList = new ListManager($cartListContainer, parseCartListTemplate);
    if(CartStorage.getItem()[0]) {
        cartList.initData(CartStorage.getItem());
        cartList.renderList();
        cartList.addEvent('click', clickCartDeleteBtn);
    }

    $borrowBtn.addEventListener('click', () => {
        const borrowAPIBody = { borrowRequests: [] };
        const cartListData = cartList.getData();
        cartListData.forEach((item) => {
            const borrowItem = {
                registrationCode: item.registrationCode,
                bookId: +item.bookId,
            }
            borrowAPIBody.borrowRequests.push(borrowItem);
        })
        console.log(JSON.stringify(borrowAPIBody));
        fetch('/api/book/borrow', {
            method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(borrowAPIBody)})
            .then((res) => {
                if(res.status === 201) {
                    CartStorage.setItem([]);
                    cartList.initData(CartStorage.getItem());
                    cartList.renderList();
                    alert('대출완료');
                }
            })
            .catch((err) => {
                console.error(err);
            })

    })


    // wishlist
    const wishListContainer = document.querySelector('#wish_list_container');
    const wishList = new ListManager(wishListContainer, parseWishListTemplate);
    fetch('/api/book/wish', { method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
            wishList.initData(data);
            wishList.renderList();
            wishList.addEvent('click', clickWishEventBtn);
        })
        .catch((err) => {
            console.error(err);
        })


    function clickCartDeleteBtn (e) {
        const btnText = e.target.textContent;
        if(btnText === '삭제') {
            const bookId = e.target.dataset.bookId;
            CartStorage.removeItem('bookId', bookId);
            cartList.deleteData('bookId', bookId);
            cartList.renderList();
        }
    }
    function clickWishEventBtn (e) {
        const btnText = e.target.textContent;
        const wishId = e.target.dataset.wishId;
        switch (btnText) {
            case '삭제' :
                fetch(`/api/book/wish/${wishId}`, {method : 'DELETE'})
                    .then((res) => {
                        if(res.status === 200) {
                            wishList.deleteData("wishId", wishId);
                            wishList.renderList();
                            alert('삭제하였습니다.');
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    })
                break
            case '장바구니 추가' :
                const wishItem = wishList.listData.filter((item) => +item.wishId === +wishId);
                const { title, author, imageUrl, registrationCode, bookId } = wishItem[0];
                const cartItem = {title, author, imageUrl, registrationCode, bookId};
                if(confirm('장바구니에 추가하시겠습니까?')){
                    fetch(`/api/book/wish/${wishId}`, {method : 'DELETE'})
                        .then((res) => {
                            if(res.status === 200) {
                                wishList.deleteData("wishId", wishId);
                                wishList.renderList();
                                CartStorage.addItem(cartItem);
                                cartList.initData(CartStorage.getItem());
                                cartList.renderList();
                            }
                        })
                        .catch((err) => {
                            console.error(err);
                        })
                }

                break
            default :
                break
        }
    }
}

main();
