export const photoViewer = () => {
    // console.log("フォトビュー読み込み成功   "); 
    class photo_viewer {
        constructor(rootElm, images) {
            this.rootElm = rootElm;
            this.images = images;
            this.currentIndex = 0;
        }
        init() {
            const nextBtnElm = this.rootElm.querySelector('.nextBtn');
            nextBtnElm.addEventListener('click', () => {
                this.next();
            });

            const prevBtnElm = this.rootElm.querySelector('.prevBtn');
            prevBtnElm.addEventListener('click', () => {
                this.prev();
            });

            this.renderImageUrls();
            this.updatePhoto();

        }

        updatePhoto() {
            const frameElm = this.rootElm.querySelector('.frame');
            // const image = this.images[this.currentIndex];
            const imageIndex = this.currentIndex + 1;
            frameElm.innerHTML = `
                <div class="currentImage">
                    <p>${imageIndex}枚目</p>
                    <img src="${this.images[this.currentIndex]}" />
                </div>
            `;

            this.startTimer();
        }

        startTimer() {
            if (this.timeKey) {
                clearTimeout(this.timeKey);
            }

            this.timeKey = setTimeout(() => {
                this.next();
            }, 2000)
        }

        next() {
            this.currentIndex++;
            if (this.currentIndex >= this.images.length) {
                this.currentIndex = 0;
            }
            this.updatePhoto();
        }

        prev() {
            this.currentIndex--;

            if (this.currentIndex < 0) {
                this.currentIndex = this.images.length - 1;
            }

            this.updatrePhoto();
        }

        renderImageUrls() {
            const imagesElm = this.rootElm.querySelector('.images');
            let imageUrlsHtml = '';
            for (const image of this.images) {
                imageUrlsHtml += `<li><a href="${image}" target="_blank">${image}</a></li>`;
            }
            imagesElm.innerHTML = imageUrlsHtml;
        }
    }

    const images = [
        'https://placehold.jp/333/ffffff/250x150.png?text=%E9%BB%92%E8%83%8C%E6%99%AF%E7%94%BB%E5%83%8F',
        'https://placehold.jp/910303/ffffff/250x150.png?text=%E8%B5%A4%E8%83%8C%E6%99%AF%E7%94%BB%E5%83%8F',
        'https://placehold.jp/3d4070/ffffff/150x150.png'
    ];
    new photo_viewer(document.getElementById('photoViewer'), images).init();
}