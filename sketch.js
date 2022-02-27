let listePhrases = [
    "Réveil en cours...",
    "Réveil du Botgosse...",
    "LeBotGosse a bien rejoint le chat ✔",
    "Installation de la commande !di",
    "Comptage d'orteils : 10 ✔",
    "sudo python3 brossage_de_dent.py",
    "Ouverture d'OBS",
    "sens_de_l_humour.exe a cessé de fonctionner",
    "Chargement en cours..........",
    "Visualisation de barre de chargement",
    "Appuyer sur \"Lancer le stream\" : ✔",
    "Installation de sourire.exe : ✔",
    "Vidange de la vessie : ✔",
    "Respect des RGPD a échoué : ✔",
    "Qualité de code : toujours médiocre",
    "Mise en place du fond vert : approximative",
    "Insérer phrase de chargement ici",
    "Redémarrage du bot",
    "Score de Corbeau : 3 points ✔",
    "En attente que quelqu'un lise ce texte",
    "La division par zéro a bien fonctiozqndizqjdoizqjoahr",
    "Also available in German",
    "Auch auf English verfügbar",
    "Déménagement à Mende en cours...",
    "Bonjour !",
    "Hallo !",
    "Hello !",
    "Buon Dia!",
    "Welcoming people ✔",
    "LeBotGosse a cessé de fonctionner",
    "Redémarrage numéro 59 en cours",
    "Verification de la disponibilité du rideau : ✔",
    "Réapprovisionnement en glaçons : ✔",
    "327 projets non finis ont été chargés",
    "Désinstallation de Streamlabs : ✔",
    "Chroma key bleue : ✔",
    "Chroma key verte : ✔",
    "sudo node amaurygolo.js",
    "Création d'alertes follow : ❌",
    "Création d'alertes sub : ❌",
    "Capacité de spam du bot : ✔✔✔",
    "Intelligence artificielle non trouvée",
    "Calcul du sens de la vie...",
    "Nombre total des sons trouvés : 425 ✔",
    "Rotation de type lucrative : ✔",
    "Tournage en rond en cours...",
    "Réapprovisionnement en chips : ✔",
    "Elimination de neurones a bien fonctionné",
    "582 neurones ont cessé de fonctionner",
    "Les rageux ont bien été mute"
]

let theRect;
let listeRect = [];
let width = 1920;
let height = 1080;
//let nbElements = 500;
let nbElements = 10;
let coefficient = 0.3;

//let sizeCoeff = 0.5;
let sizeCoeff = 1;
width *= sizeCoeff;
height *= sizeCoeff;

function rand(a,b){
    return Math.floor(a+Math.random()*(b-a));
}

function changePhrase(){
    return new Promise(function(resolve, reject){
        let randomPhrase = listePhrases[rand(0,listePhrases.length-1)];
        thePhrase = "";
        let timeout = rand(10,400);
        let counter = 1;
        let theInt = setInterval(function(){
            document.querySelector("#phrase").textContent = randomPhrase.substring(0,counter);
            counter+=1;
            if(counter == randomPhrase.length+1){
                clearInterval(theInt);
                resolve();
            }
        }, timeout);
    });
}

function setup() {
    createCanvas(width,height);
    theRect = new Rectangle();
    for(let i=0; i<nbElements; i++) {
        listeRect.push(new Rectangle());
    }
    background(0);
}

class Rectangle{
    constructor(){
        this.width = random(40,200)*sizeCoeff;
        this.height = random(40,200)*sizeCoeff;
        let R = 0;
        let G = random(0,255);
        let B = 255;
        this.color = color(R,G,B);
        this.strokeWeight = random(2,5);
        this.strokeColor = color(0);
        //this.strokeColor = color(255);
        this.x = width/2;
        this.y = height/2;
        this.vectX = random(0,10)*coefficient;
        if(Math.floor(random(0,2)) == 1){
            this.vectX *= -1;
        }
        this.vectY = random(0,10)*coefficient;
        if(Math.floor(random(0,2)) == 1){
            this.vectY *= -1;
        }
        this.alive = true;
    }
    drawMe(){
        fill(this.color);
        stroke(this.strokeColor);
        strokeWeight(this.strokeWeight);
        rect(this.x,this.y,this.width,this.height);
    }
    move(){
        this.x += this.vectX;
        this.y += this.vectY;
        if(this.x > width || this.x+this.width<0 || this.y+this.height < 0 || this.y > height){
            this.alive = false;
        }
        this.width -= random(0,2)/10*coefficient;
        this.height -= random(0,2)/10*coefficient;
    }
}

let count = 0;

function draw() {
    background(0,(count/10)%255,255,5);
    for(let i=0; i<listeRect.length; i++){
        listeRect[i].drawMe();
        listeRect[i].move();
        if(listeRect[i].alive == false){
            listeRect[i] = new Rectangle();
        }
    }
    count += 1;

}

async function sleep(time){
    return new Promise(function(resolve, reject){
       setTimeout(function(){
           resolve();
       },time*1000)
    });
}

async function doChangeSentenceCycle(){
    while(true){
        await changePhrase();
        await sleep(2);
    }
}

doChangeSentenceCycle();

function startTimer(timeInSeconds){
    //let dateStart = Date.now();
    let theElement = document.querySelector("#loadingSize");
    let timerValue = 0;
    document.querySelector("#loading").style.opacity = 1;
    theElement.style.width = 0+"%";
    let timeoutDuration = timeInSeconds/20*1000;
    let theInterval = setInterval(()=>{
        timerValue += timeoutDuration/1000;
        let percentage = timerValue/timeInSeconds*100;
        theElement.style.width = percentage+"%";
        coefficient = percentage * 0.03;
        if(timerValue >= timeInSeconds){
            clearInterval(theInterval);
            document.querySelector("#loading").style.opacity = 0;
        }
    },timeoutDuration);
}

//-----------------------------
let nomChaine = "icecoptered";

const params = new URLSearchParams(window.location.search);
const channel = params.get('channel') || nomChaine.toLowerCase();
const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true,
    },
    channels: [channel],
});

client.connect();

client.on('message', (wat, tags, message, self) => {
    if (self) return;
    const {username} = tags;
    if (message[0] === "!") {
        if ( username === "icecoptered") {
            let listeCmd = message.slice(1, message.length).split(" ");
            let command = listeCmd[0];
            let param = listeCmd.slice(1, listeCmd.length);
            if (command === "start") {
                if (param.length === 3) {
                    let h = Number(param[0]);
                    let m = Number(param[1]);
                    let s = Number(param[2]);
                    startTimer(h * 3600 + m * 60 + s);
                }
            }
        }
    }
});