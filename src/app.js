import express from 'express';
import cors from 'cors'; // Importa el paquete cors

import empleados from './routes/employees.routes.js';
import base from './routes/index.route.js';

const app = express();

// Habilita CORS para todas las solicitudes
app.use(cors());

app.use(express.json());
app.use('/api', empleados);
app.use('/api',base);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    });
});

export default app;