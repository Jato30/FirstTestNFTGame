// main.js


const serverUrl = "https://r5vjyf2qedty.usemoralis.com:2053/server";
const appId = "uBcSHqnMDd0ZgYe6WFjcKCLKeWs8yiV6ti9sI6d1";
Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Hello World!" })
      console.log(user)
      console.log(user.get('bscAddress'))
   } catch(error) {
     console.log(error)
   }
  }
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}







var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game;

var platforms;

var player;
var competitors = {};

var cursors;

var jumpHeight = -300;
var that;

function launch(){
    let user = Moralis.User.current();
    if (!user) {
        console.log("PLEASE LOG IN WITH METAMASK!!")
    }
    else{
        console.log(user.get("ethAddress") + " " + "logged in")
        game = new Phaser.Game(config);
    }

}

launch();


// loading assets
async function preload ()
{
    that = this;
    this.load.image('background', 'assets/BG.png');
    this.load.image('ground', 'assets/Tiles/Tile (2).png');
    //this.load.image('comptetitor', 'assets/player.png');

/*
    // fetch player SVG
    const numericTraits = [1, 99, 99, 99, 1, 1]; // UI to change the traits
    const equippedWearables = [23,6,2,43,0,4,0,1,0,0,0,0,0,0,0,0];

    const rawSVG = await Moralis.Cloud.run("getSVG",{numericTraits:numericTraits,equippedWearables:equippedWearables})

    const svgBlob = new Blob([rawSVG], {type:"image/svg+xml;charset=utf-8"})
    const url = URL.createObjectURL(svgBlob)
    */
    const url = 'assets/player.png';
    
    this.load.image('player',url);

    /*this.load.on('filecomplete', function(){

        initPlayer()
    }, this);
    this.load.start()*/
}

async function initPlayer(){
    player = that.physics.add.sprite(500, 250, 'player').setScale(0.3).refreshBody();
    player.setBounce(0.3);
    that.physics.add.collider(player, platforms);
}

// initial setup
async function create ()
{
    this.add.image(400, 300, 'background').setScale(0.55);

    platforms = this.physics.add.staticGroup();

    platforms.create(470, 400, 'ground').setScale(0.5).refreshBody();
    platforms.create(535, 400, 'ground').setScale(0.5).refreshBody();
    platforms.create(600, 400, 'ground').setScale(0.5).refreshBody();
    platforms.create(665, 400, 'ground').setScale(0.5).refreshBody();

    player = this.physics.add.sprite(500, 250, 'player').setScale(0.3).refreshBody();
    player.setBounce(0.3);
    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

/*
    let user = Moralis.User.current();
    let query = new Moralis.Query('PlayerPosition');
    let subscription = await query.subscribe();
    subscription.on('create', (plocation) => {
        if(plocation.get("player") != user.get("ethAddress")){

            // if first time seeing
            if(competitors[plocation.get("player")] == undefined){
                // create a sprite
                competitors[plocation.get("player")] = this.add.image( plocation.get("x"), plocation.get("y"), 'comptetitor').setScale(0.3);
            }
            else{
                competitors[plocation.get("player")].x = plocation.get("x");
                competitors[plocation.get("player")].y = plocation.get("y");
            }

            console.log("someone moved!")
            console.log(plocation.get("player"))
            console.log("new X ", plocation.get("x"))
            console.log("new Y ", plocation.get("y"))
        }
    });
*/
}

// 60 times per second  - 60 frames per second
async function update ()
{
    if(!player)
        return;

    // LOGIC
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
    }
    else
    {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(jumpHeight);
    }
/*
    if(player.lastX!=player.x  || player.lastY!=player.y){
        //let user = Moralis.User.current();

        const PlayerPosition = Moralis.Object.extend("PlayerPosition");
        const playerPosition = new PlayerPosition();

        //playerPosition.set("player",user.get("ethAddress"));
        playerPosition.set("x",player.x);
        playerPosition.set("y",player.y)

        player.lastX = player.x;
        player.lastY = player.y;

        await playerPosition.save();
    }
*/

}









document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;