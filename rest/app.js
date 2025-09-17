const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const authRoutes = require('./routes/auth');
const lojasRoutes = require('./routes/lojas');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de Lojas - Trabalho Final');
});

app.use('/auth', authRoutes);
app.use('/lojas', lojasRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
