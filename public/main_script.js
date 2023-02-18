"use strict";

(() => {

    // 初回アクセス時
    if (document.cookie.indexOf('visited=yes') === -1) {
        document.cookie = 'visited=yes path=/';
        Cookies.set(`length`, `0`, { expires: 365 });
    } 


    const content = document.getElementsByClassName("content")[0];

    // リストの追加処理
    const list_text = document.getElementById("add-text");
    // console.log(Cookies.get(["length"]));

    // リストの追加内部処理
    document.getElementById("add").addEventListener("click", () => {
        var item = document.createElement('div');
        item.className = 'list-item';

        item.innerHTML = `
            <input type="checkbox" id="c-box">
            <p class="list-item-text">${list_text.value}</p>
            <input type="submit" class="del" value="削除">`;

        content.appendChild(item);


        //Cookieに登録
        Cookies.set(`list${Number(Cookies.get(["length"])) + 1}`, `${list_text.value}`, { expires: 365 })


        // 削除ボタンに対するクリックイベントリスナーを追加
        item.querySelector(".del").addEventListener("click", function (e) {
            e.currentTarget.parentElement.remove();
            //Cookieに登録
            // └ リスト数を除算
            Cookies.set(`length`, `${Number(Cookies.get(["length"])) - 1}`, { expires: 365 });
            console.log("リスト数(削除):" + Cookies.get(["length"]));


        });


        //Cookieに登録
        // └ リスト数を加算

        Cookies.set(`length`, `${Number(Cookies.get(["length"])) + 1}`, { expires: 365 });

        console.log("リスト数(追加):" + Cookies.get(["length"]));
    });

    //Cookieに登録
    // └ リスト数を参照しCookieを読み込む

    for (let o = 1; o <= Cookies.get(["length"]); o++) {


            var item = document.createElement('div');
            item.className = 'list-item';
            item.id = o;

            item.innerHTML = `
            <input type="checkbox" id="c-box">
            <p class="list-item-text">${Cookies.get(`list${o}`)}</p>
            <input type="submit" class="del" value="削除">`;

            content.appendChild(item);

    }
    // 削除

    let items1 = document.querySelectorAll('.list-item');
    for (let p = 0; p < items1.length; p++) {
        items1[p].addEventListener("click", function (e) {
            console.log(e.currentTarget);
            e.currentTarget.remove();

            // Cookie削除 
            Cookies.set(`length`, `${Number(Cookies.get(["length"])) - 1}`, { expires: 365 });
            Cookies.remove(`list${e.currentTarget.id}`, { path: '' })
            Cookies.remove(`list${Number(e.currentTarget.id)+1}`, { path: '' })
            // リストの連番を振り直す
            console.log(document.querySelectorAll(".list-item").length);
            for (let i = 0; i <= document.querySelectorAll(".list-item").length; i++) {

                // 問題発生箇所
                Cookies.set(`list${i + 1}`, `${document.querySelectorAll(".list-item")[i].innerText}`, { expires: 365 })
                }
                
            });
        }
})();