const os = require("os");


function getServerStats() {
    try {
        const loadAverage = os.loadavg();
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = ((totalMemory - freeMemory) / 1024 / 1024).toFixed(2);
        const uptime = (os.uptime() / 3600).toFixed(2);;

        let text = `
        Memory: ${usedMemory} MB / ${(totalMemory / 1024 / 1024).toFixed(2)} MB 
CPU (1, 5, 15 mins average load): ${loadAverage} 
Uptime: ${uptime} hours | ${(uptime/24).toFixed(0)} days ${(uptime%24).toFixed(0)} hours
        `
        
        return text
    
    } catch (err) {
        return err;
    }
};

module.exports = { getServerStats };
