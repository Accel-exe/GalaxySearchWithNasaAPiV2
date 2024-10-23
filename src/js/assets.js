// Image Day
const imageDay = async () => {
    const imgDayCont = document.querySelector('#imgDayCont');
    const loading = document.createElement('div');
    loading.classList.add('loading');
    imgDayCont.appendChild(loading);

    const imgDayCopright = document.querySelector('#imgDayCopright');
    const imgDayDate = document.querySelector('#imgDayDate');
    const imgDayName = document.querySelector('#imgDayName');
    const imgDayTitle = document.querySelector('#imgDayTitle');
    const imgDayExplanation = document.querySelector('#imgDayExplanation');
    const imgDayMedia = document.querySelector('#imgDayMedia');

    const url = "https://api.nasa.gov/planetary/apod?api_key=6TlcJaSvx4mNYluxGaTvPg7HVDiaMqI51Cv5lPu5";
    const response = await fetch(url);
    const data = await response.json();

    loading.remove();
    console.log(data.hdurl)

    if (data['media_type'] === 'image') {
        const img = document.createElement('img');
        img.setAttribute('src', data.hdurl);
        imgDayMedia.prepend(img);
    } else if (data['media_type'] === 'video') {
        const video = document.createElement('video');
        video.controls;
        video.innerHTML =
            `
        <source src="${data.url}" type="video/mp4">
        `
        imgDayMedia.prepend(video);
    }

    imgDayCopright.innerHTML = `Copyright: ${data.copyright}`;
    imgDayDate.innerHTML = `Data: ${data.date}`;
    imgDayName.innerHTML = data.title;
    imgDayExplanation.innerHTML = data.explanation;
    imgDayTitle.innerHTML = data.title;
}

imageDay();

// Library
const nasaLibrary = async (search) => {
    const library = document.querySelector('#library');
    const form = document.querySelector('#form');
    form.remove();

    const btnSearch = document.createElement('button');
    btnSearch.classList.add('btnSearch')
    btnSearch.id = 'btnPrev'
    btnSearch.innerHTML = 'MENU';
    btnSearch.addEventListener('click', searchHud);
    library.appendChild(btnSearch);

    const container = document.querySelector('#container');
    const loading = document.createElement('div');
    loading.classList.add('loadingLibrary');
    container.appendChild(loading);

    const url = `https://images-api.nasa.gov/search?q=${search}`
    const response = await fetch(url);
    const data = await response.json();
    const libraryArray = data['collection']['items'];
    loading.remove();

    libraryArray.map((el) => {
        if (el['links'][0]['render'] === 'image') {
            const cards = document.createElement('div');
            cards.classList.add('cards');
            cards.innerHTML =
                `
                <img src="${el.links[0]['href']}" alt="">
                <span id="cardsTitle">${el.data[0]['title']}</span>
            `
            container.appendChild(cards);
        } else if (el['links'][0]['render'] === 'video') {
            const cards = document.createElement('div');
            cards.classList.add('cards');
            cards.innerHTML =
                `
                <video controls>
                <source src="${el.links[0]['href']}" type="video/mp4">
                </video>
                <span id="cardsTitle">${el.data[0]['title']}</span>
            `
            container.appendChild(cards);
        }
    })
}

const searchBtn = () => {
    const input = document.querySelector('#search');

    if (!input.value == '') {
        nasaLibrary(input.value);
    }
}

const searchHud = () => {
    const container = document.querySelector('#container');
    container.innerHTML = "";
    container.innerHTML =
        `
        <div id="form" class="form">
                <h2>Bliblioteca da NASA</h2>
                <label for="search">Pesquise sobre a Galaxia</label>
                <input id="search" type="text" placeholder="Digite em english" form="search">
                <button id="btnSearch" type="button" class="fromBtn">Pesquisar</button>
        </div>
    `
    const btnSearch = document.querySelector('#btnSearch');
    btnSearch.addEventListener('click', searchBtn);
    const btnPrev = document.querySelector('#btnPrev');
    btnPrev.remove();
};

const btnSearch = document.querySelector('#btnSearch');
btnSearch.addEventListener('click', searchBtn);

// Serviço de imagens de Marte 

const marsImgCont = document.querySelector('#marsImgCont');
const btnCamRover = document.querySelector('#camRover')
const allRoverPhotos = document.querySelector('#allRoverPhotos');

const marsForm = () => {
    const MarsImgForm = document.querySelector('#MarsImgForm');
    MarsImgForm.innerHTML = '';
    MarsImgForm.innerHTML =
        `
                    <span class="camSearch">Escolha uma Camera do Rover:</span>
                <div id="btnCam" class="cam">
                    <button id = "FHAZ" class="CamMars">Câmera de prevenção de riscos frontal</button>
                    <button id = "RHAZ" class="CamMars">Câmera de prevenção de riscos traseira</button>
                    <button id = "MAST" class="CamMars">Câmera de mastro</button>
                    <button id = "CHEMCAM" class="CamMars">Química e Complexo de Câmera</button>
                    <button id = "NAVCAM" class="CamMars">Câmera de navegação</button>
                    <button id = "btnSearchBack">Voltar</button>
                </div>
    `;

    const btnCam = [...document.querySelectorAll('.CamMars')];
    btnCam.map((el) => {
        el.addEventListener('click', (el) => {
            imgMarsCam(el.target.id);
        })
    })

    const btnSearchBack = document.querySelector('#btnSearchBack');
    btnSearchBack.addEventListener('click', () => {
        MarsImgForm.innerHTML = '';
        MarsImgForm.innerHTML =
            `
                <button id="camRover" class="formButton">Escolher Camera</button>
                <button class="formButton">Todas as Fotos</button>
            `;

        const btnCamRover = document.querySelector('#camRover');
        btnCamRover.addEventListener('click', marsForm);
    })
}

