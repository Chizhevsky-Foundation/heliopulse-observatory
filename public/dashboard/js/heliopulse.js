// 🌌 HELIOPULSE DASHBOARD SCRIPT - Versión arreglada

class HelioPulseDashboard {
    constructor() {
        this.baseUrl = window.location.origin;
        this.data = {
            solar: null,
            chizhevsky: null,
            geomagnetic: null
        };
        this.init();
    }

    init() {
        console.log('🚀 Inicializando Dashboard HelioPulse');
        this.setupEventListeners();
        this.loadInitialData();
        this.setupAutoRefresh();
    }

    setupEventListeners() {
        // Botón de actualización manual
        document.getElementById('refresh-btn')?.addEventListener('click', () => this.loadInitialData());
        
        // Toggle de auto-refresh
        document.getElementById('auto-refresh-toggle')?.addEventListener('change', (e) => {
            this.autoRefresh = e.target.checked;
            this.updateStatus(`Auto-refresh: ${this.autoRefresh ? 'ON' : 'OFF'}`);
        });
    }

    async loadInitialData() {
        this.updateStatus('🔄 Cargando datos cósmicos...');
        
        try {
            // Cargar datos en paralelo
            await Promise.all([
                this.loadSolarData(),
                this.loadChizhevskyAnalysis(),
                this.loadGeomagneticData()
            ]);
            
            this.updateStatus('✅ Datos cargados correctamente');
            this.updateDashboard();
            
        } catch (error) {
            console.error('Error cargando datos:', error);
            this.updateStatus('❌ Error cargando datos', true);
            this.showFallbackData();
        }
    }

    async loadSolarData() {
        try {
            const response = await fetch(`${this.baseUrl}/api/solar/status`);
            const data = await response.json();
            
            if (data.success) {
                this.data.solar = data;
                return true;
            }
            throw new Error(data.error || 'Error en datos solares');
        } catch (error) {
            console.warn('Usando datos simulados solares');
            this.data.solar = this.getSimulatedSolarData();
            return false;
        }
    }

    async loadChizhevskyAnalysis() {
        try {
            // Usar datos reales si están disponibles
            const kp = this.data.solar?.data?.solarWind?.speed ? 
                Math.min(10, this.data.solar.data.solarWind.speed / 100) : 4.5;
            const sunspots = this.data.solar?.data?.sunspotCycle?.sunspotNumber || 75;
            
            const response = await fetch(
                `${this.baseUrl}/api/analysis/chizhevsky?kp=${kp}&sunspots=${sunspots}`
            );
            const data = await response.json();
            
            if (data.success) {
                this.data.chizhevsky = data;
                return true;
            }
            throw new Error(data.error || 'Error en análisis Chizhevsky');
        } catch (error) {
            console.warn('Usando análisis Chizhevsky simulado');
            this.data.chizhevsky = this.getSimulatedChizhevskyData();
            return false;
        }
    }

    async loadGeomagneticData() {
        try {
            const response = await fetch(`${this.baseUrl}/api/solar/geomagnetic`);
            const data = await response.json();
            
            if (data.success) {
                this.data.geomagnetic = data;
                return true;
            }
            throw new Error(data.error || 'Error en datos geomagnéticos');
        } catch (error) {
            console.warn('Usando datos geomagnéticos simulados');
            this.data.geomagnetic = this.getSimulatedGeomagneticData();
            return false;
        }
    }

    updateDashboard() {
        // Actualizar datos solares
        if (this.data.solar) {
            this.updateSolarPanel();
        }
        
        // Actualizar análisis Chizhevsky
        if (this.data.chizhevsky) {
            this.updateChizhevskyPanel();
        }
        
        // Actualizar datos geomagnéticos
        if (this.data.geomagnetic) {
            this.updateGeomagneticPanel();
        }
        
        // Actualizar timestamp
        this.updateTimestamp();
    }

    updateSolarPanel() {
        const solar = this.data.solar;
        const windSpeed = solar.data?.solarWind?.speed || 350;
        const sunspots = solar.data?.sunspotCycle?.sunspotNumber || 75;
        
        // Actualizar valores
        this.setElementText('solar-wind', `${windSpeed.toFixed(0)}`);
        this.setElementText('sunspots', `${sunspots.toFixed(0)}`);
        
        // Actualizar barra de riesgo
        const riskPercent = Math.min(100, (windSpeed / 800) * 100);
        this.setElementStyle('solar-risk', 'width', `${riskPercent}%`);
        
        // Actualizar estado
        let statusText, statusClass;
        if (windSpeed > 500) {
            statusText = '🌪️ Alta velocidad - Vigilancia';
            statusClass = 'status-danger';
        } else if (windSpeed > 400) {
            statusText = '🌤️ Velocidad moderada';
            statusClass = 'status-warning';
        } else {
            statusText = '☀️ Velocidad normal';
            statusClass = 'status-good';
        }
        
        this.setElementHTML('solar-status', 
            `<span class="status-indicator ${statusClass}"></span> ${statusText}`
        );
    }

    updateChizhevskyPanel() {
        const analysis = this.data.chizhevsky?.analysis;
        if (!analysis) return;
        
        const index = analysis.chizhevskyIndex || 5.5;
        
        // Actualizar valores
        this.setElementText('chizhevsky-index', index.toFixed(2));
        this.setElementText('chizhevsky-level', analysis.riskLevel || 'Moderado');
        
        // Actualizar barra
        const excitabilityPercent = Math.min(100, (index / 12) * 100);
        this.setElementStyle('excitability-level', 'width', `${excitabilityPercent}%`);
        
        // Actualizar detalles
        if (analysis.predictions) {
            this.setElementText('social-impact', analysis.predictions.socialTension || '--');
            this.setElementText('creative-potential', analysis.predictions.creativeOutburst || '--');
            this.setElementText('conflict-risk', analysis.predictions.conflictProbability || '--');
        }
        
        // Color según nivel
        let color = '#ffd700'; // Amarillo por defecto
        if (index < 4) color = '#00ff88';    // Verde
        if (index > 7) color = '#ff6b35';    // Naranja
        if (index > 9) color = '#ff0000';    // Rojo
        
        this.setElementStyle('chizhevsky-index', 'color', color);
    }

