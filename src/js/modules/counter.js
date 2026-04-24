export const counter = () => {

	function addMessage(message) {
		const messageElm = document.createElement('div');
		const now = new Date();
		messageElm.innerText = `${now.getHours()}時${now.getMinutes()}分${now.getSeconds()}秒${message}`;
		messageElm.classList = ['message'];
		logElm.appendChild(messageElm);
	}

	const startBtn = document.querySelector(".counter-start");
	const displayElm = document.querySelector(".display");
	const logElm = document.querySelector('.counter-log');
	let timer = null;

	startBtn.addEventListener('click', function () {
		if (timer === null) {
			let seconds = 0;

			// 一定時間ごとに処理を繰り返す
			timer = setInterval(function () {
				seconds++;
				// console.log(seconds);
				displayElm.innerText = seconds;
			}, 1000);

			addMessage('開始');
		}
	});

	const stopBtn = document.querySelector(".counter-stop");
	stopBtn.addEventListener('click', function () {
		if (timer !== null) {
			clearInterval(timer);
			timer = null;

			addMessage('終了');
		}
	})
};


