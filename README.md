# F#ck marry kill web game

The game is pretty simple, instead of API response we use static JSON with names and couple of photos. 

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

Possible improvements:
* Change kill icon (make path thinner, so that it matches f#ck and marry icons)
* Two gamemodes based on gender
* Mobile improvements:
  * Either do horizontal layout (probably preferred), or extend the photo divs to the bottom. Anyhow think about mobile UI.
  * :hover stays on last clicked (touched) person, so after generation of a new set of three people one of them is highlighted in green. Needs to be fixed.


Used libraries:
[Animate.css](https://animate.style/)

<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
