const animationContainer = document.querySelector(".animation-container");

const animationElement = document.querySelector(".heart");

animationContainer.addEventListener("mousemove", animation);

function animation(event) {
  const rect = animationContainer.getBoundingClientRect();
  const xPosition = event.clientX - rect.left;
  const yPosition = event.clientY - rect.top;

  // for checking bubble donot form outside the box
  if (
    xPosition < 0 ||
    yPosition < 0 ||
    xPosition > rect.width ||
    yPosition > rect.height
  )
    return;

  // for the size of the bubble
  const bubbleSize = Math.random() * 30 + 5;
  const color = [
    "#39FF14", // Neon Green
    "#FF6EC7", // Neon Pink
    "#FE4164", // Neon Red
    "#F5F10F", // Neon Yellow
    "#0FF0FC", // Neon Cyan
    "#FF9D00", // Neon Orange
    "#8D38C9", // Neon Purple
    "#00FFEF", // Electric Blue
    "#FF00FF", // Magenta
    "#00FF00", // Bright Green
    "#FF1493", // Deep Neon Pink
    "#39FFFC", // Aqua Neon
    "#FF4500", // Neon Orange Red
    "#7FFF00", // Chartreuse Neon
    "#FF0080", // Hot Pink Neon
    "#00FFFF", // Cyan Neon
    "#FF4D00", // Electric Orange
    "#DFFF00", // Lime Neon
    "#FF007F", // Vivid Magenta
    "#0FF0FF", // Electric Aqua
  ];
  const randomIndex = Math.floor(Math.random()*(color.length-1));
  console.log(randomIndex)
  const bubbleHeight = bubbleSize;
  const bubbleWidth = bubbleSize;

  // For creating the bubble element
  const bubble = document.createElement("span");
  bubble.classList.add("heart");

  // For creating the random direction for the bubble

  const direction = Math.floor(Math.random()*30)+1

  //styling the bubble
  bubble.style.height = bubbleHeight + "px";
  bubble.style.width = bubbleWidth + "px";
  bubble.style.backgroundColor = color[randomIndex]
  bubble.style.top = yPosition + "px";
  bubble.style.left = xPosition + "px";
  bubble.style.transform = "translate(-50%,-50%)";
  animationContainer.appendChild(bubble);

//   setTimeout(() => {
//     bubble.remove();
//   }, 2000);

 bubble.addEventListener('animationend', () => {
    bubble.remove();
  });
}
