function init(){
            const images = document.querySelectorAll("img.im");
            const descriere = document.querySelectorAll("p.ascuns");
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

                    alert(`${index}`);
                    let imageIndex = index;
                    let next = index+1;
                    let prev = index-1

                    alert(`${prev}`);
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
}

window.onload = init;