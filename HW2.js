const os = require('os');
const Table = require('cli-table3');

// Get OS information
const osInfo = {
    'Hostname': os.hostname(),
    'OS Type': os.type(),
    'Platform': os.platform(),
    'Architecture': os.arch(),
    'Release': os.release(),
    'Uptime (seconds)': os.uptime(),
    'Load Average': os.loadavg().join(', '),
    'Total Memory (bytes)': os.totalmem(),
    'Free Memory (bytes)': os.freemem()
};

// Create table
const table = new Table({
    head: ['Property', 'Value']
});

// Populate table with OS information
for (const [property, value] of Object.entries(osInfo)) {
    table.push([property, value]);
}

// Display the table
console.log(table.toString());