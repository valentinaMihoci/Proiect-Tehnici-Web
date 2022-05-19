function init(){
            const images = document.querySelectorAll("img.im");
            //const descriere = document.querySelectorAll("p.ascuns");
            const descriere = document.getElementsByClassName("ascuns");
            const modal = document.querySelector(".modal");
            const modalImg = document.querySelector(".modalImg");
            const modalTxt = document.querySelector(".modalTxt");
            const modalTxt2 = document.querySelector(".modalTxt2");
            const close = document.querySelector(".close");
            const prevBtn = document.querySelector(".prevBtn");
            const nextBtn = document.querySelector(".nextBtn");

            images.forEach((image,index) => {
                image.addEventListener("click", () => {
                    modalImg.src = image.src;
                    modalTxt.innerHTML = image.alt;
                    modalTxt2.innerHTML = `${descriere[index].textContent}`;
                    modal.classList.add("appear");

                   
                    let imageIndex = index;
                    let next = index+1;
                    let prev = index-1;

                    
                    window.addEventListener("keyup",(elem)=>{
                      if(next >= images.length){
                        next = 0;
                      } else if (prev<0){
                        prev = images.length-1;
                      }

                      if(elem.keyCode === 37){

                        modalImg.src = images[prev].src;
                        modalTxt.innerHTML = images[prev].alt;
                        const continut = descriere[prev].textContent;
                        modalTxt2.innerHTML = `${continut}`;
                        prev--;
                        next=prev+2;

                      } else if (elem.keyCode === 39){
                       
                        modalImg.src = images[next].src;
                        modalTxt.innerHTML = images[next].alt;
                        const continut = descriere[next].textContent;
                        modalTxt2.innerHTML = `${continut}`;
                        next++;
                        prev=next-2;

                      } else if (elem.keyCode === 27){
                        modal.classList.remove("appear");
                      }
                    });

                    prevBtn.addEventListener("click",()=>{
                      
                      modalImg.src = images[prev].src;
                      modalTxt.innerHTML = images[prev].alt;
                      const continut = descriere[prev].textContent;
                      modalTxt2.innerHTML = `${continut}`;
                      prev--;
                      next=prev+2;
                    });


                    nextBtn.addEventListener("click",()=>{
                        modalImg.src = images[next].src;
                        modalTxt.innerHTML = images[next].alt;
                        const continut = descriere[next].textContent;
                        modalTxt2.innerHTML = `${continut}`;
                        next++;
                        prev=next-2;

                    });

                    close.addEventListener("click", () => {
                      modal.classList.remove("appear");
                });
              });
            });

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

window.onload = init;