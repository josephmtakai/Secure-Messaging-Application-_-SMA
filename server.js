const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config.json');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
