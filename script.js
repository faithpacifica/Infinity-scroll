const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true

//unslapsh api
let initialCount = 10;
// const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiKey = 'U7ZQm9ku4qf-zXZ9YMjqvmXdsyIeKTWy2InE37gTQBM';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIURLWithNewCount(picCount) {
    apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

// check if all images were loaded
function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for links and photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length
    photosArray.forEach((photo) => {

        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        img.addEventListener('load', imageLoaded)
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

//get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos()
        if (isInitialLoad) { // NEW LINE ****
            updateAPIURLWithNewCount(30) // NEW LINE ****
            isInitialLoad = false // NEW LINE ****
          } // NEW LINE ****
    } catch (error) {
           // Catch Error Here
    }
}

//is scrolling near bottom of page, load more
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        displayPhotos();
    }
})

getPhotos()