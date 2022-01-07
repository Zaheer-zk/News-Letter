const express = require ("express");
const bodyParser = require ("body-parser");
const request = require ("request");
const https = require ("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:
          {
          FNAME : firstName,
          LNAME : lastName,
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/d4f0c1f2a3";

const options = {
  method: "POST",
  auth: "CodxMan:d07485cffbf50d1ea288165cad12c84e-us20"  //fdd8f9e88e56fc31b01a722036aa96e3-us20
}

const request = https.request(url, options, function(response) {

if(response.statusCode === 200)
{
  res.sendFile(__dirname + "/success.html");
}
else
{
  res.sendFile(__dirname + "/failure.html");
}

    response.on("data", function(data) {
      console.log(JSON.parse(data));
      // var result = JSON.parse(data);
      // var status = result.status;
      // if(status === 200) {
      //   console.log("Success");
      // }
      // else {
      //   console.log("Failure")
      // }
    })
})

request.write(jsonData);
request.end();

});


app.post("/failure",function(req,res){
  res.redirect("/");
})

app.post("/success",function(req,res){
  // res.writeHead(301,
  //   {Location: 'https://zaheerkhan.online'}
  // );
  // res.end();
  res.redirect('https://zaheerkhan.online');
})


app.listen(process.env.PORT  || 3000, function () { 
  console.log("Server listening on port 3000");
});


// API KEY
// fdd8f9e88e56fc31b01a722036aa96e3-us20  || d07485cffbf50d1ea288165cad12c84e-us20

// Audience id
// d4f0c1f2a3