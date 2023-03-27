(function() {
    const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '')
    if (typeof numberOfFilms === "number"){
        const personalMovieDB = {
            count: numberOfFilms,
            movies: {},
            actors: {},
            genres: [],
            privat: false
        }
        for (let i = 0; i < 2; i++) {
            const a = prompt('Один из последних просмотренных фильмов?', ''),
                b = prompt('На сколько его оцените?');
            if (a !== null && b !== null && a !== '' && b !== '' && a.length < 50 && b.length < 50) {
                personalMovieDB.movies[a] = b
            } else {
                i--;
            }
        }
        if (personalMovieDB.count < 10) {
            console.log('Просмотрено довольно мало фильмов')
        }
        if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
            console.log('Вы классический зритель')
        }
        if (personalMovieDB.count > 30) {
            console.log('Вы киноман')
        }
        console.log(personalMovieDB)
    } else {
        console.log('error')
    }

})()

