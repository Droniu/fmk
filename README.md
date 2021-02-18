# F#ck marry kill web app

_Version 0.3 alpha_

The game is pretty simple, there is no backend. You need a JSON with names and couple of photos. 

This is how the JSON should look like:
```javascript
[
  {
    "name": "Test Person 1",
    "photo": "/photos/1.jpg"
  },
  {
    "name": "Test Person 2",
    "photo": "/photos/2.jpg"
  },
  {
    "name": "Test Person 3",
    "photo": "/photos/3.jpg"
  }
]
```
*You need at least 3 people for it to work*. The more people you have there, the better. JavaScript gets 3 random people from the json and it shows them in the html file.

Then, you click on the person you want to f#ck, then marry, then kill. When the kill animation ends, another 3 people are chosen randomly and shown on screen. The game lasts forever.

Used fonts:
Montserrat-Bold (header)
Montserrat-ExtraLight (people captions)

Used libraries:
[Animate.css](https://animate.style/)
