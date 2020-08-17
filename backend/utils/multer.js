const multer=require('multer')
const randomstring=require('randomstring')
let storage = multer.diskStorage({
    //-------------------------------logic to upload images at destination
    destination: (req, file, cb)=>{
      cb(null, 'uploads/')
    },
    //-------------------------------logic t
    filename: (req, file, cb)=>{
        let val = file.originalname
        let val1 = val.split(".")
        // let temp = new Date()
        // let date1 = temp.getDate()
        // let month1 =temp.getMonth()
        // let year1 = temp.getFullYear()
        // let time1 = temp.getTime()
        // let value = date1+'-'+month1+'-'+year1+'-'+time1
      cb(null, file.fieldname+randomstring.generate(5)+'.'+val1[1] )
    }
  })

  let upload = multer({ //multer settings
    storage: storage,
    //-------------------------------logic to upload only images
    fileFilter:(req, file, cb)=>{
      if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/webp") {
          cb(null, true)
      } else {
          var newError = new Error("file type is incorrect")
          newError.name == "multerError"
          cb(newError, false)
      }
  },
    limits:{
        fileSize: 1024 * 1024 * 10
    }
})



  //  console.log(storage.filename)


  module.exports=upload