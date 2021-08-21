
var tempImageUrl = ''
var selectedMovieId = ''
var selectedMovieImage = '';
var selectedMovieRating = 0;


function ratingStar(event, className, id, currentValue) {
    var checkValue = document.querySelectorAll(`.${className}.rating_container input`);
    var checkCount = 0;
    for (var i = 0; i < checkValue.length; i++) {
        if (checkValue[i] == event.target) {
            checkCount = i + 1;
        }
    }
    let sameValueChoosed = false;
    if (checkCount == currentValue && checkCount != 0) {
        sameValueChoosed = true;
    }
    var movieList = JSON.parse(localStorage.getItem('movieList'))
    movieList.forEach(data => {
        if (data.id == id) {
            if (sameValueChoosed) {
                data.rating = 0
            }
            else {
                data.rating = checkCount
            }

        }
    })
    localStorage.setItem('movieList', JSON.stringify(movieList))
    buildMovieList()
}

var modal = document.getElementById("movie_creation_modal");
function openModal() {
    modal.style.display = "block";
}
function closeModal() {
    modal.style.display = "none";
    document.getElementById('title').value = '';
    document.getElementById('release_date').value = '';
    document.getElementById('language').value = '';
    document.getElementById('imageUrl').value = '';
    document.getElementById('banner_image_change').style.display = 'none';
    document.getElementById('banner_image_name').style.display = 'none'
    document.getElementById('imageUrl').style.display = 'block';
    tempImageUrl = '';
    selectedMovieId = '';
    selectedMovieImage = '';
    selectedMovieRating = 0;
}


// window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

window.onload = function () {
    if (localStorage.getItem('isDatafetched')) {
        let movie = new Movie();
        let movieList = movie.fetchMovieList();
        document.getElementById('card_container').innerHTML = movieList;
    } else {
        var movieDataList = [
            {
                id: 1,
                title: 'Asuran',
                language: 'Tamil',
                bannerUrl: './Icons/asuran.jpg',
                releaseDate: '2018-07-22',
                rating: 0
            },
            {
                id: 3,
                title: 'Tenet',
                language: 'English',
                bannerUrl: './Icons/tenet.jpg',
                releaseDate: '2019-09-20',
                rating: 0
            },
            {
                id: 4,
                title: 'Shershaah',
                language: 'Hindi',
                bannerUrl: './Icons/shershah.jpg',
                releaseDate: '2021-08-02',
                rating: 0
            },
            {
                id: 2,
                title: 'Malik',
                language: 'Malayalam',
                bannerUrl: './Icons/malik.jpg',
                releaseDate: '2021-07-08',
                rating: 0
            },
        ]
        localStorage.setItem('isDatafetched', true)
        localStorage.setItem('movieList', JSON.stringify(movieDataList))
        let movie = new Movie();
        let movieList = movie.fetchMovieList();
        document.getElementById('card_container').innerHTML = movieList;
    }
}

class Movie {
    fetchMovieList() {
        var rating_container_class = ''
        let fetchMovieList = JSON.parse(localStorage.getItem('movieList'))
        let movieList = ''
        fetchMovieList.forEach((data) => {
            rating_container_class = `rating_container_${data.id}`
            movieList += (
                ` <div class="movie_card">
                <div  style="background: url(${data.bannerUrl})" class="movie_banner_holder"></div>
                <p class="language_text"> ${data.language}</p>
                <div class="movie_details">
                    <p>Title : ${data.title}</p>
                    <p>Release Date : ${data.releaseDate.split("-").reverse().join('-')}</p>
                </div>
                <div class="rating_container  ${rating_container_class}">
                    <label  class="${data.rating >= 1 ? 'rated' : 'check'}"><input type="checkbox" checked={${data.rating >= 1 ? true : false}} id="r1" onchange="ratingStar(event,'${rating_container_class}','${data.id}','${data.rating}')" /></label>
                    <label  class="${data.rating >= 2 ? 'rated' : 'check'}"><input type="checkbox" checked={${data.rating >= 2 ? true : false}} id="r2" onchange="ratingStar(event,'${rating_container_class}','${data.id}','${data.rating}')" /></label>
                    <label  class="${data.rating >= 3 ? 'rated' : 'check'}"><input type="checkbox" checked={${data.rating >= 3 ? true : false}} id="r3" onchange="ratingStar(event,'${rating_container_class}','${data.id}','${data.rating}')" /></label>
                    <label  class="${data.rating >= 4 ? 'rated' : 'check'}"><input type="checkbox" checked={${data.rating >= 4 ? true : false}} id="r4" onchange="ratingStar(event,'${rating_container_class}','${data.id}','${data.rating}')" /></label>
                    <label  class="${data.rating >= 5 ? 'rated' : 'check'}"><input type="checkbox"  checked={${data.rating >= 5 ? true : false}} id="r5" onchange="ratingStar(event,'${rating_container_class}','${data.id}','${data.rating}')" /></label>
                </div>
                <div class="action_button_container">
                    <button class="edit_movie_btn" onclick='editMovie(${data.id},"${data.bannerUrl}","${data.rating}")'>
                        Edit
                </button>
                    <button class="remove_movie_btn" onclick='removeMovie(${data.id})'>
                        Remove
                </button>
                </div>
            </div>`
            )
        })
        return movieList
    }
}

