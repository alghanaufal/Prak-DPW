const API_KEY = 'api_key=58bb5f49ca1e01051e03b7ceba9526f1';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + 'movie/popular?' + API_KEY;
const searchURL = BASE_URL + 'search/movie?' + API_KEY;

const container = document.getElementById('card-list');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        showMovies(data.results);
    })
}

function showMovies(data) {
    container.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, release_date, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('container');
        movieEl.innerHTML = `
            <div class="card mb-2 mt-2 shadow" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="https://image.tmdb.org/t/p/w342/${poster_path}" alt="${title}" class="card-img">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text"><small class="text-muted">${release_date}</small></p>
                            <div class="overview">
                                <p class="card-text"><small>${overview}</small></p>
                            </div>
                            <span style="color:${getColor(vote_average)}; font-weight:bold">${vote_average}</span>
                        </div>
                    </div>
                </div>
            </div>`
        
        container.appendChild(movieEl);
    })
}

function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >=5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchURL+'&query='+searchTerm);
    } else {
        getMovies(API_URL);
    }
})
