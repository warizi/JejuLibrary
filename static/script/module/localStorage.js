export class CartStorage {

    static getItem() {
        checkCart();
        return JSON.parse(window.localStorage.getItem('cart'));
    }
    static setItem(array) {
        window.localStorage.setItem('cart', JSON.stringify(array));
    }
    static addItem(item) {
        checkCart();
        const cartList = JSON.parse(window.localStorage.getItem('cart'));
        if(!checkDuplicateItems(cartList, item)){
            cartList.push(item);
            window.localStorage.setItem('cart', JSON.stringify(cartList));
        }
    }
    static removeItem(key, value) {
        const oldList = JSON.parse(window.localStorage.getItem('cart'));

        const updatedList = oldList.filter((item) => +item[key] !== +value);

        window.localStorage.setItem('cart', JSON.stringify(updatedList));
    }
}

function checkCart () {
    if(!window.localStorage.getItem('cart')) {
        window.localStorage.setItem('cart', JSON.stringify([]));
    }
}

function checkDuplicateItems (list, item) {
    let isDuplicated = false;
    list.forEach((testItem) => {
        if(testItem.registrationCode === item.registrationCode) {
            isDuplicated = true;
        }
    })
    return isDuplicated
}
