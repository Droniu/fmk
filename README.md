# F#ck marry kill web app

_Version 1.2 beta_

The game is pretty simple, there is no backend. You need a JSON with names and couple of photos. 

Due to the fact this is client-side only we need to have data hardcoded. It is done in `data.js` file.

This is how the `data.js` should look like:
```javascript
data = `
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
]`
```
*You need at least 3 people for it to work*. The more people you have there, the better. JavaScript gets 3 random people from the json and it shows them in the html file.

Then, you click on the person you want to f#ck, then marry, then kill. When the kill animation ends, another 3 people are chosen randomly and shown on screen. The game lasts forever.

What's new:
* seperation of html and css
* photos are now visible
* icons animate on click

Things to do:
* Change kill icon (make path thinner, so that it matches f#ck and marry icons)
* Two gamemodes based on gender
* Mobile improvements
⋅⋅* Either do horizontal layout (probably preferred), or extend the photo divs to the bottom). Anyhow think about mobile UI.
⋅⋅* :hover stays on last clicked (touched) person, so after generation of a new set of three people one of them is highlighted in green. Needs to be fixed.


Used fonts:
Montserrat-Bold (header)
Montserrat-ExtraLight (people captions)

Used libraries:
[Animate.css](https://animate.style/)
