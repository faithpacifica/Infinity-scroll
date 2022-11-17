const count = 30;
const apiKey = 'Vo7HqSZq44UgfcnGhgnTgzk-42dZyCO0uCzIGOmquRE';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        console.log(data);
    } catch (error) {
    }
}

getPhotos()