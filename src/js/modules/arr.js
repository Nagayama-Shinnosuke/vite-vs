export const arr = () => {
    const nameArr = ["永山", "福村", "野村", "雨宮", "木本"];

    // 従来のfor文での配列処理.
    // for (let index = 0; index < nameArr.length; index++) {
    //     console.log(nameArr[index]);
    // }

    // 新しい配列として戻る.
    nameArr.map((name) => {
        console.log(name);
    });

    // 新しい配列に返したときの反応.
    const nameArr02 = nameArr.map((name) => {
        return name;
    });
    console.log(nameArr02);



    // filterはフィルタリングして新配列を生成する.
    const numArr = ["1", "2", "3", "4", "5"];
    // 奇数のみ取り出したい場合.
    const newNumArr = numArr.filter((num) => {
        // returnの後に条件記述.
        return num % 2 === 1;
    });
    console.log(newNumArr);


    // 引数を用いた何番目のデータを扱うか.
    nameArr.map((name, index) => {
        console.log(`${index + 1}番目の名前は：${name}です`);
    });


    // 実践的なコーディング.
    // nameArrに対して「永山」のデータ以外には「さん」をつけて排出する.
    const nameArr03 = ["永山", "福村", "野村", "雨宮", "木本"];
    const newNameArr = nameArr03.map((name) => {
        if (name === "永山") {
            return name;
        } else {
            return `${name}さん`;
        }
    });
    console.log(newNameArr);


    // 三項演算子(簡単なif else)
    // 書き方：ある条件式 ? 条件がtrueの時 : 条件がfalseの時 .
    const val1 = 1 > 0 ? "trueです" : "falseです";
    console.log(val1);


    // num のtypeof によって表示結果が可変.
    const num = "1300";
    // toLocaleString：値が数値の時に三桁で区切る処理.
    console.log(num.toLocaleString());

    const formattedNum = typeof num === 'number' ? num.toLocaleString() : "数値を入力してください";
    console.log(formattedNum);


    // 2つの引数を受け取って合計する.
    const checkSum = (num1, num2) => {
        return num1 + num2 > 100 ? "100を超えています" : "許容範囲内です";
    };
    console.log(checkSum(60, 50));


    // truthy, falsyについて
    // truthy, falsyの簡単な判定
    const checkTrue = (check) => {
        return (check) ? "truthyfです" : "falsyです";
    };
    console.log(checkTrue(1));


    // 論理演算しについて.
    const logicalNum = null;
    // const logicalNum = 100;
    const fee = logicalNum || "金額が未設定";
    // || は左側がtrusyの場合、その時点で返却する.
    console.log(fee);


}
