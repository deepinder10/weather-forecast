## Notes
### Date
19 March 2021
### Location of deployed application
https://kind-newton-f55409.netlify.app/
### Time spent
3
### Assumptions made
I have made the assumptions that either the location would be fetched with geolocation API or manually entered in the input box. 
In case of any error in geolocation API, the default location would be set to Vancouver.
### Shortcuts/Compromises made
When clicking on detail of card, i have sliced the results of hourly data to 5 to fit the view better when expanded.
### Stretch goals attempted
I tried to go little over the normal and implemented Context API along with useReducer hook for triggering events and passing down the props
and handle dispatch events and wrote a hook for geolocation based fetching. I have followed CSS modules and SCSS with BEM methodology.
### Instructions to run assignment locally
npm install
npm start
### What did you not include in your solution that you want us to know about?
I have not properly implemented the checks to prevent multiple hits at the first load, when geolocation lat long converts to city name
from the open weather API and the useEffect gets triggered as the city name is set for first time.
### Other information about your submission that you feel it's important that we know if applicable.
I have kept the components in src/components and one weather container that holds it in src/container and utils, hooks and context folder for their respective usages.
App starts from App.js, which loads the Weather container which in turn loads the components.
### Your feedback on this technical challenge
I think this is a good challenge, a little more expection about the challenge, that you are expecting from this or some kind of a UI screenshot
which gives a little brief about what things i should implement can help.