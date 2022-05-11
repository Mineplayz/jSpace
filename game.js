setInterval(Update, 16);
function Update()
{
    if(rightPressed)
        Objects.get("lplayer").x += 1;
    if(leftPressed)
        Objects.get("lplayer").x -= 1;
    if(Objects.get("lplayer").y < 500)
        Objects.get("lplayer").y += 1;
    RenderScreen();
}
/////////
//Input//
/////////
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if(e.key == "d" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "a" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "d" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "a" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
/////////////
//Rendering//
/////////////
var canva = document.getElementById("render");
var render = canva.getContext("2d");
var Objects = new Map();
var Pixelsize = 5;
class GameObject{
    constructor(id, x, y, sprite)
    {
        this.id = id;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }
}
class Sprite{
    constructor(code) {
        this.drawcode = code;
    }
}
function RenderScreen()
{
    render.clearRect(0, 0, canva.width, canva.height);
    Objects.forEach((values,keys)=>{
        for(var x = 0; x < values.sprite.drawcode.length; x++)
        {
            for(var y = 0; y < values.sprite.drawcode[x].length; y++)
            {
                render.beginPath();
                render.rect(values.x + x*Pixelsize, values.y + y*Pixelsize, Pixelsize, Pixelsize);
                render.fillStyle = values.sprite.drawcode[x][y];
                render.fill();
                render.closePath(); 
            }
        }
      });

}
//////////////
//Networking//
//////////////

const Peer = require("peerjs");

import { Peer} from 'peerjs';
var peer = new Peer();
var net;
var server_connected = false;
var localname;
function Server(id)
{
    peer = new Peer(id, {
        host: 'localhost',
        port: 9000,
        path: '/jSpace'
    });
    peer.on('open', function(id){
        server_connected = true;
        localname = id;
    });
}
function Host(id){
    peer = new Peer(id, {
        host: 'localhost',
        port: 9000,
        path: '/jSpace'
      });
      peer.on('open', function(id) {
          peer.on('connection', function(conn){
              conn.on('data', ReceivedData);
              net = conn;
              net_connected = true;
          });
          lid = id;
        peer_connected = true;
        isHost = true;
      });
}
function Join(id ,pid){
    peer = new Peer(id, {
        host: 'localhost',
        port: 9000,
        path: '/jSpace'
      });
      peer.connect("", { reliable: true });
      peer.on('open', function(id) {
        net = peer.connect(pid);
        net.on('open', function(){
            net.on('data', ReceivedData);
            net_connected = true;
        });
        lid = pid;
        peer_connected = true;
      });
}
function ReceivedData(msg)
{
    document.getElementById("tst").innerHTML = "Received:" + msg;
}
function SendData(msg)
{
    net.send(msg);
}
/////////
//Start//
/////////
Objects.set("lplayer", new GameObject("lplayer", 2, 25, new Sprite([["rgba(0, 0, 255, 0)","rgba(0, 0, 255, 1)","rgba(0, 0, 255, 0)"],["rgba(0, 0, 255, 1)","rgba(0, 0, 255, 0)","rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 0)","rgba(0, 0, 255, 1)","rgba(0, 0, 255, 0)"]])));
Objects.set("Ground", new GameObject("Ground", 0, 500, new Sprite([["rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 1)"],["rgba(0, 0, 255, 1)"]])));