const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.static(path.join(process.cwd(), 'build/')));

app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
