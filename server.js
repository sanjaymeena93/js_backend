const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const setupSwagger = require('./config/swagger'); 

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Mount API Routes
app.use('/api/v1', apiRoutes);

// Setup Swagger UI Documentation
setupSwagger(app);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Structured Mock Backend running on http://localhost:${PORT}`);
});