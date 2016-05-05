module.exports = function(grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({

    // Directories
    srcDir:{
        base: 'build',

        // Source build directory: Global
		jade: 'build/jade',
        sass: 'build/sass',
        js: 'build/js',
        image: 'build/images',
        font: 'build/fonts',
    },

    distDir:{
        base: 'public',

        // Destination public directory: Global
        css: 'public/css',
        js: 'public/js',
        image: 'public/images',
        font: 'public/fonts',
    },

    // Tasks & Configurations

	// Task no. 1: Jade
	jade: {
		compile: {
			options: {
				basedir: '<%= srcDir.jade %>',
				pretty: true,
				compileDebug: true,
				wrap: false
			},
			files: [{
				expand: true,
				cwd: '<%= srcDir.jade %>',
				src: ['**/*.jade'],
				dest: '<%= distDir.base %>',
				ext: '.php'
			}]
		}
    },

    // Task no. 2: Sass
    sass:{
        options:{
            style: 'compressed', // Sass file style
            noCache: false, // Disable the noCache
            cacheLocation: 'temp/sass', // Cached sass location
            update: true // Only compile changed files
        },
        dest:{
            files:[{
                expand: true,
                cwd: '<%= srcDir.sass %>',
                src: '**/*.{sass,scss}',
                dest: '<%= distDir.css %>',
                ext:'.css'
            }]
        },
    },

    // Task no. 3: Uglify
    uglify:{
        options:{
	        mangle: false, // Avoid functions - variables rename
	        preserveComments: 'some' // Preserve all comments that start with a bang (!)
    	},
	    dest:{
	        files:[{
	            '<%= distDir.js %>/script.min.js':[
	                '<%= srcDir.js %>/libs/jquery-1.11.3.min.js',
	                '<%= srcDir.js %>/script.js'
            	],
        	}]
    	},
    },

    // Task no. 4: Image
    image:{
        dynamic:{
            files:[{
                expand: true,
                cwd: '<%= srcDir.image %>',
                src: ['**/*.{png,jpg,gif,svg}'],
                dest: '<%= distDir.image %>'
            }]
        },
    },

    // Task no. 5: Watch
    watch:{
        options:{
            spawn: false,
            livereload: true
        },
		jade: {
			files: '<%= srcDir.jade %>/**/*.jade',
			tasks: ['jade']
		},
		sass: {
			files: '<%= srcDir.sass %>/**/*.{scss,sass}',
			tasks: ['sass']
		},
		js: {
			files: '<%= distDir.js %>/script.js',
			tasks: ['uglify']
		},
    },

    // Task no. 6: Pagespeed
    pagespeed:{
        options:{
            nokey: true,
            url: "https://developers.google.com"
        },
        desktop:{
            url: "https://developers.google.com/speed/docs/insights/v1/getting_started",
            locale: "en_GB",
            strategy: "desktop",
            threshold: 80
        },
        mobile:{
            url: "https://developers.google.com/speed/docs/insights/v1/getting_started",
            locale: "en_GB",
            strategy: "mobile",
            threshold: 80
        }
    }

    });

    // Combined Tasks

    // Deployment
    grunt.registerTask('deploy',['jade', 'sass', 'uglify', 'image', 'pagespeed']);

    //Default
    grunt.registerTask('default',['watch']);

    // Depenent plugins
	grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-image');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-pagespeed');

};
