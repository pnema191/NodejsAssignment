/** Intialize connect url **/

function getMongoConnectingUrl(){
    var result = process.env.ConnectUrl;
    if(result === undefined){
        result = "mongodb://localhost:27017/";
    }
    return result;
}
exports.getMongoConnectingUrl = getMongoConnectingUrl;