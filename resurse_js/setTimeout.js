window.onload=function(){
	imagine = document.getElementById("prima_poza");
	setTimeout(schimbarePoza404, 3000);	

	document.addEventListener('contextmenu', handleClick);

	merge = document.getElementById("chestie_plimbareata");
	merge.style.position="absolute"; 
	merge.style.left="10px";
	
	//creez animatia printr-un setInterval
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
}

function schimbarePoza404() {
  document.getElementById("prima_poza").src = "resurse_poze/404_2.jpeg";
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
