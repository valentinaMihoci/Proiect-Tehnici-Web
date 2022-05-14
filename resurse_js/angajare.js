function init(){
    let button = document.getElementById("btn1");
    button.addEventListener('click', () => {
         document.getElementById("formular1").style.display = "inline-block";
         button.style.display = "none";
    })

    let buton = document.getElementById("buton");
    buton.onclick = function(){

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var validRegex1 = /^[07]+\d{8}$/;

        let e = document.querrySelector("#formular1 input:nth=of-child(5)");
        let t = document.querySelector("#formular1 input:nth-of-child(6)");

        if( e.value != e.value.match(validRegex) ){
            e.value = "";
            alert("merge!");
        }

        if( t.value != t.value.match(validRegex1) ){
            t.value = "";
        }
    }
}

window.onload = init;