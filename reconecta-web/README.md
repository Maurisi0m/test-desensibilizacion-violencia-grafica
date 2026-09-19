# ReConecta Digital 🧠⚡
> **Plataforma Web de Concientización, Diagnóstico Psicométrico y Primeros Auxilios Psicológicos ante Contenido Violento Gráfico en Redes Sociales**

---

## 📌 Visión General
**ReConecta Digital** es una plataforma web completa de salud mental digital diseñada para jóvenes y adolescentes de **12 a 29 años**. Permite autoevaluar de forma rigurosa la desensibilización emocional y cognitiva producida por la exposición algorítmica pasiva o la búsqueda activa de contenido gráfico violento en redes sociales (TikTok, Reels, Twitter/X, Telegram).

Cuenta con:
1. **Instrumento Psicométrico ED-CVG (20 reactivos Likert)** calibrado por edad (12-17 años adolescente y 18-29 años joven/adulto).
2. **Algoritmo Clínico Multidimensional**: cálculo de Índice Global de Desensibilización (0-100%), 4 subescalas psicométricas, desbalance consumo incidental vs. activo ($\Delta$), constructs cognitivos (Desconexión Moral de Bandura, Sesgo de Disponibilidad de Kahneman, Mundo Hostil de Lerner, Teoría de la Mente) e intervenciones de Terapia Cognitivo-Conductual (TCC).
3. **Base de Datos Propia (SQLite)**: Almacenamiento persistente de participantes y respuestas ítem por ítem con vista de auditoría histórica e inspección detallada.
4. **Módulo de Primeros Auxilios Psicológicos (SOS)**:
   - Pacer de **Respiración Vagal 4-7-8** con síntesis binaural (Web Audio API).
   - Secuencia de **Anclaje Sensorial (Grounding 5-4-3-2-1)** paso a paso.
   - Líneas de emergencia y apoyo en crisis 24/7.
5. **Guías de Blindaje Algorítmico**: Filtros de contenido sensible y palabras clave bloqueadas para TikTok, Instagram, Twitter/X y Telegram.
6. **Reto Detox de 7 Días**: Registro de hábitos de higiene digital con persistencia en navegador (`localStorage`).

---

## 🛠️ Stack Tecnológico
- **Frontend**: React 18, Vite, Vanilla CSS con Design System Glassmorphism Dark Mode y tipografía *Plus Jakarta Sans*.
- **Backend / API**: Node.js v22/v24, Express, arquitectura RESTful.
- **Base de Datos**: SQLite nativo (`node:sqlite` / `DatabaseSync`), sin dependencias de compilación C++ nativas problemáticas. Esquema relacional con llaves foráneas y eliminación en cascada.
- **Contenedores**: `Dockerfile` multi-stage (Node Alpine) + `docker-compose.yml` con volumen persistente para producción.

---

## 🚀 Cómo Ejecutar el Proyecto

### Opción 1: Desarrollo Local (Node.js)
Requisitos: Node.js v20+ o v22+ instalado.

1. Instalar dependencias:
   ```bash
   cd reconecta-web
   npm install
   ```

2. Modo desarrollo simultáneo (Frontend Vite + Backend Express):
   ```bash
   npm run dev
   ```
   - Frontend disponible en: `http://localhost:5173`
   - API Backend disponible en: `http://localhost:3000`

3. Modo producción local:
   ```bash
   npm run build
   npm start
   ```
   - Plataforma completa disponible en: `http://localhost:3000`

---

### Opción 2: Despliegue con Docker y Docker Compose
La plataforma está lista para desplegarse en cualquier VPS, servidor cloud o servidor local con Docker:

```bash
cd reconecta-web
docker-compose up --build -d
```

- La aplicación estará corriendo en `http://localhost:3000`
- La base de datos SQLite se almacena en el volumen Docker persistente `reconecta_db_data` (mapeado a `/app/server/data`).
- Para detener el servicio:
  ```bash
  docker-compose down
  ```

---

## 📊 Endpoints de la API REST

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/health` | Estado del servidor y tiempo de actividad |
| `POST` | `/api/evaluations` | Envía y evalúa un test de 20 reactivos, guardando participante y respuestas |
| `GET` | `/api/evaluations` | Obtiene el historial de todas las evaluaciones registradas |
| `GET` | `/api/evaluations/:id` | Obtiene el detalle completo de un test incluyendo respuestas ítem por ítem |
| `DELETE` | `/api/evaluations/:id` | Elimina un registro de la base de datos (con borrado en cascada) |

---

## 🔒 Privacidad y Ética
El test psicométrico no solicita nombres reales obligatorios ni recopila cookies de rastreo de terceros. Los datos quedan almacenados localmente en la base de datos propia del proyecto (`server/data/reconecta.db`).
