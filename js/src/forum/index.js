import app from 'flarum/forum/app';
import { extend, override } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
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
                        m(
                            'div',
                            { className: 'f front' },
                            m(
                                'div',
                                { className: 'movie', id: 'moviePoster' },
                            )
                        ),
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
    extend(DiscussionHero.prototype, 'oncreate' , function () {
        const discTitleMovie = this.attrs.discussion.title();

        $.ajax({
          url: 'https://www.omdbapi.com/?apikey=f4e09aec&&t=' + discTitleMovie,
          type: 'GET',
          crossDomain: true,
          dataType: 'jsonp',
          success: function(data) {
            if (data.Response == 'False') {
              return;
            } else {
              showMovie(data);
            }
          }
        });
      });

      function showMovie(movie) {
        const movieHtml = {
          title: `<h1 class="movieTitleHero" id="title">${movie.Title} (${movie.Year})</h1>`,
          poster: `<img id="poster" src="${movie.Poster}"/>`,
          plot: `<p id="plot">${movie.Plot} <span id="mpaa">Rated ${movie.Rated}.<span></p>`,
          imdbRating: `<div id="imdb">Rated on ImdB:<i class="fa fa-imdb" aria-hidden="true"></i>${movie.imdbRating}</div>`,
        };
        let detailsHtml = movieHtml.title + movieHtml.imdbRating + movieHtml.plot;
        $('#moviePoster').html(movieHtml.poster);
        $('#movieDetails').html(detailsHtml);
      }

      function toggleDetails() {
        $('.flip-container').toggleClass('active');
    }
});
