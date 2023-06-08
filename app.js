











const express=require("express");
const bodyParser=require("body-parser");
const app= express();
const https=require("https");
const { dir } = require("console");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); 

app.listen(process.env.PORT || 3000, function(req,res){
console.log("server is running on port 3000");
});

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/", function(req,res){
        const firstName=req.body.fName;
        const lastName=req.body.lName;
        const email=req.body.email;

        const data= {
                members: [ 
                    {
                    email_address: email,
                    status:"subscribed",
                    merge_fields: {
                        FNAME: firstName,
                        LNAME: lastName,
                    }
                }
                ]
        }
        const jsonData=JSON.stringify(data);
        const url = 'https://us21.api.mailchimp.com/3.0/lists/8bc5d824f5';
        const options= {
          method:"POST",  
          auth:"daranithin07:5fee30a1363bb8bb9b0dbccaea3848d8-us211" 
        }
       const request=  https.request(url, options, function(response){

        if (response.statusCode==200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else
        {
            res.sendFile(__dirname + "/failure.html");
        }
    
            response.on("data", function(data){
            console.log(JSON.parse(data));
         });
        })
       request.write(jsonData);
       request.end();
});

app.post("/failure", function(req, res){
res.redirect("/");
});
      
        
    





// api key
// 5fee30a1363bb8bb9b0dbccaea3848d8-us21

//Audience id
//8bc5d824f5