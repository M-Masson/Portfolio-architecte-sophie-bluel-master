let projets;
let gallerie=document.getElementById("gallery");
const url = "http://localhost:5678/";
let token = localStorage.getItem("token");
let login = document.getElementById("login");

function getprojet(){
    console.log(localStorage.getItem("token"));
    fetch(url+"api/works")
    .then(reponse => reponse.json())
    .then(works => {
        projets=works;
        insertprojet(projets);
    })
    .catch(error=>console.error(error))
}
function insertprojet(works){
    gallerie.innerHTML="";
    for (let i=0; i<works.length;i++){
        let figure=document.createElement("figure");
        figure.setAttribute("categorie", works[i].categoryId)
        let img = document.createElement("img");
        img.src=works[i].imageUrl;
        img.alt=works[i].title;
        let figcaption=document.createElement("figcaption");
        figcaption.innerText=works[i].title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallerie.appendChild(figure)
    }
}
function getcategories(){
    fetch(url+"api/categories")
    .then(reponse => reponse.json())
    .then(categories => {
        projets=categories;
        insertcategory(projets);
    })
    .catch(error=>console.error(error))
}

 function insertcategory(categories){
    let categorymenu = document.getElementById("categorymenu");
    let btntous = document.createElement("btntous");
    btntous.innerText = "Tous";
    categorymenu.appendChild(btntous);
    btntous.classList.add("btntousdefault");

    for (let i=0; i<categories.length;i++){
        let btn=document.createElement("button");
        btn.innerText = categories[i].name;
        btn.setAttribute("categorie", categories[i].id);
        categorymenu.appendChild(btn);
        
    }
    const btnobjets = document.querySelector('button[categorie="1"]');
    const btnappartements = document.querySelector('button[categorie="2"]');
    const btnhotel = document.querySelector('button[categorie="3"]');

    if(btnobjets){
        btnobjets.addEventListener("click", function (){
            const objetsfiltre = worksfilter(1);
            insertprojet(objetsfiltre);
            btnobjets.style.backgroundColor="#1D6154";
            btnobjets.style.color="white";
            btnappartements.style.backgroundColor="";
            btnappartements.style.color="";
            btnhotel.style.backgroundColor="";
            btnhotel.style.color="";
            btntous.classList.remove("btntousdefault")
        
        })
    }
    if (btnappartements){
        btnappartements.addEventListener("click", function (){
            const appartementsfiltre = worksfilter(2);
            insertprojet(appartementsfiltre);
            btnobjets.style.backgroundColor="";
            btnobjets.style.color="";
            btnappartements.style.backgroundColor="#1D6154";
            btnappartements.style.color="white";
            btnhotel.style.backgroundColor="";
            btnhotel.style.color="";
            btntous.classList.remove("btntousdefault")
        })
    }
    if(btnhotel){
        btnhotel.addEventListener("click", function (){
            const hotelfiltre = worksfilter(3);
            insertprojet(hotelfiltre);
            btnobjets.style.backgroundColor="";
            btnobjets.style.color="";
            btnappartements.style.backgroundColor="";
            btnappartements.style.color="";
            btnhotel.style.backgroundColor="#1D6154";
            btnhotel.style.color="white";
            btntous.classList.remove("btntousdefault")
        })
    }
    btntous.addEventListener("click", function (){
        insertprojet(projets);
        btnobjets.style.backgroundColor="";
        btnobjets.style.color="";
        btnappartements.style.backgroundColor="";
        btnappartements.style.color="";
        btnhotel.style.backgroundColor="";
        btnhotel.style.color="";
        btntous.classList.add("btntousdefault")
    })
    login.addEventListener("click", function () {
        window.location.href = "login.html";
    })
}

function worksfilter(categoryId){
    return projets.filter((works) => works.categoryId === categoryId);
}

