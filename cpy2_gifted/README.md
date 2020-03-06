#GIF'ted

App to search your GIF. Its built using React.js

## Features : 
- Search GIF with key strokes.
- Get your GIF in responsive card format.
- Play / Pause GIF.
- Search is debounced with a timer of 300ms. To prevent excessive call to api.
- Jest is used as test runner and Enzyme as testing framework for react components.
- API testing is done using fetch-mock, node-fetch and whatwg-fetch
- User can switch app theme DARK <-> LIGHT

##Overview :
Project is structured in following way :

```$xslt
README.md
package.json
yarn.lock
.gitignore
utils
    index.js
build
public
    favicon.ico
    index.html
src
    components
        card
            index.js
            Card.test.js
        cards
            index.js
            Cards.test.js
            styles.css
        header
            index.js
            Header.test.js
            styles.css
        search
            index.js
            Search.test.js
            styles.css
    containers
         AppComponent.js
         AppComponent.test.js
         style.css
    App.css
    App.js
    App.test.js
    index.js
    setupTests.js 
    AppConstants.js           
```

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.<br>
- Each component has its own index.js and style.css for styling.<br>
- Tests are written with *.test.js files<br>
- Responsiveness 
    - size < 640px one card per row.
    - size >= 640 and size <960 two cards per row.
    - size >= 960 4 cards per row.
- Accessible
    - Search using keystroke rather than using button click.    
- Application is quite modular with header in `header` and all contents in `content` both being called from `AppComponent`<br>
- `search` contains search text and GIF fetch api will be triggered with keystrokes debounced at timeout of 300ms.
- Debounce is used to prevent api calls even if user has not finished his keyword.
- `cards` contain list of all the gifs received as part of API response.
- `card` contain individual gif, which can be played and paused using triangular icon provided
- `AppConstants` contain constants which can be used through out application.
- Implement Light/Dark theme
    - Using `data-theme` attribute of HTML tag.
    - It contains color variable which is being used throught app to set theme.
    - A toggle switch in `header` is used to set the value for `data-theme`.  
  
## Available Scripts

In the project directory, you can run:

### `yarn install`

 Install node modules / dependencies listed in package.json. As shared zip won't contain node_modules.
 
### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Just place this build folder in root directory of your server.<br>
Your app is ready to be deployed!!

## Deployement :

Just place this build folder created above in root directory of your server.<br>
#####Example deployement :
 - Using below code create a express server.
 - Place build folder in root directory of your server and start server.
 - Access app on  [http://localhost:9000](http://localhost:9000)
```$xslt
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(9000);
```
