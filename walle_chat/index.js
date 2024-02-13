const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { emit } = require('node:process');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get('/', (req, res) => {
  res.send('server started');
});

io.on('connection', (socket) => {
    socket.join("Room1")
    console.log('backend connected')
    socket.on("sendMsg",(msg)=>{
       console.log('here is message',msg);
    //  socket.emit("sendMsgServer",{...msg,type:"otherMsg"});
    io.to('Room1').emit("sendMsgServer",{...msg,type:"otherMsg"});
 });
 
});
// audio record
// const socket = require('socket.io-client')('http://your-socket-server-url');
// const { Readable } = require('stream');

// Record voice using getUserMedia
// const recordVoice = () => {
//   // Use getUserMedia to capture audio
//   navigator.mediaDevices.getUserMedia({ audio: true })
//     .then(stream => {
//       const mediaRecorder = new MediaRecorder(stream);
//       const audioChunks = [];

//       mediaRecorder.ondataavailable = event => {
//         audioChunks.push(event.data);
//       };

//       mediaRecorder.onstop = () => {
//         const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//         const audioStream = new Readable();
//         audioStream.push(audioBlob);
//         audioStream.push(null);

//         // Send the audio stream to the socket server
//         socket.emit('voice', audioStream);
//       };

//       // Start recording
//       mediaRecorder.start();

//       // Stop recording after 5 seconds
//       setTimeout(() => {
//         mediaRecorder.stop();
//       }, 5000);
//     })
//     .catch(error => {
//       console.error('Error capturing audio:', error);
//     });
// };

// // Call the recordVoice function to start recording
// recordVoice();



httpServer.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});