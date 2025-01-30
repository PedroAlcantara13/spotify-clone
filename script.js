const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm))
}

function displayResults(result, searchTerm) {
    resultPlaylist.classList.add("hidden");

    // Verifica se há resultados e se algum artista corresponde à pesquisa
    const matchingArtists = result.filter(artist => artist.name.toLowerCase().includes(searchTerm));

    if (matchingArtists.length > 0) {
        const artistName = document.getElementById('artist-name');
        const artistImage = document.getElementById('artist-img');
        
        // Exibe o primeiro artista correspondente
        const firstArtist = matchingArtists[0];

        artistName.innerText = firstArtist.name;
        artistImage.src = firstArtist.urlImg;
        console.log(firstArtist.name);
    } else {
        // Caso não haja artistas correspondentes
        console.log('Nenhum artista encontrado!');
    }

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return;
    }
    
    requestApi(searchTerm);
})
