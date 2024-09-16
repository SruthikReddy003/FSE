// import React from "react";
// import "./board.css"
// import io from "socket.io-client";
// class Board extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   timeout;
//   socket = io.connect("http://localhost:3000");

//   componentDidMount()
//   {
//     this.drawOnCanvas();
//     this.socket.on("canvas-data",function(data){
//       var image = new Image();
//       var canvas = document.querySelector("#board");
//       var ctx = canvas.getContext('2d');
//       image.onload = function()
//       {
//         ctx.drawImage(image,0,0);
//       };
//       image.src = data;
//     })
//   }
// //   componentDidMount() {
// //     this.drawOnCanvas();
// //     this.socket.on("canvas-data", (data) => {
// //         this.updateCanvas(data);
// //     });
// // }

// updateCanvas(data) {
//     const image = new Image();
//     const canvas = document.querySelector("#board");
//     const ctx = canvas.getContext('2d');
//     image.onload = () => {
//         ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing new data
//         ctx.drawImage(image, 0, 0);
//     };
//     image.src = data;
// }


//   drawOnCanvas()
//   {
    
//         var canvas = document.querySelector('#board');
//         var ctx = canvas.getContext('2d');
    
//         var sketch = document.querySelector('#sketch');
//         var sketch_style = getComputedStyle(sketch);
//         canvas.width = parseInt(sketch_style.getPropertyValue('width'));
//         canvas.height = parseInt(sketch_style.getPropertyValue('height'));
    
//         var mouse = {x: 0, y: 0};
//         var last_mouse = {x: 0, y: 0};
    
//         /* Mouse Capturing Work */
//         canvas.addEventListener('mousemove', function(e) {
//             last_mouse.x = mouse.x;
//             last_mouse.y = mouse.y;
    
//             mouse.x = e.pageX - this.offsetLeft;
//             mouse.y = e.pageY - this.offsetTop;
//         }, false);
    
    
//         /* Drawing on Paint App */
//         ctx.lineWidth = 5;
//         ctx.lineJoin = 'round';
//         ctx.lineCap = 'round';
//         ctx.strokeStyle = 'blue';
    
//         canvas.addEventListener('mousedown', function(e) {
//             canvas.addEventListener('mousemove', onPaint, false);
//         }, false);
    
//         canvas.addEventListener('mouseup', function() {
//             canvas.removeEventListener('mousemove', onPaint, false);
//         }, false);
        
//         var root = this;
//         var onPaint = function() {
//           ctx.beginPath();
//           ctx.moveTo(last_mouse.x, last_mouse.y);
//           ctx.lineTo(mouse.x, mouse.y);
//           ctx.closePath();
//           ctx.stroke();
//           if (root.timeout != undefined) clearTimeout(root.timeout);
//           root.timeout = setTimeout(function() {
//             var base64ImageData = canvas.toDataURL("image.png");
//             root.socket.emit("canvas-data", base64ImageData);
//         }, 1000); // Reduce the delay to make it more responsive
        
//       };
      
//   }
//   render() {
//     return (
//         <div className="sketch" id="sketch">
//     <canvas className="board" id="board"></canvas>
//     </div>
//     )
//   }
// }

// export default Board;



import React from "react";
import "./board.css";
import io from "socket.io-client";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.timeout = undefined;
    this.socket = io.connect("http://localhost:3000");
  }

  componentDidMount() {
    this.drawOnCanvas();
    this.socket.on("canvas-data", (data) => {
      this.updateCanvas(data);
    });
  }

  updateCanvas(data) {
    const image = new Image();
    const canvas = document.querySelector("#board");
    const ctx = canvas.getContext("2d");
    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing new data
      ctx.drawImage(image, 0, 0);
    };
    image.src = data;
  }

  drawOnCanvas() {
    const canvas = document.querySelector("#board");
    const ctx = canvas.getContext("2d");

    const sketch = document.querySelector("#sketch");
    const sketchStyle = getComputedStyle(sketch);
    canvas.width = parseInt(sketchStyle.getPropertyValue("width"));
    canvas.height = parseInt(sketchStyle.getPropertyValue("height"));

    const mouse = { x: 0, y: 0 };
    const lastMouse = { x: 0, y: 0 };

    // Mouse Capturing Work
    canvas.addEventListener("mousemove", (e) => {
      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;

      mouse.x = e.pageX - canvas.offsetLeft;
      mouse.y = e.pageY - canvas.offsetTop;
    });

    // Drawing on Paint App
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "blue";

    const onPaint = () => {
      ctx.beginPath();
      ctx.moveTo(lastMouse.x, lastMouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      // Emit canvas data
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        const base64ImageData = canvas.toDataURL("image/png");
        this.socket.emit("canvas-data", base64ImageData);
      }, 100); // Reduced delay for better responsiveness
    };

    // Mouse events for drawing
    canvas.addEventListener("mousedown", () => {
      canvas.addEventListener("mousemove", onPaint, false);
    });

    canvas.addEventListener("mouseup", () => {
      canvas.removeEventListener("mousemove", onPaint, false);
    });
  }

  render() {
    return (
      <div className="sketch" id="sketch">
        <canvas className="board" id="board"></canvas>
      </div>
    );
  }
}

export default Board;
