export const quize = () => {

    class WorldQuize {
        constructor(rootElm) {
            this.rootElm = rootElm;
            // console.log('インスタンス生成');

            this.gameStatus = {};
            this.resetGame();
        }

        async init() {
            await this.fetchQuizData();
            this.displayStartView();
        }

        async fetchQuizData() {
            try {
                const response = await fetch('/data/quize.json');
                this.quizeData = await response.json();
            } catch (e) {
                this.rootElm.innerText = '問題の読み込みに失敗しました。';
                console.log(e);
            }
        }

        // nextStep() {
        //     this.gameStatus.step++;
        //     this.displayQuestionView();
        // }

        isLastStep() {
            const currentQuestions = this.quizeData[this.gameStatus.level];
            return this.gameStatus.step === Object.keys(currentQuestions).length;
        }

        nextStep() {
            this.clearTimer();
            this.addResult();
            if (this.isLastStep()) {
                this.displayResultView();
            } else {
                this.gameStatus.step++;
                this.displayQuestionView();
            }
        }

        addResult() {
            const checkedElm = this.rootElm.querySelector('input[name="choice"]:checked');

            const answer = checkedElm ? checkedElm.value : '';
            const currentQuestion = this.quizeData[this.gameStatus.level][`step${this.gameStatus.step}`];

            this.gameStatus.results.push({
                question: currentQuestion,
                selectedAnswer: answer
            });

            console.log(`回答結果：${answer}`);
        }

        calcScore() {
            let correctNum = 0;
            const results = this.gameStatus.results;

            for (const result of results) {
                const selected = result.selectedAnswer;
                const correct = result.question.answer;
                if (selected === correct) {
                    correctNum++;
                }
            }
            return Math.floor((correctNum / results.length) * 100);
        }

        resetGame() {
            this.gameStatus.level = null;
            this.gameStatus.step = 1;
            this.gameStatus.results = [];

            this.gameStatus.timeLimit = 0;
            this.gameStatus.intervalKey = null;
        }

        setTimer() {
            if (this.gameStatus.intervalKey !== null) {
                throw new Error('タイマーが動いています');
            }
            this.gameStatus.timeLimit = 10;

            this.gameStatus.intervalKey = setInterval(() => {
                this.gameStatus.timeLimit--;
                if (this.gameStatus.timeLimit === 0) {
                    this.nextStep();
                } else {
                    this.renderTimeLimitStr();
                }
            }, 1000);
        }

        clearTimer() {
            clearInterval(this.gameStatus.intervalKey);
            this.gameStatus.intervalKey = null;
        }

        // レベルなどの表示盛業.
        displayStartView() {
            const levelStrs = Object.keys(this.quizeData);
            this.gameStatus.level = levelStrs[0];
            const optionStrs = [];

            for (let i = 0; levelStrs.length > i; i++) {
                optionStrs.push(`<option value="${levelStrs[i]}" name="level">レベル${i + 1}</option>`)
            }

            const html = `
            <select class="levelSelector">
                ${optionStrs.join('')}
            </select>
            <button class="startBtn">スタート！</button>
            `;

            const parentElm = document.createElement('div');
            parentElm.innerHTML = html;

            const selectorElm = parentElm.querySelector('.levelSelector');
            selectorElm.addEventListener('change', (event) => {
                this.gameStatus.level = event.target.value;
            });

            const startBtnElm = parentElm.querySelector('.startBtn');
            startBtnElm.addEventListener('click', () => {
                // console.log("スタートしました！");
                this.displayQuestionView();
            })

            // this.rootElm.appendChild(parentElm);
            this.replaceView(parentElm);
        }


        // スタートボタン処理.
        displayQuestionView() {
            console.log(`選択中のレベル：${this.gameStatus.level}`);
            this.setTimer();

            const stepKey = `step${this.gameStatus.step}`;
            const currentQuestion = this.quizeData[this.gameStatus.level][stepKey];

            const choiceStrs = [];
            for (const choice of currentQuestion.choices) {
                choiceStrs.push(`<label>
                    <input type="radio" name="choice" value="${choice}" />${choice}
                    </label>`);
            }
            const html = `
                <p class="sec">残り解答時間:${this.gameStatus.timeLimit}秒</p>
                <p>${currentQuestion.word}</p>
                <div>${choiceStrs.join('')}</div>
                <div class="actions">
                    <button class="nextBtn">回答する</button>
                </div>
            `;

            const parentElm = document.createElement('div');
            parentElm.className = 'question';
            parentElm.innerHTML = html;

            // const retireBtnElm = parentElm.querySelector('.retireBtn');
            // retireBtnElm.addEventListener('click', () => {
            //     this.displayResultView();
            // });


            const nextBtnElm = parentElm.querySelector('.nextBtn');
            nextBtnElm.addEventListener('click', () => {
                this.nextStep();
            });

            // this.rootElm.appendChild(parentElm);
            this.replaceView(parentElm);
        }

        renderTimeLimitStr() {
            const secElm = this.rootElm.querySelector('.sec');
            secElm.innerText = `残り解答時間:${this.gameStatus.timeLimit}秒`;
        }


        displayResultView() {
            const score = this.calcScore();

            const html = `
                <p>ゲーム終了</p>
                <p>正解率： ${score}%</p>
                <button class="resetBtn">開始画面に戻る</button>
            `;

            const parentElm = document.createElement('div');
            parentElm.className = 'results';
            parentElm.innerHTML = html;

            const resetBtnElm = parentElm.querySelector('.resetBtn');
            resetBtnElm.addEventListener('click', () => {
                this.resetGame();
                this.displayStartView();
            });

            this.replaceView(parentElm);
        }

        replaceView(elm) {
            this.rootElm.innerHTML = '';
            this.rootElm.appendChild(elm);
        }
    }

    new WorldQuize(document.getElementById('app-quize')).init();
}
