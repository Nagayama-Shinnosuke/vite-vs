export const accordion = () => {
    // 表示する関数.
    const slideDown = (el) => {
        el.style.height = 'auto';
        let h = el.offsetHeight;
        el.animate({
            height: [0, h + 'px']
        }, {
            // アニメーションの時間の設定.
            duration: 300,
        });
        el.style.height = 'auto';
        el.setAttribute('aria-hidden', 'false');
    };

    // 非表示にする関数.
    const slideUp = (el) => {
        let h = el.offsetHeight;
        el.style.height = h + 'px';
        el.animate({
            height: [h + 'px', 0]
        }, {
            duration: 300,
        });
        el.style.height = 0;
        el.setAttribute('aria-hidden', 'true');
    };

    // 開いているアコーディオンのnull.
    let activeIndex = null;
    const accordions = document.querySelectorAll('.include-accordion');
    accordions.forEach((accordion) => {
        const accordionBtns = accordion.querySelectorAll('.accordionBtn');
        accordionBtns.forEach((accordionBtn, index) => {
            accordionBtn.addEventListener('click', (e) => {
                //クリックされたボタンを把握
                activeIndex = index;
                //ボタンの親要素(ul>li)にクラスを付与／削除
                const isActive = e.target.parentNode.classList.toggle('active');
                accordionBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
                const content = accordionBtn.nextElementSibling;
                if (isActive) {
                    //active：開く関数.
                    slideDown(content);
                } else {
                    //activeがない：閉じる関数.
                    slideUp(content);
                }
                accordionBtns.forEach((accordionBtn, index) => {
                    if (activeIndex !== index) {
                        accordionBtn.parentNode.classList.remove('active');
                        accordionBtn.setAttribute('aria-expanded', 'false');
                        const openedContent = accordionBtn.nextElementSibling;
                        slideUp(openedContent);
                    }
                });
                //スクロール制御のために上位階層のクラス名を変える.
                let container = accordion.closest('.scroll-control');
                if (!isActive && container) {
                    container.classList.remove('active')
                } else if (container !== null) {
                    container.classList.add('active')
                }
            });
        });
    });
};