// FMK Script

// JSON Data
var obj = JSON.parse(data) //from data.js
console.log(obj)

// Determines the stage of game (0=F, 1=M, 2=K)
var mode = 0
// Determines which column was cliked previously (used in click function)
var lastClicked
var _lastClicked
var finished

// Necessary HTML elements for further manipulation
var Columns = document.getElementsByClassName("flex-item")
var Icons = document.getElementsByClassName("icon")
var Overlays = document.getElementsByClassName("overlay")

// Listeners for clicks
document.getElementById("col0").addEventListener("click", function() { click(0); } )
document.getElementById("col1").addEventListener("click", function() { click(1); } )
document.getElementById("col2").addEventListener("click", function() { click(2); } )

// Getting random person from JSON
function randomElement(obj) {
    var length = obj.length
    var randInt = Math.floor(Math.random() * length)
    console.log(randInt)
    return obj[randInt]
}

// Generates new set of 3 people 
function change() {
    var random1 = randomElement(obj)
    var random2 = randomElement(obj)
    var random3 = randomElement(obj)
    
    // Checking if people are unique, if not - generate another
    while (random2 == random1) {
        random2 = randomElement(obj)
    }

    while (random3 == random1 || random3 == random2) {
        random3 = randomElement(obj)
    }

    // change captions
    document.getElementById("first").innerHTML = random1.name
    document.getElementById("second").innerHTML = random2.name
    document.getElementById("third").innerHTML = random3.name

    Columns[0].style.backgroundImage = "url('" + random1.photo + "')"
    Columns[1].style.backgroundImage = "url('" + random2.photo + "')"
    Columns[2].style.backgroundImage = "url('" + random3.photo + "')"
    finished = false
    animateCSS(Columns[0], "zoomIn")
    animateCSS(Columns[1], "zoomIn")
    animateCSS(Columns[2], "zoomIn").then(() => {finished = true})
}
// This happens when a column is clicked. Parameter specifies which column was clicked.
function click(pos) {
    
    if (finished == false) return
    // console.log("clicked") // uncomment for debugging

    // Fuck state (initial)
    if (mode == 0) {
        mode = 1 // change to Marry Mode (for further clicks)
        lastClicked = pos // save which position was clicked
        // Normally, the overlay is visible only on hover. After click it is visible all the time
        Overlays[pos].style.visibility = "visible" 
        // UX click confirmation animation
        animateCSS(Icons[pos], "heartBeat")
        // change overlay BG color to marry mode
        for (var i=0; i<3; i++) {
            if (i!=pos) {
                Overlays[i].style.backgroundColor = "rgba(252, 15, 192, 0.4)"
                Icons[i].src="icons/marry.svg"
            }
            
        }

    } else if (mode == 1) {
        // blocks clicks on the same column
        if (pos == lastClicked){
            return
        }
        mode = 2
        _lastClicked = pos // save which position was clicked
        
        // same thing as in mode == 0
        Overlays[pos].style.visibility = "visible"
        animateCSS(Icons[pos], "heartBeat")
        for (var i=0; i<3; i++) {
            if (i!=pos && i!=lastClicked) {
                Overlays[i].style.backgroundColor = "rgba(27, 27, 27, 0.4)"
                Icons[i].src="icons/kill.svg"
            }
            
        }


    } else {
        // blocks clicks on the same column and when animation
        if (pos == lastClicked || pos == _lastClicked || finished == false){
            return
        }
        
        finished = false

        Overlays[pos].style.visibility = "visible"
        animateCSS(Icons[pos], "heartBeat").then(() => {
            change()   
            for (var i=0; i<3; i++) {
                Overlays[i].style.visibility = "hidden"
                Overlays[i].style.backgroundColor = "rgba(38, 166, 91, 0.4)"
                Icons[i].src="icons/fuck.svg"
            }
            mode = 0
            finished = true
        });
    }       
}


// animate.css function for adding and auto-removing animation classes
  const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = element;

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

// Initial 3 people generatio
window.onload = change()