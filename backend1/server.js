const express = require('express');
const axios = require('axios');
const cors=require('cors');
const app = express();
const PORT = 9876;
const windowSize = 10;
let window = [];


app.use(express.json());
app.use(cors);
app.get('/numbers/:numberId', async (req, res) => {
    const numberId = req.params;
    try {
        const token = await getToken();
        const numbers = await fetchNumbers(numberId);
        if (numbers) {
            const windowPrevState = [...window];
            updateWindow(numbers);
            const windowCurrState = [...window];
            const avg = calculateAverage();

            res.json({ windowPrevState, windowCurrState, numbers, avg });


        } else {
            res.status(500).json(error);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
const getToken = async () => {
    try {
        const data = {
            companyName: "fourGear",
            clientId: "57f11a60-c980-4d2d-bfd1-348e646a78fa",
            clientSecret: "fvqmJtLIfdoJTTyb",
            ownerName: "Anshul Kumar",
            ownerEmail: "anshulkumarx7@gmail.com",
            rollNo: "2105865"
        };

        const response = await axios.post('http://20.244.56.144/test/auth', data);
        return response.data.token;
    } catch (error) {
        throw new Error(`Error getting authorization token: ${error.message}`);
    }
}

const fetchNumbers = () => {
    try {
        const response = await.get(`http://20.244.56.144/test/${numberId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.numbers;

    } catch (error) {
        console.log(error);
        return null;
    }
}
const updateWindow = (newNumbers) => {
    window.push(...numbers);
    if (window.length > windowSize) {
        window = window.slice(-windowSize);
    }

};
const calculateAverage = () => {
    const sum = window.reduce((acc, num) => acc + num, 0);
    return (sum / window.length).toFixed(2);

};


app.listen(PORT, () => {
    console.log(`Server is running`);
});
