// FMK Script

// JSON Data
var obj = JSON.parse('{ "1": "Agata Bobrowska", "2": "Agata Gałus", "3": "Agata Latacz", "4": "Agnieszka Pałczak", "5": "Aleksandra Michalik", "6": "Aleksandra Werkowska", "7": "Aneta Orlik", "8": "Anna Musiałkiewicz", "9": "Anna Schmidt", "10": "Ela Chmielarz", "11": "Gabriela Szkudlarek", "12": "Jagoda Wierzbińska", "13": "Joanna Pietrzyk", "14": "Julia Gębska", "15": "Julia Szymańska", "16": "Julia Tatarynowicz", "17": "Karolina Kwiecień", "18": "Kinga Foksińska", "19": "Kinga Krawczyk", "20": "Magdalena Odziemek", "21": "Magdalena Strent", "22": "Magdalena Strojek", "23": "Malwina Bytner", "24": "Martyna Adamczyk", "25": "Martyna Czuczwara", "26": "Natalia Czyżyk", "27": "Natalia Szymanek", "28": "Ula Kulon", "29": "Weronika Jagiełowicz", "30": "Weronika Moździerz", "31": "Weronika Najda", "32": "Zoriana Szumada", "33": "Zuzanna Warchoł" }')

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
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]]
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
    document.getElementById("first").innerHTML = random1
    document.getElementById("second").innerHTML = random2
    document.getElementById("third").innerHTML = random3
}

function click(pos) {
    
    // console.log("clicked") // uncomment for debugging

    if (mode == 0) {
        mode = 1
        lastClicked = pos
        Overlays[pos].style.visibility = "visible"
        animateCSS(Icons[pos], "heartBeat")
        for (var i=0; i<3; i++) {
            if (i!=pos) {
                Overlays[i].style.backgroundColor = "rgba(252, 15, 192, 0.4)"
                Icons[i].src="icons/marry.svg"
            }
            
        }

    } else if (mode == 1) {
        if (pos == lastClicked){
            return
        }
        mode = 2
        _lastClicked = pos
        
        Overlays[pos].style.visibility = "visible"
        animateCSS(Icons[pos], "heartBeat")
        for (var i=0; i<3; i++) {
            if (i!=pos && i!=lastClicked) {
                Overlays[i].style.backgroundColor = "rgba(27, 27, 27, 0.4)"
                Icons[i].src="icons/kill.svg"
            }
            
        }


    } else {
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// animate.css function
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

window.onload = change()