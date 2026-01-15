const express= require("express")    /* express lai install ta gariyo  but chinaunu  pani ta paro ni main file sanga ie import gareko hai express lai*/


const app =express()                                 /* yo chai generally express lai use garne code ... yeslai chai majjale memorize garda pani bhayo
                                                      node js ko sabai ma yo chahinxa chahinxa yo bina posssible chaaina api haru banauna */


require("dotenv").config()                               /*yo chai maile dotenv file ma lekhiyeko kura access garna 
                                                           node js lai dotenv file ma xa tyo chij use garna de bhaneko: use garna -> process.env.variable_name  */

 const {createBlogs, registers } = require("./model/index")/* yo import nagarda jhan khatra error aauxa  */
                                                        //  yo chai database ko jun table ma CRUD OPERATION garna ko lagi import garinxa


const{storage,multer}= require("./middleware/multerConfig")
const uploads = multer({storage:storage})
                                                             // yo chai multer bhanne middleware xa teslai import garera configuration gariwori just store gariyo


                                                  



app.set('view engine','ejs')                           /*yo chai node lai hami le ejs use garim hai bhanera bhaneko.. abo go to left 
                                                   side ma jane ra euta folder"views" same name ko banaune"*/




 require("./model/index")                       /*  yo chai database ko lagi ho.. main file matra bujxa ni ta app.js le so
                                                    mile model bhanne folder ko index.js ma chai database ko code xa hai bhanera bhanidiye */
 


app.use(express.urlencoded({extended:true}))      /*yo code le chai maile paxi frontend bata pathako data lai nodejs lai bujauna 
                                                     help garxa ra yo code bhayena bhane paxi fornt end bata data pathauda node js le un
                                                        undefined  bhanera bhandinxa*/



app.use(express.json())                             /* yo code le chai jaba tapai backend matra garnu hudai xa like api testai jasto kaam than tetikhera 
                                                    tapaile post man ko use garnu hunxa ..but node le post man bata pathako jun data xa tyo ni bujdai na 
                                                      json format ko so yo code le post man bata json format ma aako data node js lai chinaune kaam garxa*/
 


app.use(express.static("./collection/"))

                                                      // yo chai collection bhitra ko jati paanii images xa teslai access garna de bhaneko if hamile brower ma localhost:5000/collection and image ko name handa ty0 imagae dekhinxa but
                                                        // manxele big mistake garne bhaneko :> app.use(express.static('/')) yo code lekheyo bhane chai HACKER LE SAKXA HAMRO APP.JS KO SABAI CODE JANXA USLE LOCALHOST:5000/APP.JS HANNO BHANE HAMRO SABAI MAIN FILE DEKHI LERA SABAI ACCESS GARNA SAKXA


app.use(express.static("./public/styles/"))
                                                         // yo chai external css use garna ko laggi maile bahiri file name public bhitra bhako styles bhitrako jatipni file xa tyo access garna de bhanera bhaneko
                                                        // similar xa tyo collection bhitra ko image use garna dinu .. post man aako data entry garna dinu bhane jastai ho










 app.get("/",async(req,res)=>{
        const aakodata=  await createBlogs.findAll()    /*  Hamilai kunai database bata sabai data fetch garnuparne xa bhane ho tarikale garne findAll bhanne jun hamilai orm le provide garde ko hunxa*/
        
    res.render("home.ejs",{uimapathako:aakodata})  /*  yesle fetch gareko datalai uimapathako bhanne variable ma ui ma pathairako xa ie home.ejs ma ra ma tya <%-uimapathako.title%> bhandai value set garxu*/

})









app.get("/register",(req,res)=>{
    res.render("register.ejs")
})


app.post("/register",async(req,res)=>{

  const{email,userName,password}=req.body                      /* yo jun email,userName xa yo form ko name sanga match garnuparxa natra error aauxa hai */
//   yo frontend bata aako data receive gareko la
await registers.create({   /*  database related kaam gardaa jahilai function asynchronous hunxa ra operation garda kehi time lagne bhayeko le method ko agadi await bhanera lekhanu nai parxa natra error aauxa*/
    email:email,
    userName:userName,
    password:password

   })
   res.redirect("/users")
})






app.get("/addblog",(req,res)=>{
    res.render("addBlog.ejs")
})


app.post("/addblog",uploads.single('image'),async(req,res)=>{   /* uploads.single('image') yo code le as the middleware kaam garirako xa..if yeuta  image fronted bata aauxa bhane k garne bhannne kura yo function le manage garxa ,,yo req ra resposnse ko bichma lekhine bhyekale yeslai middleware bhanera bhaninxa */
  const{title,subTitle,description}=req.body
  
     await createBlogs.create({  /*yo create bhaneko mero model ko name ho ie table ko name  */
        title:title,
        subTitle:subTitle,
        description:description,
        image:process.env.backendUrl+req.file.filename,
        
     })
     
     res.redirect("/")
})







app.get("/users",async(req,res)=>{
    const datafetch= await registers.findAll()
    res.render("users.ejs",{uimapathakoseconddata:datafetch})
})

/*single page ko lagi hai*/
app.get("/singlePage/:id",async(req,res)=>{
    const id=req.params.id
   const fetchData= await createBlogs.findByPk(id)
    res.render("singlePage.ejs",{data:fetchData})
}
)



// this is for delete operation fully for delete operation
app.get("/delete/:id",async(req,res)=>{
    const id=req.params.id
           await createBlogs.destroy({
                 where: {
                     id: id
                     } 
            });
  res.redirect("/")
})

// delete the username password username single page nabanagai kana
app.get("/single2/:id",async(req,res)=>{
    const id= req.params.id
    await registers.destroy({
        where :{
            id:id
        }
     });
    res.redirect("/users")

})


// update le kunai page magda dekhaune ui handle garda 
app.get("/update/:id",async(req,res)=>{
    const id=req.params.id
      const fetchdata= await createBlogs.findByPk(id)
     console.log(fetchdata)
    res.render("update.ejs",{blogInformation:fetchdata})
})


// now update garne bhaneko data base maa new  value write garne ho so post path hit gareko xa
app.post("/update/:id",uploads.single('image'),async(req,res)=>{
    const id=req.params.id
    const{title,subTitle,description}=req.body
         await createBlogs.update({
            title:title,
            subTitle:subTitle,
            description:description,
            image:process.env.backendUrl+req.file.filename,
         /*yo chai localhost://5000 bhanne code backend url bhanne variable ma store xa so mile access garko if maile localhost://5000 bhanera add garina bhane code le kaam gardaina ra image read garna khojda aaudaina */
          },{          /* image fetcg or lets say read garna agadi localhost lekhane kaam yasle garxa ani yesko lagi env package pani install garnuparxa..backendurl ma k xa bhanera herana env bhanne file ma jada hunxa */
            where:{
                id:id
            }
          })
          res.redirect(`/singlePage/${id}`)
})




const PORT=5000                 /* yo chai generally mero project lai kun port number ma run garaune bhaane ho .. maile chai port number  5000 ma 
                            mero project lai run garako xu ra port number choose garda chai kamtima 3000 bhanda badi garda bhayo kina 
                          bhane reserve port haru huna sakxan 1000 vhanda muniko sabai system le use gareko hunxa so make sure*/
app.listen(PORT,()=>{
    console.log (`node project has started at ${PORT}` )
})





