const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const presidenteRoutes = require('./routes/presidente.routes');
const votanteRoutes = require('./routes/votante.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/presidentes',presidenteRoutes);
app.use('/api/votantes',votanteRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend corriendo en puerto ${PORT}`));