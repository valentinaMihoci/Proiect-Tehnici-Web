function init(){
  
    merge = document.getElementById("chestie_plimbareata");
	merge.style.position="absolute"; 
	merge.style.left="10px";
	
	id_interval_plimbare = setInterval( function(){plimba(merge);},40);
	
	merge.onclick = function(){
		if(id_interval_plimbare){
			clearInterval(id_interval_plimbare);
			id_interval_plimbare=0;
		}
		else{
			id_interval_plimbare=setInterval( function(){
					plimba(merge);
				},40);
		}
	}

    document.addEventListener('contextmenu', handleClick);

   let btn = document.getElementById("btn1");
   btn.addEventListener('click',()=>{
    document.getElementById("formular1").style.display = "inline-block";   
    btn.style.display = "none";
   })

    document.addEventListener('submit', Submit);
    
}

function plimba(ob){
	var pas;
	var DIST_MAX=400;
	if(ob.className=="dreapta")
		pas=2;
	else
		pas=-2;
	var pozitie= parseInt(ob.style.left);
	pozitie+=pas; 
	
	if(pozitie==10 && ob.className=="stanga")
	{
		ob.className="dreapta"
		ob.src= "resurse_poze/imagineSpec.jpg";//schimb imaginea ca zana sa fie orientata spre dreapta
	}
	else if(pozitie>=DIST_MAX && ob.className=="dreapta")
	{
		ob.className="stanga"
		ob.src="resurse_poze/imagineSpec_copie.jpg";
	}
	ob.style.left=pozitie+"px";   //actualizez proprietatea CSS, ca sa se mute obiectul
		
}


function randomColor() {
    let r = Math.floor(255 * Math.random());
    let g = Math.floor(255 * Math.random());
    let b = Math.floor(255 * Math.random());

    return `rgb(${r},${g},${b})`;
}

let menu = null;

function handleClick(event) {
    event.preventDefault();
    menu?.remove();

    menu = document.createElement('div');
    menu.textContent = "Miau! Nu poti vedea codul!";
    menu.style.position = 'fixed';

    menu.style.top = event.clientY + "px";
    menu.style.left = event.clientX + "px";
    menu.style.padding = 10 + "px";
	menu.style.color = "black";
    menu.style.background = randomColor();
	menu.style.borderStyle = "double";
	menu.style.borderColor = "brown";
	menu.style.borderWidth = 3 + "px";

    document.body.append(menu);

	setTimeout(()=>{
        menu.remove();
	}, 3000);	
}

function Submit(event){
    event.preventDefault();
    document.getElementById("formular1").style.display = "inline-block";
    const nume = document.querySelector('[name="nume"]').value;
    const prenume = document.querySelector('[name="prenume"]').value;
    const data_natere = document.querySelector('[name="data"]').value;
    const email = document.querySelector('[name="email"]').value;
    const telefon = document.querySelector('[name="telefon"]').value;

    let variabila = telefon != telefon.match(/^[07]+\d{8}$/g);
    window.alert(`${variabila}`);

    if ( variabila === true){

        window.alert("Atentie!! Telefonul trebuie sa inceapa cu 07");
        var em = document.createElement("em");
        var textnou = document.createTextNode("Telefonul nu a trecut de validare. Te rugam sa-l introduci din nou.");
        em.appendChild(textnou); 
        var parinte = document.querySelector('[name="telefon"]');
        parinte.prepend(em);
    } else { alert("totul este bine")}

    var validRegex3 = /^[A-Za-z-]+$/;
    
}

window.onload = init;

