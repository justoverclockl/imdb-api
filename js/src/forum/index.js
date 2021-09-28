import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import DiscussionHero from 'flarum/forum/components/DiscussionHero';

app.initializers.add('justoverclock/imdb-api', () => {
    extend(DiscussionHero.prototype, 'items', function (items) {
        items.add(
            'movie search',
            m('div', { className: 'wrapper' }, [
                m(
                    'div',
                    { className: 'flip-container', onclick: 'toggleDetails()' },
                    m('div', { className: 'flipper' }, [
                        m('div', { className: 'f front' }, m('div', { className: 'movie', id: 'moviePoster' })),
                        m(
                            'div',
                            { className: 'f back' },
                            m('div', { className: 'movie', id: 'movieDetails' }, m('div', { className: 'instructions' }))
                        ),
                    ])
                ),
            ])
        );
    });
    extend(DiscussionHero.prototype, 'oncreate', function () {
        const discTitleMovie = this.attrs.discussion.title();
        const imdbApiKey = app.forum.attribute('justoverclock-imdb-api.imdbKey');

        $.ajax({
            url: 'https://www.omdbapi.com/?apikey=' + imdbApiKey + '&&t=' + discTitleMovie,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function (data) {
                if (data.Response === 'False') {
                    return;
                } else {
                    showMovie(data);
                }
            },
        });
    });

    function showMovie(movie) {
        const movieHtml = {
            title: `<h1 class="movieTitleHero" id="title">${movie.Title} (${movie.Year})</h1>`,
            poster: `<img class="movieImage" title="${movie.Title}" alt="${movie.Title}" id="poster" src="${movie.Poster}"/>`,
            plot: `<p class="movieDescription" id="plot">${movie.Plot}
                     <span>
                       <a id="imdbLink" rel="nofollow" title=${movie.Title} href="http://www.imdb.com/title/${movie.imdbID}/" target="_blank">
                        <i class="fas fa-link linktoimdb"></i>${app.translator.trans('justoverclock-imdb-api.forum.fullinfoAt')}
                       </a>
                     </span>
                   </p>`,
            imdbRating: `<div class="ratedOnImdb" id="imdb">${app.translator.trans('justoverclock-imdb-api.forum.rateonimdb')}:
                            <i class="fas fa-star-half-alt movierated"></i>${movie.imdbRating}</div>`,
        };
        let detailsHtml = movieHtml.title + movieHtml.imdbRating + movieHtml.plot;
        $('#moviePoster').html(movieHtml.poster);
        $('#movieDetails').html(detailsHtml);
    }
});
