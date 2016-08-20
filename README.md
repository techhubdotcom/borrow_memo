##Project details:


Structure:

```
- app  				// The target of the apilication
	- libs			// All libraries needed to run the application
	- scripts	    // Working version of js files
	- styles		// Files scss converted into css
	- views			// Templates html
	index.html 		// The main page
- assets 			// SCSS files
	- _scss
- .gitignore
- bower_components  // Libraries instaled via Bower
- node_modules		// Libraries instaled via npm
- gulpfile.js		// Gulpfile instruction
- package.json		// Package file with installation references
- bower.js			// File bower with installation references
- README.md

```

Main technologies used in the project:

* JavaScript
* Angular
* Angular-route
* ndDialog
* Gulp
* NPM
* Bower

Information about the project:

The public part of the project is located in the ```app``` folder. It contains all necessary files and libraries to run the application. It doesn't require the installation of the dependencies, but it's possible to recover 'node_modules' (for  example to can use them in development mode) using NPM and running:```npm update```
Also there is possible to recover 'bower_componets' using ```bower update```

Files with styles were created using scss and the conversion was made by Gulp task.

##Running of the app:
Please change in the file with properties (Properties.js), the value of the ```FIREBASE_CONFIG``` according to the deatails sent in the email.

Then it'll be possible to run the application:

- running 'index.html'

In development mode:

Please also update libraries:
```bower update``` and ```npm update```


Some Gulp tasks were created in order to simplify the creation of the project:
gulp styles - converts scss files into css;

gulp copy - copies interesting us .js files from node_modules and bower_componets into app/libs; if someone would like to add some new library there is necessary to update paths in the file gulpfile.js;

gulp_css - copies interesting us files .css from node_modules and bower_componets to the app/styles;

gulp watch - detects any change made in the files .scss and automatically converts them into .css and copies them to app/styles/css



##Functionality

The project allows users to login using an email and a password. In order not to permit every person to log into the application, there was used the emails/password authorization using Firebease. This option allows us to configure inside the Firebase the list of emails which have an access into the application. The Google Auth using the Firebase SDK would give an access to every person with Google account.


The main page presents the part which allows create a new borrowed item and the table with borrowed things. I divided the data into two parts first shows only borrowed and not returned things (link 'borrowed'). Second - items already returned (link 'Returned').

There is an option to change the location using links presented on the website or by url:```<path>#/madrid```

There is also an option to change the state of the items from borrowed to returend.