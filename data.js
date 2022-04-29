class data{
    static JSInterface;
    static peer;
    static client;
}
class net{
    Server(id)
    {
        data.peer = new Peer(Pointer_stringify(id));
        data.peer.on('error', function(error){
            alert("[ERROR]" + error.type);
            SendMessage(data.JSInterface, 'Error', error.type);
        });
        data.peer.on('open', function(id){
            SendMessage(data.JSInterface, 'OnConnected_Server', "SUCCESS");
        });
    }
    Host()
    {
        data.client = new Map();
        data.peer.on('connection', function(con){
            console.log("Conn Established=" + con.open);
            console.log("PEER: " + con.peer);
            con.on('open', function(){
                console.log("OPEN=" + con.open);
                console.log(con.peer + " connected");
                data.client.set(con.peer, con);
                data.client.get(con.peer).on('data', function(msg){
                    console.log("\\/" + msg);
                    SendMessage(data.JSInterface, "Receive", msg);
                });
                data.client.get(con.peer).on('close', function(){
                    alert(con.peer + " disconnedted!");
                    SendMessage(data.JSInterface, "H_CDisconnected", con.peer);
                    
                    data.client.delete(con.peer);
                });
                SendMessage(data.JSInterface, "PeerCompleted", con.peer);
            });
        });
    }
    Join(pid)
    {
        data.client = data.peer.connect(Pointer_stringify(pid));
        data.client.on('open', function(){
            SendMessage(data.JSInterface, "PeerCompleted", "SUCCESS");
            data.client.on('data', function(msg){
                    console.log("\\/" + msg);
                    SendMessage(data.JSInterface, "Receive", msg);
            });
            data.client.on('close', function(){
                alert("Disconnected");
                SendMessage(data.JSInterface, "H_CDisconnected", "");
            })
        });
    }
    
}