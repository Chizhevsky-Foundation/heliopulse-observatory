// ☀️ SERVICIO DE DATOS SOLARES
const axios = require("axios");

class SolarService {
  constructor() {
    this.noaaBaseUrl = process.env.NOAA_API_BASE || "https://services.swpc.noaa.gov";
  }
  
  async getSolarWind() {
    try {
      const response = await axios.get(
        `${this.noaaBaseUrl}/products/solar-wind/mag-1-day.json`
      );
      return this.processWindData(response.data);
    } catch (error) {
      console.error("Error obteniendo viento solar:", error.message);
      return this.getFallbackData();
    }
  }
  
  async getSunspots() {
    try {
      const response = await axios.get(
        `${this.noaaBaseUrl}/json/solar-cycle/sunspots.json`
      );
      return response.data;
    } catch (error) {
      return { sunspotNumber: 75, cycle: 25, date: new Date().toISOString() };
    }
  }
  
  async getGeomagneticIndices() {
    try {
      const [kpResponse, dstResponse] = await Promise.all([
        axios.get(`${this.noaaBaseUrl}/products/geospace/geopack-latest.json`),
        axios.get(`${this.noaaBaseUrl}/products/geospace/dst-latest.json`)
      ]);
      
      return {
        kp: kpResponse.data[0]?.kp || 0,
        dst: dstResponse.data[0]?.dst || 0,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return { kp: 3, dst: -10, timestamp: new Date().toISOString() };
    }
  }
  
  processWindData(data) {
    if (!data || data.length === 0) {
      return this.getFallbackData();
    }
    
    const latest = data[data.length - 1];
    return {
      speed: parseFloat(latest[1]) || 0,
      density: parseFloat(latest[2]) || 0,
      temperature: parseFloat(latest[3]) || 0,
      magneticField: {
        bx: parseFloat(latest[4]) || 0,
        by: parseFloat(latest[5]) || 0,
        bz: parseFloat(latest[6]) || 0,
        bt: parseFloat(latest[7]) || 0
      },
      timestamp: latest[0]
    };
  }
  
  getFallbackData() {
    return {
      speed: 350 + Math.random() * 200,
      density: 5 + Math.random() * 3,
      temperature: 100000 + Math.random() * 50000,
      magneticField: {
        bx: 2 * (Math.random() - 0.5),
        by: 3 * (Math.random() - 0.5),
        bz: 4 * (Math.random() - 0.5),
        bt: 5 + Math.random() * 3
      },
      timestamp: new Date().toISOString(),
      isSimulated: true
    };
  }
}

module.exports = new SolarService();
