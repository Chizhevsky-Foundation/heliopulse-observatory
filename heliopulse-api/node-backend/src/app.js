# En src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Importar rutas
const solarRoutes = require('./routes/solar');

// Usar rutas
app.use('/api/solar', solarRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 HelioPulse API running on port ${PORT}`);
});
