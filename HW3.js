const axios = require('axios');
const fs = require('fs/promises');

const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
const dataFile = 'data.json';

// Send GET request to the API
axios.get(apiUrl)
    .then(response => {
        const data = response.data;

        // Write data to data.json file
        fs.writeFile(dataFile, JSON.stringify(data, null, 2))
            .then(() => {
                console.log('Data written to', dataFile);
            })
            .catch(err => {
                console.error('Error writing data to file:', err);
            });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
