const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const routes = require('./routes');
const { authenticateJWT } = require('./middleware/auth');

const app = express();
app.use(express.json());

// Swagger
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, '../resources/swagger.json')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
