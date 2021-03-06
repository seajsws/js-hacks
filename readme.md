# SeaJSWS Workshop - June 13, 2017

## Many thanks to our sponsor, [Dev Bootcamp!](https://www.devbootcamp.com)

### Instructions
* **You will need to have nodejs installed, don't hesitate to ask for help** *
1. Clone the repo, and `cd` into it
2. Run `npm i` - this will install Express so you can run the app locally
3. You are encouraged to install **nodemon** using npm :arrow_right: `npm i -g nodemon`,
    which will live-reload your application as you make changes
  * If you do 3. then you can just type `npm start` to run the server. Changes to static files (html, css, js) will be re-sent by the server automatically, but you will have to manually refresh your browser to see changes.
  * Otherwise, type `node server.js` (you'll have to manually stop and restart the server to show changes, in addition to refreshing the browser :sob:.)
4. Visit `localhost:3000` in your browser (make sure you aren't already using that port for something else - if the page fails to load, change the port assignment on line 4 of `server.js`.)
   This project uses Bootstrap 4 and jQuery 3, cdn links are already included
    in index.html
   You can add additional routes in `lib/routes.js` if you are so inclined
  
BONUS:
- [ ] Add additional routes to lib/routes.js
- [ ] Make the docFragger and dataLogger utility functions more robust and versatile
- [ ] * Install and run [ngrok](https://ngrok.com/) so you can visit and test your app on a public IP! (disclaimer: seajsws assumes no responsibility for the security of said app.)
- [ ] ** Secure said publicly-exposed app using ngrok!! (* I've read this can be done *).

> Hope you enjoy and **WIN FOREVER!** :neckbeard::boom::metal::fire::triumph::dancer: