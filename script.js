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

dragobject1.ondragstart = () => (drag_bool_1 = true);
dragobject2.ondragstart = () => (drag_bool_2 = true);
dragobject1.ondragend = () => (drag_bool_1 = false);
dragobject2.ondragend = () => (drag_bool_2 = false);

canvas.addEventListener("dragover", (e) => {
  var bounding = canvas.getBoundingClientRect();
  var x = e.clientX - bounding.left;
  var y = e.clientY - bounding.top;
  ctx.clearRect(0, 0, 300, 300);
  PullObjects(drag_bool_1, "rgb(255,0,0)", "rgb(0,100,100)", 0, 1, x, y);
  PullObjects(drag_bool_2, "rgb(0,100,100)", "rgb(255,0,0)", 1, 0, x, y);
});

function PullObjects(
  condicao,
  quadradoColorself,
  quadradoColorOther,
  idself,
  idother,
  x,
  y
) {
  if (condicao) {
    ctx.fillStyle = quadradoColorself;
    ctx.fillRect(x, y, 100, 30);
    ctx.font = "15px monospace";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("Area puxada", x + 5, y + 20);
    Coords[idself].x = x;
    Coords[idself].y = y;
    if (Coords[idother].x != 0 && Coords[idother].y != 0) {
      ctx.fillStyle = quadradoColorOther;
      ctx.fillRect(Coords[idother].x, Coords[idother].y, 100, 30);
      ctx.font = "15px monospace";
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillText(
        "Area puxada",
        Coords[idother].x + 5,
        Coords[idother].y + 20
      );
    }
  }
}

document.querySelector("button").addEventListener("click", () => {
  var textFile = null,
    makeTextFile = function (text) {
      var data = new Blob([text], { type: "text/plain" });
      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }
      textFile = window.URL.createObjectURL(data);
      return textFile;
    };
  file = makeTextFile(JSON.stringify(Coords));
  const a = document.createElement("a");
  a.href = file;
  a.download = file.split("/").pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

document.querySelector("input").addEventListener("change", () => {
  let file = document.querySelector("input").files[0];
  var reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  reader.onload = function (evt) {
    let jsonrecebido = JSON.parse(evt.target.result);
    ctx.clearRect(0, 0, 300, 300);
    DrawWhenUploadfile(0, "rgb(255,0,0)", jsonrecebido);
    DrawWhenUploadfile(1, "rgb(0,100,100)", jsonrecebido);
  };
  reader.onerror = (evt) => console.log("ERROR", evt);
});

function DrawWhenUploadfile(id, caixacor, json) {
  if (json[id].x != 0 && json[id].y != 0) {
    ctx.fillStyle = caixacor;
    ctx.fillRect(json[id].x, json[id].y, 100, 30);
    ctx.font = "15px monospace";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("Area puxada", json[id].x + 5, json[id].y + 20);
  }
}