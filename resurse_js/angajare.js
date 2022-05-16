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

    document.getElementById("formular1").addEventListener('submit', handleSubmit);
    
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

function handleSubmit(event){
    event.preventDefault();
    document.getElementById("formular1").style.display = "inline-block";
    const nume = document.querySelector('[name="nume"]');
    const prenume = document.querySelector('[name="prenume"]');
    const data_nastere = document.querySelector('[name="data"]').value.split("-");
    const email = document.querySelector('[name="email"]');
    const telefon = document.querySelector('[name="telefon"]');
    document.querySelector('[name="preferinta"]').style.backgroundColor = 'rgba(70, 238, 70, 0.744)';
    document.querySelector('[name="preferinta"]').value = document.querySelector('[name="preferinta"]').value + "";

    if(validateNume(nume.value) == nume.value){
        nume.style.backgroundColor = 'rgba(70, 238, 70, 0.744)';
        nume.value = nume.value + "";
    } else {
        alert("Numele nu este scris corect! Te rugam sa-l introduci din nou. Multumim!");
        nume.value = "";
        nume.focus();
        nume.style.backgroundColor = 'rgba(255, 109, 69, 0.919)';
    }

    if(validateNume(prenume.value) === null ){
        alert("Prenumele nu este scris corect! Te rugam sa-l introduci din nou. Multumim!");
        prenume.value = "";
        prenume.focus();
        prenume.style.backgroundColor = 'rgba(255, 109, 69, 0.919)';
    } else{
        prenume.style.backgroundColor = 'rgba(70, 238, 70, 0.744)';
        prenume.value = prenume.value + "";
    }
    
    if(validateData(data_nastere) === false){
        alert("Nu ai 18 ani?  Te rugam sa verifici data cu atentie. Multumim!");
    }  

    if(validateEmail(email.value)){
        email.style.backgroundColor = 'rgba(70, 238, 70, 0.744)';
        email.value = email.value + "";
    } else {
        alert("Email nevalid! Introdu-l din nou. Multumim!");
        email.value = "";
        email.style.backgroundColor = 'rgba(255, 109, 69, 0.919)';
    }
    

    if(validateTelefon(telefon.value)){
        telefon.style.backgroundColor = 'rgba(70, 238, 70, 0.744)';
        telefon.value = telefon.value + "";
    } else {
        alert("Numarul de telefon trebuie sa inceapa cu \"07\" asa ca te rugam sa il introduci din nou. Multumim!");
        telefon.value = "";
        telefon.style.backgroundColor = 'rgba(255, 109, 69, 0.919)';
    }
    
}

const validateNume = (num) => {
    return num.match(/^[A-Za-z-]+$/g);
}

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateTelefon = (tel) => {
    return tel.match(/^[07]+\d{8}$/g);
};

const validateData = (data) => {
    if(parseInt(data[0])>2002){
        return false;
    } else { return true;}
}

window.onload = init;

