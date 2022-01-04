let data={
    name:"Name of some place",
    location:{
        lat:"45.3991",
        lng:"89.3976"
    },
    images:{
        img1:"https://cdn.vox-cdn.com/thumbor/6GI2HkOKkG1HDCAcHw_wReeOriY=/0x0:3000x1983/1220x813/filters:focal(869x644:1349x1124):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/70315481/109711647.0.jpg",
        img2:"https://img-getpocket.cdn.mozilla.net/404x202/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fstatic.politico.com%2F44%2F96%2Fb3ace85742c68afe02534c0d6ab5%2Fmag-ap21347713138601.jpg",
        img3:"https://img-getpocket.cdn.mozilla.net/404x202/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fwww.washingtonpost.com%2Fwp-apps%2Fimrs.php%3Fsrc%3Dhttps%3A%2F%2Farc-anglerfish-washpost-prod-washpost.s3.amazonaws.com%2Fpublic%2FSLG3D7DDPQI6ZG2ROEY7UGIMLY.jpg%26w%3D1440",
        img4:"https://img-getpocket.cdn.mozilla.net/404x202/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fi.guim.co.uk%2Fimg%2Fmedia%2F6812d2f5cd8ad9b9a26fff36804d99142574f47f%2F0_98_2745_1647%2Fmaster%2F2745.jpg%3Fwidth%3D620%26quality%3D45%26auto%3Dformat%26fit%3Dmax%26dpr%3D2%26s%3D0343f62f13b38e5638bf747693fd035e",
        img5:"https://img-getpocket.cdn.mozilla.net/404x202/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fi.guim.co.uk%2Fimg%2Fmedia%2Ffc4150070b06c7fcf4f9243dfa3ffe2ca640ee1a%2F0_371_5568_3341%2Fmaster%2F5568.jpg%3Fwidth%3D1200%26height%3D630%26quality%3D85%26auto%3Dformat%26fit%3Dcrop%26overlay-align%3Dbottom%252Cleft%26overlay-width%3D100p%26overlay-base64%3DL2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc%26enable%3Dupscale%26s%3D2f8f3fd03f2f5c5fa4e798d5f9a4b66e"
    },
    language:{
        en:"Place desc in english",
        ka:"place desc in kannada",
        hi:"place desc in hindi"
    },
    description:"Description of the place",
    town:"Town",
    city:"city",
    state:"state",
    country:"country-Name",
    free:true,
    verified:false
}
let submit=document.getElementById('sumit');
submit.addEventListener('click',()=>{
    let xhr=new XMLHttpRequest();
xhr.open('get','/fetch/details',true)

xhr.onload=()=>{
    let place=document.createElement('img');
    let beDiv=document.createElement('div')
    place.setAttribute('src',xhr.response)
    place.style.height='300px'
    place.style.width='400px'
    console.log(place);
    beDiv.appendChild(place)
    document.body.appendChild(beDiv)
    document.body.appendChild(place)
    console.log("Added");
    
}
xhr.send(JSON.stringify(data))
})


