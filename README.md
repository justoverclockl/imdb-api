# Imdb Api - Movie Database

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/justoverclock/imdb-api.svg)](https://packagist.org/packages/justoverclock/imdb-api) [![Total Downloads](https://img.shields.io/packagist/dt/justoverclock/imdb-api.svg)](https://packagist.org/packages/justoverclock/imdb-api)

A [Flarum](http://flarum.org) extension. Integrate Flarum with Imdb api to get movie information inside the posts

![p0ZIjuq0Iv](https://user-images.githubusercontent.com/79002016/135063798-fd7a0680-0ef7-4106-ac43-eba46f3141f4.gif)


## Usage

 - Get your FREE api key on http://www.omdbapi.com/apikey.aspx. 
 - After that omdb will send an email with your apikey in URL format (example: "https://www.omdbapi.com/?apikey=f500aj11").
 - Now simply copy your apikey (that is "f500aj11") and paste it into extension settings.
 - done!

## How it works

To get movie details, simply start a new discussion with the movie title (only that, for example "matrix reloaded"), and this extension will automatically shows the details in the discussion hero. Due to limit the api calls, this extension shows detail ONLY FOR REGISTERED USERS.

## Upcoming Feautures
 - Automatic translation of movie title and description based on user language
 - Restrict api calls to a specifi tag (e.g. display movie info only in "Movie" tag)

## Installation

Install with composer:

```sh
composer require justoverclock/imdb-api:"*"
```

## Updating

```sh
composer update justoverclock/imdb-api:"*"
php flarum cache:clear
```


