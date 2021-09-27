import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';

app.initializers.add('justoverclock/imdb-api', () => {
    extend(CommentPost.prototype, 'footerItems', function (items) {
        items.add(
            'movie search',
            m('div', { className: 'wrapper' }, [
                m(
                    'form',
                    { className: 'form-inline', name: 'search-imdb' },
                    m('div', { className: 'form-group' }, [
                        m('input', { className: 'form-control', id: 'search', type: 'text', placeholder: 'Find movie title' }),
                        m('input', { className: 'btn btn-default', type: 'submit', value: 'Go!' }),
                    ])
                ),
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
                                m('div', { className: 'instructions' }, 'Search for a film and get back the most popular one')
                            )
                        ),
                        m(
                            'div',
                            { className: 'f back' },
                            m('div', { className: 'movie', id: 'movieDetails' }, m('div', { className: 'instructions' }, 'lets try it'))
                        ),
                    ])
                ),
            ])
        );
    });
    extend(CommentPost.prototype, 'oncreate' , function () {
      $('form[name="search-imdb"]').on('submit', function(e) {

        let movieTitle = $('input[id="search"]').val();

        e.preventDefault();
        $.ajax({
          url: 'https://www.omdbapi.com/?apikey=f4e09aec&&t=' + movieTitle,
          type: 'GET',
          crossDomain: true,
          dataType: 'jsonp',
          success: function(data) {
            if (data.Response == 'False') {
              alert('We can\'t seeem to find this movie. Please try again.');
            } else {
              showMovie(data);
            }
          }
        });
      });

      function showMovie(movie) {
        const movieHtml = {
          title: `<h1 id="title">${movie.Title} (${movie.Year})</h1>`,
          poster: `<img id="poster" src="${movie.Poster}"/>`,
          imdbRating: `<div id="imdb"><i class="fa fa-imdb" aria-hidden="true"></i>${movie.imdbRating}</div>`,
          plot: `<p id="plot">${movie.Plot} <span id="mpaa">Rated ${movie.Rated}.<span></p>`,
          imdbLink: `<a id="imdbLink" href="http://www.imdb.com/title/${movie.imdbID}/" target="_blank">See IMDb</a>`
        };
        let detailsHtml = movieHtml.title + movieHtml.imdbRating + movieHtml.plot + movieHtml.imdbLink;
        $('#moviePoster').html(movieHtml.poster);
        $('#movieDetails').html(detailsHtml);
      }

      function toggleDetails() {
        $('.flip-container').toggleClass('active');
      }
    });
});
