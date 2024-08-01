import Plant  from "../models/Plant.js";


const postPlant = async(req, res) => {
    const {
        names,
        category,
        image,
        price,
        description,
    } = req.body;



    const newPlant = new Plant ({
        names: names,
        category: category,
        image: image,
        price: price,
        description: description,
    });

    const savePlant = await newPlant.save();

    res.json({
        success: true,
        data: newPlant,
        message: "New plant added successfully" // Fixed the typo in the message
    });
}

const getPlants = async (req, res) => {
  const allPlants=await Plant.find().sort({createAt:-1})

    res.json({
        success: true,
        data: plants,
        message: "All plants fetched successfully"
    })
}

const getPlantId = async (req, res) => {
    const { id } = req.params

    const plant =await Plant.findById(id)


    res.json({
        success: plant ? true : false,
        data: plant || null,
        message: plant ? "plants fetched successfully" : "plant not found"
    })

}

const putPlantId = async (req, res) => {
    const{
        names,
        category,
        image,
        price,
        description
    }=req.body

    const { id } = req.params
    
    const updateResult=await Plant.updateOne({_id:id},{
        $set:{
            names:names,
            category:category,
            image:image,
            price:price,
            description:description
        }
    })

    const updatePlant = await Plant.findById(id)
    
}

const deletePlantId =async (req, res) => {
    const { id } = req.params

    await Plant.deleteOne({
        _id:id
    })
    res.json({
        success: true,
        message: "plant deleted successfully",
        data: null

    })
}

export{
    postPlant,
    getPlants,
    getPlantId,
    putPlantId,
    deletePlantId
}