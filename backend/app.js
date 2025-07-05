const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan'); // ✅ importá Morgan
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const presidenteRoutes = require('./routes/presidente.routes');   
const votanteRoutes = require('./routes/votante.routes');

const app = express();

// ✅ Usa Morgan en modo "dev" para ver logs de las requests
app.use(morgan('dev'));
app.use(cors({
  //habilita a recibir preflight requests
  origin: 'http://localhost:4200',
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use('/health', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/presidentes', presidenteRoutes);
app.use('/api/votantes', votanteRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend corriendo en puerto ${PORT}`));
