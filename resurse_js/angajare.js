function init(){
    window.alert("mergeeede!")
    
    let button = document.getElementById("btn1");
    button.addEventListener('click', () => {
         window.alert("merge!")
         document.getElementById("formular1").style.display = "inline-block";
         button.style.display = "none";

    })


    let inputuri = document.querySelectorAll('input.inp');
    window.alert(`${inputuri.length}`);

    inputuri.forEach((input) => {
        const copie = input;
        input.addEventListener("keydown", (input)=>
           { input.style.backgroundColor = "green";}
        );
        input.addEventListener("keyup",keyupFunction(copie));
    });
    
    
}


function keydownFunction(element) {
    element.style.backgroundColor = "green";
}
  
function keyupFunction(element) {
    element.style.backgroundColor= "red";
}

window.onload=init;