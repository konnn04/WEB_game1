let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

// Kích thước canvas bằng kích thước màn hình
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mảng chứa các đường dẫn đến các ảnh GIF

let images = [];

// Tạo và load các ảnh GIF
function loadImages(arrImg) {
  let loadedImages = 0;

  for (let i = 0; i < arrImg.length; i++) {
    const img = new Image();
    img.src = `./asset/emojis/${arrImg[i]}`;
    
    img.onload = function() {
      loadedImages++;
      if (loadedImages === arrImg.length) {
        startAnimating(arrImg);
      }
    };

    images.push(img);
  }
}

// Vị trí và tốc độ ban đầu của ảnh
const imageInfo = [];

function initializeImages() {
  for (let i = 0; i < images.length; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speed = 0.2 + Math.random() * 1.2; // Tốc độ ngẫu nhiên

    imageInfo.push({ x, y, speed });
  }
}

// Vẽ các ảnh lên canvas
function drawImages() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const info = imageInfo[i];

    ctx.drawImage(img, info.x, info.y);

    info.x += info.speed;
    if (info.x > canvas.width) {
      info.x = -img.width;
      info.y = Math.random() * canvas.height;
    }
  }

  requestAnimationFrame(drawImages);
}

// Bắt đầu vẽ
function startAnimating(arrImg) {
  initializeImages();
  drawImages();
}

// Load ảnh và bắt đầu vẽ sau khi đã load xong

