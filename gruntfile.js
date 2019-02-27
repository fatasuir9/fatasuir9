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
		view: 'public/views',
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
				dest: '<%= distDir.view %>',
				ext: '.php'
			}]
		}
	},

	// Task no. 2: HTMLmin
	htmlmin:{
		dist: {
			options: {
				removeComments: true,
				collapseWhitespace: true
			},
			files: {
				'<%= distDir.base %>/index.php': '<%= distDir.view %>/index.php',
				'<%= distDir.base %>/404.php': '<%= distDir.view %>/404.php',
				'<%= distDir.base %>/about/index.php': '<%= distDir.view %>/about/index.php',
				'<%= distDir.base %>/projects/index.php': '<%= distDir.view %>/projects/index.php',
				'<%= distDir.base %>/projects/grypp/index.php': '<%= distDir.view %>/projects/grypp/index.php',
				'<%= distDir.base %>/projects/isight/index.php': '<%= distDir.view %>/projects/isight/index.php',
				'<%= distDir.base %>/talks/index.php': '<%= distDir.view %>/talks/index.php',
				'<%= distDir.base %>/talks/interaction-design/index.php': '<%= distDir.view %>/talks/interaction-design/index.php',
				'<%= distDir.base %>/talks/task-analysis/index.php': '<%= distDir.view %>/talks/task-analysis/index.php',
				'<%= distDir.base %>/talks/css-architecture/index.php': '<%= distDir.view %>/talks/css-architecture/index.php',
				'<%= distDir.base %>/talks/task-runners/index.php': '<%= distDir.view %>/talks/task-runners/index.php',
				'<%= distDir.base %>/recognition/index.php': '<%= distDir.view %>/recognition/index.php',
				'<%= distDir.base %>/testimonials/index.php': '<%= distDir.view %>/testimonials/index.php',
				'<%= distDir.base %>/contact/index.php': '<%= distDir.view %>/contact/index.php',
			}
		},
	},

    // Task no. 3: Sass
    sass:{
        options:{
            style: 'compressed', // Sass file style
            noCache: false, // Disable the noCache
            cacheLocation: 'temp/sass', // Cached sass location
            update: true // Only compile changed files
        },
        dist:{
            files:[{
                expand: true,
                cwd: '<%= srcDir.sass %>',
                src: '**/*.{sass,scss}',
                dest: '<%= distDir.css %>',
                ext:'.css'
            }]
        },
    },

    // Task no. 4: Uglify
    uglify:{
        options:{
	        mangle: false, // Avoid functions - variables rename
	        preserveComments: /(?:^!|@(?:license|preserve|cc_on))/
			// Preserve all comments that start with a bang (!)
			// https://github.com/gruntjs/grunt-contrib-uglify/issues/366
    	},
	    dist:{
	        files:[{
	            '<%= distDir.js %>/script.min.js':[
					'<%= srcDir.js %>/libs/jquery-2.1.3.min.js',
					'<%= srcDir.js %>/libs/offside.js',
					'<%= srcDir.js %>/script.js'
            	],
        	}]
    	},
    },

	// Task no. 5: Copy
    copy:{
        main:{
			files:[{
				expand: true,
				cwd: '<%= srcDir.font %>',
				src: '**',
				dest: '<%= distDir.font %>'
			}]
        },
    },

    // Task no. 6: Image
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

    // Task no. 7: Watch
    watch:{
        options:{
            spawn: false,
            livereload: true
        },
		jade: {
			files: '<%= srcDir.jade %>/**/*.jade',
			tasks: ['jade', 'htmlmin']
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

    // Task no. 8: Pagespeed
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
    grunt.registerTask('build',['jade', 'htmlmin', 'sass', 'uglify', 'copy', 'image']);

    //Default
    grunt.registerTask('default',['watch']);

    // Depenent plugins
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-image');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-pagespeed');

};
