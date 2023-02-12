const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dragobject1 = document.getElementById("object-pull-1");
const dragobject2 = document.getElementById("object-pull-2");
let Coords = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];

let drag_bool_1 = false;
let drag_bool_2 = false;

dragobject1.addEventListener("dragstart", () => {
  drag_bool_1 = true;
});

dragobject1.addEventListener("dragend", () => {
  drag_bool_1 = false;
});

dragobject2.addEventListener("dragend", () => {
  drag_bool_2 = false;
});

dragobject2.addEventListener("dragstart", () => {
  drag_bool_2 = true;
});

canvas.addEventListener("dragover", (e) => {
  var bounding = canvas.getBoundingClientRect();
  var x = e.clientX - bounding.left;
  var y = e.clientY - bounding.top;
  if (drag_bool_1) {
    ctx.clearRect(0, 0, 300, 300);
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fillRect(x, y, 100, 30);
    ctx.font = "15px monospace";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("Area puxada", x + 5, y + 20);
    Coords[0].x = x;
    Coords[0].y = y;
    if (Coords[1].x != 0 && Coords[1].y != 0) {
      ctx.fillStyle = "rgb(0,100,100)";
      ctx.fillRect(Coords[1].x, Coords[1].y, 100, 30);
      ctx.font = "15px monospace";
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillText("Area puxada", Coords[1].x + 5, Coords[1].y + 20);
    }
  }
  if (drag_bool_2) {
    ctx.clearRect(0, 0, 300, 300);
    ctx.fillStyle = "rgb(0,100,100)";
    ctx.fillRect(x, y, 100, 30);
    ctx.font = "15px monospace";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("Area puxada", x + 5, y + 20);
    Coords[1].x = x;
    Coords[1].y = y;
    if (Coords[0].x != 0 && Coords[0].y != 0) {
      ctx.fillStyle = "rgb(255,0,0)";
      ctx.fillRect(Coords[0].x, Coords[0].y, 100, 30);
      ctx.font = "15px monospace";
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillText("Area puxada", Coords[0].x + 5, Coords[0].y + 20);
    }
  }
});
