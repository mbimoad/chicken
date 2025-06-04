let realoffset = 160; 

if(window.innerWidth >= 0 && window.innerWidth <= 768) {
    realoffset = 140; 
} else if(window.innerWidth >= 769) {
    realoffset = 200; 
} else {
    realoffset = 160; 
}

// window.addEventListener('wheel', function (e) {
//     if (e.ctrlKey) {
//         e.preventDefault();
//     }
// }, { passive: false });

// window.addEventListener('keydown', function (e) {
//     if ((e.ctrlKey || e.metaKey) && 
//         (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
//         e.preventDefault();
//     }
// });

// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
// });

// document.addEventListener('keydown', function (e) {
//     if (e.key === 'F12' || 
//         (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') || 
//         (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') || 
//         (e.ctrlKey && e.key.toLowerCase() === 'u')) {
//         e.preventDefault();
//         e.stopPropagation();
//         console.log('Blocked!');
//         return false;
//     }
// });


// Sound
const jumpSound = document.getElementById('jump-sound'); 
const gameoverSound = document.getElementById('gameover-sound'); 
const backsoundSound = document.getElementById('backsound-sound'); 


function getStableRect(element) {
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        resolve({
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        });
      });
    });
  }


function getMultiplier() {
    let multipliers = [3.5, 7.2];
    let random = Math.floor(Math.random() * 3); // random value: 0, 1, or 2

    if (random === 0 || random === 1) {
        return `${multipliers[random]}`;
    } else {
        return "";
    }
}

// set different car with math.random
const wayof = () => {
    let mp = getMultiplier(); 
    let support = ""; 
    
    if (mp !== "") {
        support = `<span class="multiplier">${mp}x</span>`;
    }

    let random = Math.floor(Math.random() * 10) + 1;

    return `<div class="way">
                <div class="placer">
                    <img class="car" src="./assets/img/car${random}.webp">
                    <img class="pagar" src="./assets/img/pagar.webp" alt="">
                    <div class="coin">
                        <img src="./assets/img/coin_non2.webp" alt="">
                        ${support}
                    </div>
                </div>
            </div>`;
};


let curp = 0; 
let poin = 5; 
let incr = 0; 

// set window.innerwidth
let qtys = 15; 

if(window.innerWidth >= 2000) {
    qtys = 30; 
} 


const ways  = document.querySelector('.ways');
const taptomove  = document.querySelector('.taptomove');
const cta  = document.querySelector('.cta');

const closeov2 = document.querySelector('.closeov2');
const difficults = document.querySelector('.difficults');
const difficult = document.querySelector('.difficult');
const container = document.querySelector('.container');
const player_poin = document.querySelector('.player_poin');
let elemen = ""; 
for(let i=0; i<qtys; i++) elemen += wayof();  
ways.innerHTML = elemen;


const hideCTA = () => {
    cta.classList.add('hide');
    backsoundSound.play(); 
}

taptomove.addEventListener('click', function() {
    hideCTA();
})
cta.addEventListener('click', function() {
    hideCTA();
})


let playerlive = 0;
const overlay = document.querySelector('.overlay'); 
const liveplayer = document.querySelector('.liveplayer'); 
const overlay2 = document.querySelector('.overlay2'); 
const overlay3 = document.querySelector('.overlay3'); 
const player = document.querySelector('.player');
const playerHTML = player.outerHTML;
const myway = ways.firstElementChild; 


setInterval(() => {
    let count = Math.floor(Math.random() * 50) + 1;
    playerlive += count; 
    liveplayer.innerHTML = `${playerlive} Player`;
}, 2000);

let way = 0;
let initial = -100; 

const cars = document.querySelectorAll('.car');
const carSpeeds = new Map();


