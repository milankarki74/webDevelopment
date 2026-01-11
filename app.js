const express= require("express")
const { createBlogs, registers } = require("./model/index")/* yo import nagarda jhan khatra error aauxa  */




const app =express()  /*  yo chai generally express lai use garne code ... yeslai chai majjale memorize garda pani bhayo
                       node js ko sabai ma yo chahinxa chahinxa yo bina posssible chaaina api haru banauna */

app.set('view engine','ejs') /*yo chai node lai hami le ejs use garim hai bhanera bhaneko.. abo go to left 
                             side ma jane ra euta folder"views" same name ko banaune"*/


 require("./model/index")  /*  yo chai database ko lagi ho.. main file matra bujxa ni ta app.js le so
                        mile model bhanne folder ko index.js ma chai database ko code xa hai bhanera bhanidiye */
 
app.use(express.urlencoded({extended:true}))  /*yo code le chai maile paxi frontend bata pathako data lai nodejs lai bujauna 
                                                 help garxa ra yo code bhayena bhane paxi fornt end bata data pathauda node js le un
                                              undefined  bhanera bhandinxa*/

app.use(express.json())  /* yo code le chai jaba tapai backend matra garnu hudai xa like api testai jasto kaam than tetikhera 
                              tapaile post man ko use garnu hunxa ..but node le post man bata pathako jun data xa tyo ni bujdai na 
                              json format ko so yo code le post man bata json format ma aako data node js lai chinaune kaam garxa*/
 




 app.get("/",async(req,res)=>{
        const aakodata=  await createBlogs.findAll()
        
    res.render("home.ejs",{uimapathako:aakodata})

})









app.get("/register",(req,res)=>{
    res.render("register.ejs")
})

app.post("/register",async(req,res)=>{

  const{email,userName,password}=req.body /* yo jun email,userName xa yo form ko name sanga match garnuparxa natra error aauxa hai */
    if(!email || !userName || !password){  /*yo server side validation ho */
        res.send("please fill the form")
    }
    
  await registers.create({
    email:email,
    userName:userName,
    password:password,

   })
   res.send("register successfully")
   

})

app.get("/addblog",(req,res)=>{
    res.render("addBlog.ejs")
})

app.post("/addblog",async(req,res)=>{
 const title=req.body.title
 const subTitle=req.body.subTitle
 const   description =req.body.description
  
     await createBlogs.create({  /*yo create bhaneko mero model ko name ho ie table ko name  */
        title:title,
        subTitle:subTitle,
        description:description
     })
     
     res.redirect("/")
})






const PORT=5000  /* yo chai generally mero project lai kun port number ma run garaune bhaane ho .. maile chai port number  5000 ma 
                            mero project lai run garako xu ra port number choose garda chai kamtima 3000 bhanda badi garda bhayo kina 
                            bhane reserve port haru huna sakxan 1000 vhanda muniko sabai system le use gareko hunxa so make sure*/
app.listen(PORT,()=>{
    console.log (`node project has started at ${PORT}` )
})





