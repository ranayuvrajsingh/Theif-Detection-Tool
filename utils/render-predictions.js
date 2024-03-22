import { throttle } from "lodash"

export const renderPredictions = (predictions, ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Fonts
  const font = "16px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];

    const isPerson = prediction.class === "person";
    const isLaptop = prediction.class === "laptop";
    const isBottle = prediction.class === "bottle";

    const isBook = prediction.class === "book";
    const isChair = prediction.class === "chair";




    // bounding box
    ctx.strokeStyle = isPerson ? "#FF0000" : "#00FFFF";
    ctx.strokeStyle = isLaptop ? "#fff" : "#D0CF6F";
    ctx.strokeStyle = isBook ? "#FF9000" : "#00DF9F";
    ctx.strokeStyle = isChair ? "#AF9000" : "#00FFFF";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);

    // fill the color
    ctx.fillStyle = `rgba(255, 0, 0, ${isPerson ? 0.2 : 0})`; // Set the fill color to red
    ctx.fillRect(x, y, width, height);

    // Draw the label background.
    ctx.fillStyle = isPerson ? "#FF0000" : "#00FFFF";
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(font, 20); // base 10
    ctx.fillRect(x, y, textWidth + 10, textHeight + 40);

    ctx.fillStyle = "#000000";
    ctx.fillText(prediction.class, x, y);

    if (isPerson) {
      playAudio();
    }
    if (isLaptop) {
      playAudio1();
    }
    // if (isBook) {
    //   playAudio2();
    // }
    if (isBottle) {
      playAudio3();
    }
    // if (isLight) {
    //   playAudio4();
    // }
    if (isChair) {
      playAudio4();
    }
    if (isBook) {
      playAudio2();
    }
  });
};

const playAudio = throttle(() => {
  const audio = new Audio("public_pols-aagyi-pols.mp3");
  audio.play();
}, 2000);
const playAudio1 = throttle(() => {
  const audio = new Audio("Laptop.mp3");
  audio.play();
}, 2000);
const playAudio2 = throttle(() => {
  const audio = new Audio("BOOK.m4a");
  audio.play();
}, 2000);
const playAudio3 = throttle(() => {
  const audio = new Audio("Bottle.m4a");
  audio.play();
}, 2000);
const playAudio4 = throttle(() => {
  const audio = new Audio("Chair.m4a");
  audio.play();
}, 2000);
