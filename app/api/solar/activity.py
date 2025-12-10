// Endpoint: GET /api/solar/activity
router.get('/activity', async (req, res) => {
  try {
    // Datos de NASA DSCOVR (ejemplo real)
    const response = await axios.get('https://services.swpc.noaa.gov/json/solar-wind/mag-1-day.json');