    updateGeomagneticPanel() {
        const geomag = this.data.geomagnetic;
        const kpValue = geomag.kpIndex?.value || 3;
        
        // Actualizar valores
        this.setElementText('kp-index', kpValue.toFixed(1));
        this.setElementText('kp-level', geomag.kpIndex?.level || 'Tranquilo');
        this.setElementText('geomagnetic-status', 
            geomag.kpIndex?.stormWarning ? '⚠️ Tormenta' : '✅ Estable'
        );
        
        // Aurora
        if (geomag.aurora) {
            this.setElementText('aurora-visibility', geomag.aurora.visibility || 'Baja');
            this.setElementText('aurora-latitude', geomag.aurora.latitude || '60°');
        }
    }

    updateTimestamp() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
        const dateStr = now.toLocaleDateString('es-ES');
        
        this.setElementText('last-update', `${dateStr} ${timeStr}`);
    }

    updateStatus(message, isError = false) {
        const statusEl = document.getElementById('status-message');
        if (statusEl) {
            statusEl.textContent = message;
            statusEl.style.color = isError ? '#ff6b35' : '#00ff88';
        }
        
        // También agregar al log
        this.addToLog(message, isError);
    }

    addToLog(message, isError = false) {
        const logEl = document.getElementById('data-log');
        if (logEl) {
            const entry = document.createElement('div');
            entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
            entry.style.color = isError ? '#ff6b35' : '#aaa';
            entry.style.fontSize = '0.8rem';
            entry.style.margin = '2px 0';
            
            logEl.prepend(entry);
            
            // Mantener máximo 10 entradas
            if (logEl.children.length > 10) {
                logEl.removeChild(logEl.lastChild);
            }
        }
    }

    showFallbackData() {
        // Datos de respaldo cuando la API falla
        this.setElementText('solar-wind', '350');
        this.setElementText('sunspots', '75');
        this.setElementText('chizhevsky-index', '5.5');
        this.setElementText('kp-index', '3.5');
        
        this.setElementHTML('solar-status',
            '<span class="status-indicator status-warning"></span> Usando datos simulados'
        );
        
        this.addToLog('⚠️ Mostrando datos simulados - API no disponible', true);
    }

    setupAutoRefresh() {
        // Actualizar cada 30 segundos
        setInterval(() => {
            if (this.autoRefresh !== false) {
                this.loadInitialData();
            }
        }, 30000);
    }

    // Métodos de utilidad
    setElementText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    setElementHTML(id, html) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
    }

    setElementStyle(id, property, value) {
        const el = document.getElementById(id);
        if (el) el.style[property] = value;
    }

    getSimulatedSolarData() {
        return {
            success: true,
            data: {
                solarWind: {
                    speed: 350 + Math.random() * 200,
                    density: 5 + Math.random() * 3
                },
                sunspotCycle: {
                    sunspotNumber: 50 + Math.random() * 100,
                    cycle: 25
                }
            }
        };
    }

    getSimulatedChizhevskyData() {
        const index = 4 + Math.random() * 6;
        return {
            success: true,
            analysis: {
                chizhevskyIndex: index,
                riskLevel: index < 4 ? 'Baja' : index < 7 ? 'Moderada' : 'Alta',
                predictions: {
                    socialTension: index < 4 ? 'Estable' : index < 7 ? 'Moderada' : 'Alta',
                    creativeOutburst: (index * 1.2).toFixed(1),
                    conflictProbability: (index * 0.8).toFixed(1)
                }
            }
        };
    }

    getSimulatedGeomagneticData() {
        const kp = 2 + Math.random() * 5;
        return {
            success: true,
            kpIndex: {
                value: kp,
                level: kp < 4 ? 'Tranquilo' : kp < 6 ? 'Inestable' : 'Tormenta',
                stormWarning: kp >= 6
            },
            aurora: {
                visibility: kp < 4 ? 'Baja' : kp < 6 ? 'Media' : 'Alta',
                latitude: Math.round(60 - (kp * 3))
            }
        };
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.helioPulse = new HelioPulseDashboard();
    
    // Agregar controles si no existen
    if (!document.getElementById('refresh-btn')) {
        const controls = document.createElement('div');
        controls.innerHTML = `
            <div style="position: fixed; top: 10px; right: 10px; z-index: 1000; background: rgba(0,0,0,0.8); padding: 10px; border-radius: 5px;">
                <button id="refresh-btn" style="background: #ffd700; color: black; border: none; padding: 5px 10px; border-radius: 3px; margin-right: 10px; cursor: pointer;">
                    🔄 Actualizar
                </button>
                <label style="color: white; font-size: 0.9rem;">
                    <input type="checkbox" id="auto-refresh-toggle" checked> Auto-refresh
                </label>
            </div>
            <div id="status-message" style="position: fixed; bottom: 10px; left: 10px; background: rgba(0,0,0,0.8); padding: 5px 10px; border-radius: 3px; font-size: 0.9rem;">
                Sistema iniciado
            </div>
        `;
        document.body.appendChild(controls);
    }
});
