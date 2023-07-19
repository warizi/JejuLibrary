export function parseWishListTemplate (data) {
    const { wishId, bookId, registrationCode, title, author, imageUrl, createdAt, locationUrl } = data;

    const $container = document.createElement('li');
    $container.classList.add('wish_list');

    const $bookImage = document.createElement('img')
    $bookImage.src = imageUrl;
    $bookImage.setAttribute('alt', '책 표지');
    $bookImage.classList.add('book_cover_image');

    const $bookTitle = document.createElement('span');
    $bookTitle.classList.add('book_title');
    $bookTitle.textContent = title;

    const $addCartBtn = document.createElement('button');
    $addCartBtn.classList.add('add_cart');
    $addCartBtn.dataset.wishId = wishId;
    $addCartBtn.textContent = '장바구니 추가';

    const $deleteBtn = document.createElement('button');
    $deleteBtn.classList.add('delete_btn');
    $deleteBtn.dataset.wishId = wishId;
    $deleteBtn.textContent = '삭제';

    $container.appendChild($bookImage);
    $container.appendChild($bookTitle)
    $container.appendChild($addCartBtn)
    $container.appendChild($deleteBtn);

    return {
        template: $container,
        ...data,
    }
}
export function parseCartListTemplate (data) {
    const { title, author, imageUrl, registrationCode, bookId } = data;

    const $container = document.createElement('li');
    $container.classList.add('cart_list');

    const $bookCover = document.createElement('img');
    $bookCover.src = imageUrl;
    $bookCover.setAttribute('alt', '책 표지');
    $bookCover.classList.add('book_cover_image');
    console.log($bookCover);

    const $bookTitle = document.createElement('span');
    $bookTitle.classList.add('book_title');
    $bookTitle.textContent = title;
    console.log($bookTitle);

    const $bookAuthor = document.createElement('span');
    $bookAuthor.classList.add('book_author');
    $bookAuthor.textContent = author;

    const $deleteBtn = document.createElement('button');
    $deleteBtn.classList.add('delete_btn');
    $deleteBtn.dataset.bookId = bookId;
    $deleteBtn.textContent = '삭제';

    $container.appendChild($bookCover);
    $container.appendChild($bookTitle);
    $container.appendChild($bookAuthor);
    $container.appendChild($deleteBtn);

    return {
        template: $container,
        ...data,
    }
}
