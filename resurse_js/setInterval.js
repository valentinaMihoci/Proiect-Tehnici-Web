window.onload=function(){
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