## Todo
v16.5.0

- [ ] Naprawić Online users
- [x] Wyświetlić w liscie taski oraz ilość userów online 
- [x] Dodać metody dla inkrementacji i dekrementacji licznby userów dla poszczególnych tasków
- [x] Wykonac metody i strukturę według https://www.digitalocean.com/community/tutorials/angular-socket-io
- [x] analiza server.js oraz tutoriala i przygotowanie serwisów według niego , https://www.digitalocean.com/community/tutorials/angular-socket-io
- [x] dla 5 min, 30 min 1godziny, jednego dnia



## Przerabiam
### authenticate with firebase
https://codesource.io/firebase-authentication-in-angular-using-angularfire/

### podobne
https://www.positronx.io/full-angular-7-firebase-authentication-system/
https://www.positronx.io/angular-firebase-google-login-auth-system-tutorial/
https://www.remotestack.io/angular-firebase-authentication-example-tutorial/
https://auth0.com/blog/complete-guide-to-angular-user-authentication/
https://fireship.io/lessons/angularfire-google-oauth/

### Sockets
- [x] https://www.youtube.com/watch?v=lv0QX0jwrTI&t=0s&ab_channel=ShubhamGupta
- [x[ https://www.youtube.com/watch?v=n7OKfVwClE4&t=33s&ab_channel=TutorialEdge
- [x] https://tutorialedge.net/typescript/angular/angular-socket-io-tutorial/
https://www.digitalocean.com/community/tutorials/angular-socket-io
https://deepinder.me/creating-a-real-time-app-with-angular-8-and-socket-io-with-nodejs
https://medium.com/@deguzmanbrianfrancis/setting-up-and-creating-a-chat-app-with-angular-socket-io-3-0-and-express-70c69b8031f6
https://codingblast.com/chat-application-angular-socket-io/
https://www.ultimateakash.com/blog-details/IixDYGAKYAo=/How-to-Integrate-Socket.IO-with-Angular-2021


[Chart socket.io](https://www.youtube.com/watch?v=MCYIQXeoU30) 


## Templates Bulma
https://cssninjastudio.github.io/krypton/roadmap.html
https://bulmatemplates.github.io/bulma-templates/
https://colorlib.com/wp/free-angular-templates/

### Login
https://firebase.google.com/docs/auth/web/manage-users
https://awesomeopensource.com/project/aldi/awesome-bulma-templates
https://www.positronx.io/full-angular-7-firebase-authentication-system/
https://stackoverflow.com/questions/62359139/angular9-check-if-firebase-user-is-currently-logged-in
https://fireship.io/snippets/check-if-current-user-exists-with-angularfire/

# Notes

The package-lock.json SHOULD NOT be added to .gitignore. Instead, I strongly advise:

Add the package-lock.json you to your version control repository
Use npm ci instead of npm install when building your application both locally and in your deployment pipeline.
(The ci command is available since npm@5.7, if in doubt upgrade your npm via:
wykonac prrzyciski

## socket.io

### io vs socket

io będzie emitowało do wszystkich a socket do bierzącego połączenia

    io.emit("documents", Object.keys(documents));
    socket.emit("document", doc);

Note the difference between socket.emit() and io.emit() - the socket version is for emitting back to only initiating the client, the io version is for emitting to everyone connected to our server.




