import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import DB_Init from '../Entities/DB_init.js';
import DB_Init from '../routes/*.js';
import createDB from '../database/createDBRoute.js';
import { loginRouter } from '../routes/LoginRouter.js';
import { toDoRouter } from '../routes/ToDoRouter.js';
import UserSchema from '../Entities/User.js';
import ToDoSchema from '../Entities/ToDo.js';
import multer from 'multer';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'; 

env.config();

let app = express();
const upload = multer({ dest: 'uploads/' });

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,PATCH,POST,DELETE'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



DB_Init();
app.use("/api", createDB);
app.use('/api', loginRouter);
app.use("/api", toDoRouter);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ToDoList API',
            description: 'API for managing the list of tasks (ToDo).',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:9000',
                description: 'Local server for development and testing.',
            },
        ],
    },
    apis: ['../routes/*.js'],
    components: {
        schemas: {
            User: UserSchema,
            ToDo: ToDoSchema
        },
    },
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

let port = process.env.PORT || 8001;
app.listen(port);
console.log('API is running at ' + port);