btnCamRover.addEventListener('click', marsForm);






const imgMarsCam = async (cam) => {

    const marsImg = document.querySelector('#marsImg');
    const marsImgCont = document.querySelector('#marsImgCont');
    marsImgCont.innerHTML = "";

    const loading = document.createElement('div');
    loading.classList.add('loadingMarsImg')
    marsImg.appendChild(loading)

    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${cam}&api_key=DEMO_KEY`
    const response = await fetch(url);
    const data = await response.json();
    const photosArray = data.photos;

    loading.remove();

    photosArray.map((el) => {
        const card = document.createElement('div');
        card.classList.add = 'marsImgCard';
        card.innerHTML =
            `
        <div class="CardsMars">
        <img src="${el['img_src']}">
        <span>earth_date: ${el['earth_date']}</span>
        </div>
        `
        marsImgCont.appendChild(card);
    })

    const btnBack = document.createElement('button');
    btnBack.classList.add('btnMarsMenu');
    btnBack.innerHTML = "MENU";
    marsImg.appendChild(btnBack);

    btnBack.addEventListener('click', () => {
        form = document.createElement('div');
        form.classList.add('form');
        form.id = ('MarsImgForm');
        form.innerHTML =
            `
                <button id="camRover" class="formButton">Escolher Camera</button>
                <button id="allRoverPhotos" class="formButton">Todas as Fotos</button>
        `

        btnBack.remove();
        marsImgCont.innerHTML = '';
        marsImgCont.appendChild(form);

        const btnCamRover = document.querySelector('#camRover')
        btnCamRover.addEventListener('click', marsForm);

        const allRoverPhotos = document.querySelector('#allRoverPhotos');
        allRoverPhotos.addEventListener('click', () => {
            imgMarsPage(1);
        })


    })
}

const imgMarsPage = async (page) => {
    const marsImg = document.querySelector('#marsImg');
    const marsImgCont = document.querySelector('#marsImgCont');
    marsImgCont.innerHTML = "";

    const loading = document.createElement('div');
    loading.classList.add('loadingMarsImg')
    marsImg.appendChild(loading)


    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=6TlcJaSvx4mNYluxGaTvPg7HVDiaMqI51Cv5lPu5`
    const response = await fetch(url);
    const data = await response.json();

    const photosArray = data['photos'];

    loading.remove();

    photosArray.map((el) => {
        const card = document.createElement('div');
        card.classList.add = 'marsImgCard';
        card.innerHTML =
            `
        <div class="CardsMars">
        <img src="${el['img_src']}">
        <span>earth_date: ${el['earth_date']}</span>
        </div>
        `
        marsImgCont.appendChild(card);
    })


    const btnforward = document.createElement('button');
    const btnbackward = document.createElement('button');
    const divBtn = document.createElement('div');

    divBtn.classList.add('BtnPages');


    btnforward.classList.add('btnMarsMenu');
    btnforward.innerHTML = 'NEXT';

    btnbackward.classList.add('btnMarsMenu');
    btnbackward.innerHTML = 'PREV';

    const btnBack = document.createElement('button');
    btnBack.classList.add('btnMarsMenu');
    btnBack.innerHTML = "MENU";

    divBtn.appendChild(btnforward);
    divBtn.appendChild(btnBack);
    divBtn.appendChild(btnbackward);
    marsImg.append(divBtn);

    btnBack.addEventListener('click', () => {

        divBtn.remove();

        form = document.createElement('div');
        form.classList.add('form');
        form.id = ('MarsImgForm');
        form.innerHTML =
            `
                <button id="camRover" class="formButton">Escolher Camera</button>
                <button id="allRoverPhotos" class="formButton">Todas as Fotos</button>
        `

        btnBack.remove();
        marsImgCont.innerHTML = '';
        marsImgCont.appendChild(form);

        const btnCamRover = document.querySelector('#camRover')
        btnCamRover.addEventListener('click', marsForm);

        const allRoverPhotos = document.querySelector('#allRoverPhotos');
        allRoverPhotos.addEventListener('click', () => {
            imgMarsPage(1);
        })
    })

    btnforward.addEventListener('click', () => {
        let num = 1;
        num += 1;
        imgMarsPage(num);
        divBtn.remove();
    })

    if (page > 1) {
        btnbackward.addEventListener('click', () => {
            let num = page;
            num -= 1;
            imgMarsPage(num);
            divBtn.remove();
        })
    }
}


allRoverPhotos.addEventListener('click', () => {
    imgMarsPage(1);
})