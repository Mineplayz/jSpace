class data{
    static JSInterface;
    static peer;
    static client;
}
var SendMSG;
var net = new function(){
    this.Server = function(id)
    {
        data.peer = new Peer((id));
        data.peer.on('error', function(error){
            alert("[ERROR]" + error.type);
            SendMSG('Error', error.type);
        });
        data.peer.on('open', function(id){
            SendMSG('OnConnected_Server', "SUCCESS");
        });
    }
    this.Host = function()
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
                    SendMSG("Receive", msg);
                });
                data.client.get(con.peer).on('close', function(){
                    alert(con.peer + " disconnedted!");
                    SendMSG("H_CDisconnected", con.peer);
                    
                    data.client.delete(con.peer);
                });
                SendMSG("PeerCompleted", con.peer);
            });
        });
    }
    this.Join = function(pid)
    {
        data.client = data.peer.connect((pid));
        data.client.on('open', function(){
            SendMSG("PeerCompleted", "SUCCESS");
            data.client.on('data', function(msg){
                    console.log("\\/" + msg);
                    SendMSG("Receive", msg);
            });
            data.client.on('close', function(){
                alert("Disconnected");
                SendMSG("H_CDisconnected", "");
            })
        });
    }

}