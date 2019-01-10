var Influx = require('influx');
var express = require("express");

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
var url ="http://localhost:8086/mydb";
var influx = new Influx.InfluxDB(url);

schema: [
  {
    measurement: 'response_times',
    fields: {
      path: Influx.FieldType.STRING,
      duration: Influx.FieldType.INTEGER
    },
    tags: [
      'host'
    ]
  }
]
//create
app.post('/create', function (req, res){
  console.log(req.body)
  influx.writePoints([
    req.body
  ]).then(()=>{
    console.log("created");
    res.send( "sucess");
  })
  
  
  
})


//read
app.get('/studentDetails', function (req, res) {
  influx.getSeries({
    measurement:"student"
  }).then((data)=>{
    console.log("response",data);
    res.send(data);
  })
})


//delete
app.put('/delete', function (req, res) {
influx.dropSeries({
  measurement:"student"
}).then((data)=>{
  console.log("response",data);
  res.send(data);

})
})

var port = process.env.PORT || 4000;

      var server = app.listen(port, function(){
      console.log('Listening on port ' + port);
      });