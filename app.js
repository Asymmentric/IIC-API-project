const express=require('express');

const path=require('path');
const fs=require('fs')

const port=process.env.PORT || 5055

const app=express();
app.use(express.static('client'))
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'client/index.html'))
})

app.post('/user/place',(req,res)=>{
    console.log(req.body);
    res.send({msg:'Working Post'})
})

app.get('/fetch/details',(req,res)=>{
    fs.readFile('data/records2.json','utf-8',(err,data)=>{
        let recVal=JSON.parse(data)
        
        for (const key in recVal) {
            let cityName=recVal[key].city;
            if(cityName.toLowerCase()==='indore'){
                console.log(recVal[key]);
                let img=recVal[key].images.img1;
                
                res.send(img);
                return;
            }
        }

         res.send({msg:'NO'})
    })
})

app.listen(port,()=>{
    console.log('Listening on'+port);
})