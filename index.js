//require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpress = require('aws-serverless-express');
const app = express();
const {
    connection
} = require('./connection.js');
app.use(express.static("public"));
const {
    getPolymerType
} = require('./get_polymer_type');
const cors = require('cors');
app.use(cors());
app.use(express.json());




///////////////////////////////////////GET_PLOYMER_TYPES//////////////////////////////////////////////

app.post('/polymer/getPolymerTypes', async function (req, res) {
    res.send(await getPolymerType());
});


// app.listen(3000, function(req,res){
//     console.log(`server is listening on port`);
// })


const server=awsServerlessExpress.createServer(app);
exports.handler=(event,context)=>{
	console.log("Event handler :"+JSON.stringify(event));
	awsServerlessExpress.proxy(server,event,context);
}