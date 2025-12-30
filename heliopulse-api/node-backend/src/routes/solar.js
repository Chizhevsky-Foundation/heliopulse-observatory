// src/routes/solar.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET /api/solar/activity - Datos solares en tiempo real
router.get('/activity', async (req, res) => {
  try {
    // Ejemplo: Obtener datos de NOAA
    const noaaResponse = await axios.get(
      'https://services.swpc.noaa.gov/products/solar-wind/mag-1-day.json'
    );
    
    const data = noaaResponse.data;
    const latest = data[data.length - 1];
    
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        solarWind: {
          speed: parseFloat(latest[1]) || 0,
          density: parseFloat(latest[2]) || 0,
          temperature: parseFloat(latest[3]) || 0
        },
        magneticField: {
          bx: parseFloat(latest[4]) || 0,
          by: parseFloat(latest[5]) || 0,
          bz: parseFloat(latest[6]) || 0,
          bt: parseFloat(latest[7]) || 0
        }
      },
      source: 'NOAA/SWPC',
      description: 'Datos de viento solar y campo magnético'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener datos solares',
      details: error.message
    });
  }
});

// GET /api/solar/sunspots - Manchas solares
router.get('/sunspots', async (req, res) => {
  try {
    const response = await axios.get(
      'https://services.swpc.noaa.gov/json/solar-cycle/sunspots.json'
    );
    res.json({
      success: true,
      data: response.data,
      currentCycle: 25, // Ciclo solar actual
      description: 'Datos históricos de manchas solares'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