class AddMovie {
    constructor(title, language, bannerUrl, releaseDate) {
        this.title = title;
        this.language = language;
        this.bannerUrl = bannerUrl;
        this.rating = selectedMovieRating || 0;
        this.releaseDate = releaseDate;
        this.id = localStorage.getItem('movieList') ? JSON.parse(localStorage.getItem('movieList')).length + 1 : 1;
    }

}

function buildMovieList() {
    let movie = new Movie();
    let movieListData = movie.fetchMovieList();
    document.getElementById('card_container').innerHTML = movieListData;
}

class DataStore {
    addMovieToLS(obj) {
        let movieList = localStorage.getItem('movieList') ? [...JSON.parse(localStorage.getItem('movieList'))] : [];
        if (selectedMovieId) {
            let objIndex = movieList.findIndex((obj => obj.id == selectedMovieId));
            movieList[objIndex] = obj
        } else {
            movieList.push(obj)
        }

        localStorage.setItem('movieList', JSON.stringify(movieList))
        buildMovieList()
    }

    removeMovieFromLS(id) {
        let movieList = JSON.parse(localStorage.getItem('movieList'))
        let movieList1 = movieList.filter(data => {
            return data.id != id
        })
        localStorage.setItem('movieList', JSON.stringify(movieList1))
        buildMovieList()
    }

}

function changeBannerImage() {
    document.getElementById('banner_image_change').style.display = 'inline';
    document.getElementById('imageUrl').style.display = 'block';
    document.getElementById('banner_image_name').style.display = 'none';
}

function removeMovie(id) {
    let dataStore = new DataStore();
    dataStore.removeMovieFromLS(id)
}

function editMovie(id, bannerUrl, rating) {
    selectedMovieImage = bannerUrl;
    selectedMovieId = id;
    selectedMovieRating = rating;
    openModal()
    let movieList = JSON.parse(localStorage.getItem('movieList'))
    let selectedMovie = movieList.filter(data => data.id == id);
    selectedMovie = selectedMovie[0]
    document.getElementById('title').value = selectedMovie.title;
    document.getElementById('release_date').value = selectedMovie.releaseDate;
    document.getElementById('language').value = selectedMovie.language;
    document.getElementById('banner_image_name').innerHTML = selectedMovie.bannerUrl;
    document.getElementById('banner_image_change').style.display = 'inline'
    document.getElementById('banner_image_name').style.display = 'block'
    document.getElementById('imageUrl').style.display = 'none'
}



function readURL() {
    var files = document.getElementById('imageUrl').files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        tempImageUrl = e.target.result
    };
    reader.readAsDataURL(files);
}


async function addMovie() {
    var title = document.getElementById('title').value;
    let releaseDate = document.getElementById('release_date').value;
    var language = document.getElementById('language').value;
    tempImageUrl = tempImageUrl || selectedMovieImage;
    let addMovie = new AddMovie(title, language, tempImageUrl, releaseDate);
    let addtoLs = new DataStore()
    addtoLs.addMovieToLS(addMovie)
    closeModal()
}







