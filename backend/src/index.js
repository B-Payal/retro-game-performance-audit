const express = require('express');
const cors = require('cors');
const compression = require('compression'); // Added compression middleware
// Issue B3: Compression missing
const scoreRoutes = require('./routes/scores');

const app = express();
app.use(compression()); // Apply compression middleware
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/scores', scoreRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
