const express=require('express');
const fileupload= require('express-fileupload')
const path=require('path');
const fs=require('fs');

const port=process.env.PORT || 5055

const app=express();

app.use(express.static('client'))
app.use('/images',express.static('images'))
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(fileupload({
    createParentPath:true
}))
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'client/index.html'))
})

app.post('/user/place',(req,res)=>{
    console.log(req.body);
    res.send({msg:'Working Post'})
})

app.get('/fetch/details/:city',(req,res)=>{
    fs.readFile('data/records2.json','utf-8',(err,data)=>{
        let recVal=JSON.parse(data)
        let dataToSend={}
        // console.log(recVal);
        for (const key in recVal) {
            
            let cityName=recVal[key].city;
            

            if(cityName.toLowerCase()===req.params.city.toLocaleLowerCase()){
                console.log(cityName.toLocaleLowerCase(),req.params.city.toLocaleLowerCase());
                dataToSend[key]=recVal[key]
                // console.log(dataToSend);
            }
        }
        console.log(dataToSend);
        res.send({status:"ok",note:"It is only a dummy data and does not represent the place in real",Places:dataToSend})
    })
})
app.get('/fetch/detail',(req,res)=>{
    fs.readFile('data/records2.json','utf-8',(err,data)=>{
        let recVal=JSON.parse(data)
        res.send({status:"ok",note:"It is only a dummy data and does not represent the place in real",Places:recVal})
    })
})
// app.post('/upload',async (req,res)=>{
//     try {
//         if(!req.files){
//             res.send({statur:false,msg:'No files uploaded'})
//         }else{
//             let avatar=req.files.imgFile;
//             avatar.mv('uploadedPhotos/' + avatar.name);
//             res.send({
//                 status:true,
//                 msg:'File is uploaded',
//                 data:{
//                     name:avatar.name,
//                     mimetype:avatar.mimetype,
//                     size:avatar.size
//                 }
//             })
//         }
//     } catch (err) {
//         res.status(500).send(err)
//     }
// })
// app.post('/upload/new/place',(req,res)=>{
//     console.log(req.files);
//     console.log(req.body);
//     res.redirect('/')
// })

app.post('/upload/new/place',async (req,res)=>{
    console.log(req.files);
    console.log(req.body);
    try {
        if(!req.files){
            res.send({
                status:false,
                message:'No file uploaded'
            })
        }else{
            let img1=req.files.placeImgOne;
            let img2=req.files.placeImgTwo;
            let imgLoc1=`images/${req.body.placeNameText}`+img1.name
            let imgLoc2=`images/${req.body.placeNameText}`+img2.name
            img1.mv(imgLoc1)
            img2.mv(imgLoc2)   


            let newPlace={
                id:Math.floor(Math.random() * 100000001),
                name:req.body.placeNameText,
                location:{
                    lat:req.body.loclat,
                    lng:req.body.loclng
                },
                images:{
                    img1:'https://unexplored-places.herokuapp.com/'+encodeURIComponent(imgLoc1),
                    img2:'https://unexplored-places.herokuapp.com/'+encodeURIComponent(imgLoc2)
                },
                language:{
                    en:req.body.descEng,
                    ka:req.body.descKa,
                    hi:req.body.descHi
                },
                town:req.body.placeTownName,
                city:req.body.placeCityName,
                state:req.body.placeStateName,
                country:req.body.placeCountryName,
                free:freeChecker(req.body.owner),
                verified:false

            }
            
            fs.readFile('data/records2.json','utf-8',(err,data)=>{
                let recVal=JSON.parse(data)
                
                recVal.push(newPlace)
                fs.writeFile('data/records2.json',JSON.stringify(recVal),(err)=>{
                    if (err) {
                        console.log(err);
                    }else{
                        console.log('Written successfully');
                    }
                })
            })
            
            res.send({
                                status:true,
                                msg:'File is uploaded',
                                data1:{
                                    name:img1.name,
                                    mimetype:img1.mimetype,
                                    size:img1.size
                                },
                                data2:{
                                    name:img2.name,
                                    mimetype:img2.mimetype,
                                    size:img2.size
                                }
                            }) 
            // res.redirect('/')
        }
    } catch (err) {
        res.status(500).send({err:'some'})
        // res.redirect('/')
    }
})

app.listen(port,()=>{
    console.log('Listening on '+port);
})

function freeChecker(val) {
    if(val==='1'){
        return true;
    }else{
        return false
    }
}
