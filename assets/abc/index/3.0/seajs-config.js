/**
 * seajs config
 */
(function(){

    seajs.config({
        base: '/assets',
        alias: {
            '$': 'gallery/jquery/1.10.2/jquery',
            '$-debug' : 'gallery/jquery/1.10.2/jquery-debug',
			'jquery'  : 'gallery/jquery/1.10.2/jquery',
            'jquery-debug' : 'gallery/jquery/1.10.2/jquery-debug',
			'artTemplate'  : 'gallery/artTemplate/2.0.2/artTemplate',

            '_': 'gallery/underscore/1.4.3/underscore',
            'underscore': 'gallery/underscore/1.4.3/underscore',

            'backbone': 'gallery/backbone/0.9.10/backbone',
            'backbone-debug': 'gallery/backbone/0.9.10/backbone-debug'

            //'abc': 'apps/abc'
        },

        //map: mapRules,
        preload: [
          //'libs/seajs/2.0.0/plugin-style',
          //'libs/seajs/2.0.0/plugin-text'
        ]
    });


})();