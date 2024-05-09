const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});