import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import router from './routes/authRoutes';
import routerBuku from './routes/bukuRoutes';
import bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swaggerConfig';

const app = express();
dotenv.config();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Router 
app.use('/api', router)
app.use('/api/buku', routerBuku)

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Connect Database
const urlMongo = process.env.DATABASE_URL as string;
const port = process.env.PORT || 4500;
mongoose.connect(urlMongo)
try {
    console.log('Connect MongoDb')
    app.listen(port, () => {
        console.log(`Server Running  http://localhost:${port}`)
    })
} catch {
    console.error('Error Connecting to MongoDB or Starting Server')
}

export default app;