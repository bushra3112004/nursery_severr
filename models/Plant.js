import { Schema,model } from "mongoose";
const PlantSchema=new Schema({
    name:String,
    category:String,
    image:String,
    price:Number,
    description:String
},{
    timestamps:true
})

const Plant = model("Plant",PlantSchema)
export default Plant