export const tabs = () => {
    // console.log("タブメニューJS読み込み");

    const tabsWrapElm = document.querySelectorAll('.tabs-wrap');
    tabsWrapElm.forEach(wrap => {
        const menuItemsElm = wrap.querySelectorAll('.tab-menu li button');
        const bodyItmElm = wrap.querySelectorAll('.tabs-body');

        menuItemsElm.forEach(checkedItem => {
            checkedItem.addEventListener('click', () => {

                // is-activeの初期化処理.
                menuItemsElm.forEach(item => {
                    item.classList.remove('is-active');
                });
                checkedItem.classList.add('is-active');

                // bodyの処理.
                bodyItmElm.forEach(body => {
                    body.classList.remove('is-active');
                });

                // getElementByIdはdoc専用のため書き換え必須.
                // wrap.getElementById(checkedItem.dataset.tab).classList.add('is-active');
                wrap.querySelector(`#${checkedItem.dataset.tab}`).classList.add('is-active');

            });
        });
    });
}
