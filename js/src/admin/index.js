import app from 'flarum/admin/app';


app.initializers.add('justoverclock/imdb-api', () => {
  app.extensionData
    .for('justoverclock-imdb-api')
    .registerSetting({
      setting: 'justoverclock-imdb-api.apiKey',
      name: 'justoverclock-imdb-api.apiKey',
      type: 'URL',
      label: app.translator.trans('justoverclock-imdb-api.admin.apiKeyTitle'),
      help: app.translator.trans('justoverclock-imdb-api.admin.apiKeyTitle-help'),
    })
});
