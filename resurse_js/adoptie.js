function init(){
            const images = document.querySelectorAll("img.im");
            const modal = document.querySelector(".modal");
            const modalImg = document.querySelector(".modalImg");
            const modalTxt = document.querySelector(".modalTxt");
            const modalTxt2 = document.querySelector(".modalTxt2");
            const close = document.querySelector(".close");

            images.forEach((image) => {
                image.addEventListener("click", () => {
                    modalImg.src = image.src;
                    modalTxt.innerHTML = image.alt;
                    let v = document.querySelector("p.ascuns").textContent;
                    modalTxt2.innerHTML = `${v}`;
                    modal.classList.add("appear");

                    close.addEventListener("click", () => {
                      modal.classList.remove("appear");
                });
              });
            });
}

window.onload = init;