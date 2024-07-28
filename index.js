import express from "express";
import dotenv from "dotenv"
dotenv.config()

const app = express();
app.use(express.json());

const plants = [
    {
        "id":1,
        "names":"bamboo",
        "category":"outdoor",
        "image":"https://masonhome.in/cdn/shop/files/WhatsAppImage2024-05-13at1.00.07PM_11.jpg",
        "price":190,
        "description":"is is very best tree"
    },
    {
        "id": 6,
        "names": "rose",
        "category": "outdoor",
        "image": "https://masonhome.in/cdn/shop/files/WhatsAppImage2024-05-13at1.00.07PM_11.jpg",
        "price": 100,
        "description": "is is very best tree"
    },
    {
        "id": 3,
        "names": "mango",
        "category": "outdoor",
        "image": "https://masonhome.in/cdn/shop/files/WhatsAppImage2024-05-13at1.00.07PM_11.jpg",
        "price": 1090,
        "description": "is is very best tree"
    }
];

app.post("/plant", (req, res) => {
    const {
        names,
        category,
        image,
        price,
        description,
    } = req.body;

    if(!names){
       return res.json({
            success:false,
            data:null,
            message:"name cannot be empty"
        })
    }

    const randomId = Math.round(Math.random() * 10000);

    const newPlant = {
        id: randomId, // Fixed this to use the variable randomId instead of the string "randomId"
        names: names,
        category: category,
        image: image,
        price: price,
        description: description,
    };

    plants.push(newPlant);

    res.json({
        success: true,
        data: newPlant,
        message: "New plant added successfully" // Fixed the typo in the message
    });
})

app.get("/plants",(req,res)=>{
    res.json({
        success:true,
        data:plants,
        message:"All plants fetched successfully"
    })
})

app.get("/plant/:id",(req,res)=>{
    const{id} = req.params

    const plant = plants.find((p)=>p.id == id)

    res.json({
        success:plant? true:false,
        data:plant || null,
        message:plant ? "plants fetched successfully" : "plant not found"
    })

})

app.put("/plant/:id",(req,res)=>{
    const{id} =req.params

    let index = -1
    plants.forEach((plant,i)=>{
        if(plant.id == id){
            index=i
        }
    })

const newObj = {
    id,
    names,
    category,
    image,
    price,
    description
}
if(index==-1){
    return res.json({
        success:false,
        message:`plant not found for id ${id}`,
        data:null
    })
}
else{
    plants[index] = newObj

    return res.json({
        success:true,
        message:`plant update successfully`,
        data:newObj

    })
}
})

app.delete("/plant/:id",(req,res)=>{
    const{id} = req.params

    let index = -1

    plants.forEach((plant,i)=>{
        if(plant.id==id){
            index = i
        }
    })

    if(index==-1){
        return res.json({
            success:false,
            message:`plant not found with id ${id}`,
        })
    }

    plants.splice(index,1)

    res.json({
        success:true,
        message:"plant deleted successfully",
        data:null

})
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})