function goFullscreen() {
    if (!document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement) {
        // Not in fullscreen, enter fullscreen
        const elem = document.documentElement; // or use a specific element
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        // In fullscreen, exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}


function setCars(duration, isload) {
    cars.forEach((car, idx) => {
        if (!isload) {
            car.style.top = `${initial}%`;
        }
        const currentTop = parseFloat(car.style.top) || initial;
        carSpeeds.set(car, {
            top: currentTop,
            speed: duration + Math.random() * 0.3,
            active: true,
        });
    });
}



const difficultBtn = document.querySelectorAll('.difficult-btn button');
let temp = difficultBtn[0]; 
difficultBtn.forEach(item =>
    item.addEventListener('click', function () {
        if(temp) temp.classList.remove('active');

        let datalevel = item.dataset.level;
        let newSpeed;
        if (datalevel === "1") newSpeed = 0.5;
        else if (datalevel === "2") newSpeed = 1;
        else if (datalevel === "3") newSpeed = 1.5;
        else if (datalevel === "4") newSpeed = 2.5;
        temp = item;
        item.classList.add('active');


        cars.forEach(car => {
            let data = carSpeeds.get(car);
            data.speed = newSpeed + Math.random() * 0.3;
            carSpeeds.set(car, data);
        });
    })
);

function updateCars() {
    cars.forEach(car => {
        const data = carSpeeds.get(car);
        if (data.active) {
            data.top += data.speed;
            car.style.top = `${data.top}%`;
            const rect = car.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top > windowHeight) {
                car.style.transition = 'unset';
                data.top = initial;
            }
        }
    });
    requestAnimationFrame(updateCars);
}

setCars(0.5, false)
updateCars();





document.addEventListener('click', async function (e) {
    let element = e.target;
    if (element.classList.contains('player')) {
        
    }
});



let tapcounter = 0; 
function Gameplay(player) {
    const ways = document.querySelectorAll('.way');
    player.classList.add('jump');

    setTimeout(async () => {
        player.remove();
        ways[way].firstElementChild.insertAdjacentHTML('afterbegin', playerHTML);

        let coin = ways[way].querySelector('.coin');
        let pagar = ways[way].querySelector('.pagar');
        let car = ways[way].querySelector('.car');
        let ply = ways[way].querySelector('.player');

        let carRect   = await getStableRect(car);
        let plyRect   = await getStableRect(ply);
        let pagarrect = await getStableRect(pagar);
        let carCenter = carRect.top;
        let plyCenter = plyRect.top;
        let distance  = plyCenter - carCenter;
        let validation = undefined; 

        if(window.innerWidth >= 0 && window.innerWidth <= 768) {
            validation = distance >= 0 && distance <= 150
        } else if(window.innerWidth >= 769 && window.innerWidth <= 1370) {
            validation = distance >= 0 && distance <= 400
        } else {
            validation = distance >= 0 && distance <= 400
        }

        if (validation) {
            coin.classList.add('hide');
            ply.src = './assets/img/die2.webp';
            ply.classList.add('die');
            overlay.classList.add('active');
            const scores = document.querySelector('.scores span'); 
            scores.innerHTML = player_poin.innerText.split('Poin')[0];
            backsoundSound.pause();
            gameoverSound.play(); 

        } else {
            tapcounter++; 
            coin.classList.add('hide');
            pagar.classList.add('show');
            let carData = carSpeeds.get(car);

            if(tapcounter >=6) {
                overlay3.classList.add('active');
            }



            // Jika mobil belum lewat
            if (carCenter < plyCenter) {
                let interval = setInterval(async () => {
                    let cr = await getStableRect(car);
                    let pr = await getStableRect(pagar);
                    let pg = pagar.getBoundingClientRect(); 
                    let cg = car.getBoundingClientRect(); 
                    // let offset = pr.top - 340; 
                    // let offset = realoffset; 
                    let offset = (pg.y) - 350; 
                    if (cr.top >= offset) {
                        car.style.top = `${offset}px`;
                        carData.active = false;
                        clearInterval(interval);
                    }
                }, 16);

            } else {
            
               

                let interval = setInterval(async () => {
                    const rect = car.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                
                    // Step 1: Wait until car is offscreen
                    if (rect.top > windowHeight) {
                        carData.top = initial;
                        car.style.transition = 'unset';
                        car.style.top = `${initial}%`;
                        car.style.transition = 'all 1s linear 0s';
                        // Step 2: Once reset, wait until it reaches offset
                        let waitUntilOffset = setInterval(async () => {
                            let cr = await getStableRect(car);
                            let pr = await getStableRect(pagar);
                            let pg = pagar.getBoundingClientRect(); 
                            let cg = car.getBoundingClientRect(); 
                            // let offset = pr.top - 340;
                            // let offset = realoffset;
                            let offset = (pg.y) - 350; 
                            if (cr.top >= offset) {
                                car.style.top = `${offset}px`;
                                carData.active = false;
                                clearInterval(waitUntilOffset);
                            }
                        }, 16);
                
                        clearInterval(interval); // Stop outer interval
                    }
                }, 16);
                
                
                
            }
            setTimeout(() => {
                let multiplier = coin.lastElementChild.innerHTML.split('x')[0]; 
                multiplier = multiplier == "" ? 1 : multiplier; 

                curp += (parseFloat(poin) * parseFloat(multiplier)); 
                player_poin.innerHTML = `${curp} Poin`;

                coin.firstElementChild.src = "./assets/img/coin.webp";
                coin.classList.add('active')
                try {
                    let coinprev = ways[way - 1].querySelector('.coin');
                    coinprev.classList.remove('hide');
                } catch (ex) { }
                way++;
            }, 400);
        }
    }, 150);
}



const go = document.querySelector('.go'); 
const htp = document.querySelector('.htp'); 
const fullscreen = document.querySelector('.fullscreen'); 

go.addEventListener('click', function() {
    const player = document.querySelector('.player'); 
    Gameplay(player);
    incr -= 120; 
    container.style.transform = `translate(${incr}px, 0)`;

    jumpSound.play(); 

})
fullscreen.addEventListener('click', function() {
    goFullscreen();
})

overlay.style.transition = 'all 200ms ease 0s';
overlay.firstElementChild.style.transition = 'all 200ms ease 0s';




difficults.addEventListener('click', function() {
    difficult.classList.toggle('show')  
})
closeov2.addEventListener('click', function() {
    overlay2.classList.remove('active')
})
htp.addEventListener('click', function() {
    overlay2.classList.add('active')
})