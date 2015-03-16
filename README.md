Flexis FrontEnd
===============

Development
-----------


### Prerequisites

1. Install NodeJS.
2. Install project dependencies:

		npm install


### Running locally

To run locally for development (from filesystem):

1. (Start the backend.) - No backend required for this sample app.
2. Start the frontend:

		npm start

3. Point your browser at [http://localhost:9080/js-app-sample/](http://localhost:9080/js-app-sample/).


### Building for production 

#### Setup

To setup build:

1. Create config/production.json and set the properties based on your environment:

		cp config/template.json config/production.json
		vi config/production.json

#### Build

To build for production:

1. Execute grunt build script:

		npm run build

The production build is created in the target/build/ directory.

#### Deploy

To deploy to production environment:

1. Execute grunt deploy script:

		npm run deploy
