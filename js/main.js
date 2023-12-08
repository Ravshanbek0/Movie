var api_link = `https://api.themoviedb.org/3/movie/popular?api_key=e3eba846fb6af8da7df4730f6734f0f7&language=en-US&page=1`;
const cards = document.querySelector(".cards")
const all = document.querySelector(".all")
const comdey = document.querySelector(".comdey")
const militiant = document.querySelector(".militiant")
const murder = document.querySelector(".murder")
const modal = document.querySelector(".modal")
const Xbtn = document.querySelector("#Xbtn")

var movies

const getData = async (link) => {
    const req = await fetch(link)
    const data = await req.json()
    writeData(data)
    movies=data
}
getData(api_link)


function writeData(arr) {
    arr.results.forEach((item) => {
        // console.log(item.id);    
        cards.innerHTML += `
        <div class="card" onclick='getId(${item.id})'>
            <h1 class="movie_name">
                ${item.title}
            </h1>
            <div class="imgDiv">
                <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="">
            </div>
        </div>
        `
    });
}
const getModal = (id) => {
    const data=movies
    data.results.forEach((item) => {
        if (item.id == id) {
            modal.innerHTML = `
        <div class="modalBlog">
            <i onclick="removeModal()" id="Xbtn" class="fa-solid fa-xmark"></i>
            <div class="modalMain">
                <div class="left-modal">
                    <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="">
                </div>
                <div class="right-modal">
                    <h1  class="modal_name">${item.title}</h1>
                    <p class="modal_about">Realese-date: <span>${item.release_date}</span></p>
                    <p class="modal_about">Popularity: <span>${item.popularity}</span></p>
                    <p class="modal_about">Original language <span>${item.original_language}</span></p>
                    <p class="overwiev_name">Overview:</p>
                    <div class="modal_overview">
                        
                        <p class="overwiev_text">${item.overview}</p>
                    </div>
                </div>
            </div>
        </div>
        `
        }
    })

}
function removeModal(params) {
    modal.classList.remove("repeat")
}
function getId(id) {
    var modalId = id
    modal.classList.add("repeat")
    getModal(modalId)

}


function filterData(id) {
    const idData=id
    cards.innerHTML=""
   if (idData==0) {
        writeData(movies)
   }else{
    movies.results.forEach((item)=>{
        if (item.genre_ids.includes(idData)) {
            
            
            cards.innerHTML+=`
            <div class="card" onclick='getId(${item.id})'>
                <h1 class="movie_name">
                    ${item.title}
                </h1>
                <div class="imgDiv">
                    <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="">
                </div>
            </div>
            `
        }
    })
   }
}



comdey.addEventListener("click", () => {
    filterData(35)
    comdey.classList.add("active")
    all.classList.remove("active")
    militiant.classList.remove("active")
    murder.classList.remove("active")
})
all.addEventListener("click", () => {
    filterData(0)
    all.classList.add("active")
    comdey.classList.remove("active")
    militiant.classList.remove("active")
    murder.classList.remove("active")
})
militiant.addEventListener("click", () => {
    filterData(28)
    militiant.classList.add("active")
    all.classList.remove("active")
    comdey.classList.remove("active")
    murder.classList.remove("active")
})
murder.addEventListener("click", () => {
    filterData(53)
    murder.classList.add("active")
    all.classList.remove("active")
    militiant.classList.remove("active")
    comdey.classList.remove("active")
})
