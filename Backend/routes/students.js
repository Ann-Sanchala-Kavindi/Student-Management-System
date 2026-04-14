const router=require("express").Router();

let Student=require("../models/student.js");

router.route("/add").post((req,res)=>{
      
    const name=req.body.name;
    const age=req.body.age;
    const gender=req.body.gender;
    const address=req.body.address;

    const newStudent=new Student({
        name,
        age,
        gender,
        address
    })

    newStudent.save().then(()=>{

        res.json("Student Added");

    }).catch((err)=>{

        console.log(err);       
    });
        

});

router.route("/find").get((req,res)=>{

    Student.find().then((students)=>{
        res.json(students);
    }).catch((err)=>{
        console.log(err);
    })
});


router.route("/find/:id").get(async(req,res)=>{

    let userId=req.params.id;

    const user=await Student.findById(userId)
    .then((user)=>{
        res.status(200).send({status:"Student Fetched",user});
        console.log(user);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with fetching data",error:err.message});
    })
});



router.route("/update/:studentId").put(async(req,res)=>{

    let userId=req.params.studentId;

    const{name,age,gender,address}=req.body;

    const updateStudent={
        name,
        age,
        gender,
        address
    }

    const update=await Student.findByIdAndUpdate(userId,updateStudent)
    .then(()=>{
        res.status(200).send({status:"Student Updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});

    })
})

router.route("/delete/:studentId").delete(async(req,res)=>{

    let userId=req.params.studentId;

    await Student.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"Student Deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with deleting data",error:err.message});
    })
})


module.exports=router;
  