function seteditmode(){
    let editmode = document.getElementById("editmode");
    editmode.style.backgroundColor = "black";
    
    let editmodetxt = document.createElement("p");
    editmodetxt.innerText = "Mode édition";
    editmodetxt.classList.add("editmodetxt");
    
    let editmodeicon = document.createElement("div");
    editmodeicon.classList.add("editmodeicon");

    login.innerText = "logout";
    login.addEventListener("click", function () {
        localStorage.removeItem("token");
        console.log(token)
        window.location.href = "index.html";
    })
    
    let editmodesvg =  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15.58" height="15.58">
                        <path fill="#ffffff" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 
                            33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 
                            256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 
                            16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 
                            8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 
                            6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 
                            0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 
                            152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 
                            10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 
                            40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
                        />
                        </svg>`;
    editmodeicon.innerHTML = editmodesvg;
    
    
    editmode.appendChild(editmodetxt);
    editmode.appendChild(editmodeicon);
    
    
    let portfolio = document.getElementById("portfolio");
    let mesprojets = document.getElementById("mesprojets");
    let editprojets = document.querySelector(".editprojets");
    
    
    let edit = document.createElement("a");
    let editicon = document.createElement("div");
    let edittxt = document.createElement("p");
    
    
    portfolio.appendChild(editprojets);
    editprojets.appendChild(mesprojets);
    editprojets.appendChild(edit);
    edit.appendChild(editicon);
    edit.appendChild(edittxt);
    edit.classList.add("edit");
    
    editicon.classList.add("editicon");
    
    let editsvg =   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15.58" height="15.58">
                        <path fill="#000000" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 
                            33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 
                            256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 
                            16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 
                            8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 
                            6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 
                            0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 
                            152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 
                            10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 
                            40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
                        />
                    </svg>`;
    editicon.innerHTML = editsvg;
    
    edittxt.innerText = "modifier";

    edit.addEventListener("click", () =>{
        openmodal();
    });
}

if(token){
    seteditmode()

}else{
   getcategories()
}
let modal1 = document.createElement("aside");

function openmodal(){
    if (!document.body.contains(modal1)){
        
        modal1.classList.add("modal");
        

        let modalpage = document.createElement("div");
        modalpage.classList.add("modalpage");

        let modalexit = document.createElement("div");
        let exitsvg =   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24">
                        <path fill="#000000" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 
                        0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 
                        361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 
                        32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`
        modalexit.innerHTML = exitsvg;
        modalexit.classList.add("modalexit");

        modalexit.addEventListener("click", () =>{
            closemodal();
        })

        let modaltitle = document.createElement("h3");
        modaltitle.innerText = "Galerie photo";
        modaltitle.classList.add("modaltitle")
        let modalgalery = document.createElement("div");
        modalgalery.classList.add("modalgalery");
        let modaladd = document.createElement("div");
        modaladd.classList.add("modaladd");
        let addbtn = document.createElement("button");
        addbtn.innerText = "Ajouter une photo";
        addbtn.classList.add("addbtn");
        modaladd.appendChild(addbtn);

        modalpage.appendChild(modalexit);
        modalpage.appendChild(modaltitle);
        modalpage.appendChild(modalgalery);
        modalpage.appendChild(modaladd);
        modal1.appendChild(modalpage);

        document.body.appendChild(modal1);
    }
    modal1.style.display = null;
    modal1.removeAttribute("aria-hidden");
    modal1.setAttribute("aria-modal","true");

    function getmodalprojet(){
        fetch(url+"api/works")
        .then(reponse => reponse.json())
        .then(works => {
            projets=works;
            modalinsertprojects(projets);
        })
        .catch(error=>console.error(error))
    }
    
   function modalinsertprojects(works){
        let modalgalery = modal1.querySelector(".modalgalery");
        modalgalery.innerHTML="";
        for (let i = 0; i < works.length; i++){
            let img = document.createElement("img");
            img.src = works[i].imageUrl;
            modalgalery.appendChild(img);
        }
    }
getmodalprojet();
}

 function closemodal(){
    
    
    modal1.style.display = "none";
    modal1.setAttribute("aria-hidden","true");
    modal1.removeAttribute("aria-modal");
    
 }




getprojet()



