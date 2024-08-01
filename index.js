import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { getHealth } from './controllers/health.js';
import {
    postPlant,
    getPlants,
    getPlantId,
    putPlantId,
    deletePlantId
} from './controllers/plant.js';
import { handlePageNotFound } from './controllers/error.js'; // Corrected import name

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true // Ensure index creation in background
        });
        console.log('Mongodb Connected');
    } catch (error) {
        console.error('Mongodb connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

dbConnection();

//temp data
const plants = [
    {
        id: 1,
        names: 'bamboo',
        category: 'outdoor',
        image: 'https://masonhome.in/cdn/shop/files/WhatsAppImage2024-05-13at1.00.07PM_11.jpg',
        price: 190,
        description: 'is is very best tree'
    },
    {
        id: 6,
        names: 'rose',
        category: 'outdoor',
        image: 'https://masonhome.in/cdn/shop/files/WhatsAppImage2024-05-13at1.00.07PM_11.jpg',
        price: 100,
        description: 'is is very best tree'
    },
    {
        id: 3,
        names: 'mango',
        category: 'outdoor',
        image: 'https://masonhome.in/cdn/shop/files/WhatsAppImage2024-05-13at1.00.07PM_11.jpg',
        price: 1090,
        description: 'is is very best tree'
    }
];

app.get('/health', getHealth);

app.post('/plant', postPlant);

app.get('/plants', getPlants);

app.get('/plant/:id', getPlantId);

app.put('/plant/:id', putPlantId);

app.delete('/plant/:id', deletePlantId);

app.use('*', handlePageNotFound);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});