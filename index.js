const  rlp = require("roblox-long-polling")

const poll = new  rlp({
    port:  2004, // Add this behind your IP, example: http://127.0.0.1:2004,
    //password: "passsword here" If you want to add a simple password, put uncomment this and add your password
}); //Usage is just like the other module, the only difference is you need redis.

poll.on('connection', (connection) => {
    console.log('New connection', connection.id);// Will fire when a new connection is active, and include this IP address.
    poll.broadcast("new connection", connection.id); // Will broadcast to all active sockets that this one has joined the part.
    
    
    connection.on('hello', (data) => {//On a event we will handle the hello message
        console.log("received hello message!", data)
    })
    connection.send('runCode', 'stpo[|print("FUCK")') // Will send a welcome message to the new socket.
    connection.on('internal_ping', () => {//We receive pings from the server to let us know its still alive, you can't disable this.
        console.log("Keep-Alive Ping received")
    })
    
    connection.on('dsconnect', () => { // Fired when the game sends a disconnect command, or our timeout is fired.
        console.log('Disconnection', connection.id)
        poll.broadcast("disconnection", connection.id);
    })
})
