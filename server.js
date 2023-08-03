const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors()); // This will enable CORS

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json()); // for parsing application/json

app.post('/save-image', async (req, res) => {
    const url = req.body.url;
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'utf-8');
        fs.writeFileSync(path.resolve(__dirname, './src/assets/cropped/image.png'), buffer);
        return res.json({ success: true, message: 'Image saved successfully!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
});

app.get('/download-image', (req, res) => {
    const filePath = path.resolve(__dirname, './src/assets/cropped/image.png');
    res.download(filePath);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
