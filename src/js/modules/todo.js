export const todo = () => {

    const onClickAdd = () => {
        const inputText = document.getElementById("add-text").value;
        // テクストボックスの初期化.
        document.getElementById("add-text").value = "";

        createIncompleteTodo(inputText);
    };

    const createIncompleteTodo = (todo) => {
        // li作成.
        const createLi = document.createElement("li");

        // div生成.
        const createDiv = document.createElement("div");
        createDiv.className = "list-row";

        // pタグ生成.
        const createP = document.createElement("p");
        createP.className = "todo-item";
        createP.innerText = todo;

        // btn（完了）タグ作成.
        const completeBtnElm = document.createElement("button");
        completeBtnElm.innerText = "完了";
        completeBtnElm.addEventListener('click', () => {
            const moveTarget = completeBtnElm.closest("li");
            // nextElementSibling => 次に登場する要素の削除.
            completeBtnElm.nextElementSibling.remove();
            completeBtnElm.remove();

            // 戻すボタンを生成してdivタグ直下に配置.
            const backBtn = document.createElement("button");
            backBtn.innerText = "戻す";

            // backボタンの処理.
            backBtn.addEventListener('click', () => {
                const todoText = backBtn.previousElementSibling.innerText;
                createIncompleteTodo(todoText);
                backBtn.closest("li").remove();
            });

            // 要素の一階層下の操作
            moveTarget.firstElementChild.appendChild(backBtn);

            // 完了リストに移動.
            document.getElementById("complete-list").appendChild(moveTarget);
        });

        // btn（削除）タグ作成.
        const deleteBtnElm = document.createElement("button");
        deleteBtnElm.innerText = "削除";
        deleteBtnElm.addEventListener('click', () => {
            // 親要素に当たるliタグを未完了リストから削除(closestで指定した親を取得).
            const deleteTarget = deleteBtnElm.closest("li");
            // 要素の削除removeChild.
            document.getElementById("incomplete-list").removeChild(deleteTarget);
        });


        // 階層構造.
        createDiv.appendChild(createP);
        createDiv.appendChild(completeBtnElm);
        createDiv.appendChild(deleteBtnElm);
        createLi.appendChild(createDiv);

        // 未完了のタスクに追加.
        const incompleteListElm = document.getElementById("incomplete-list");
        incompleteListElm.appendChild(createLi);
    };

    document.getElementById('add-btn').addEventListener('click', onClickAdd);


};


