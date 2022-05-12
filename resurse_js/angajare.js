function init(){
    window.alert("mergeeede!")
    
    let button = document.getElementById("btn1");
    button.addEventListener('click', () => {
         window.alert("merge!")
         document.getElementById("formular1").style.display = "inline-block";
         button.style.display = "none";

    })


    let inp = [document.getElementById("inp1"),document.getElementById("inp2"),document.getElementById("inp3"),
               document.getElementById("inp4"),document.getElementById("inp5"),document.getElementById("inp6"),
               document.getElementById("inp7")];
    
}


function keydownFunction(elem) {
    elem.style.backgroundColor = "green";
}
  
function keyupFunction(elem) {
    elem.style.backgroundColor= "red";
}

window.onload=init;