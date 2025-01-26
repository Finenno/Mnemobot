// const os = require("os");


// function getServerStats() {
//     try {
//         const loadAverage = os.loadavg();
  
//         const totalMemory = os.totalmem();
//         const freeMemory = os.freemem();
//         const usedMemory = ((totalMemory - freeMemory) / 1024 / 1024).toFixed(2);
//         const uptime = (os.uptime() / 3600).toFixed(2);;

//         let text = `
//         Memory: ${usedMemory} MB / ${(totalMemory / 1024 / 1024).toFixed(2)} MB
//         CPU (1, 5, 15 mins average load): ${loadAverage} 
//         Uptime: ${uptime} hours
//         `
//         console.log(text)
//         return text
    
//     } catch (err) {
//         return err;
//     }
// };

// function monitorServer() {
//     const loadAverage = os.loadavg()[0]; 
//     const cpuCount = os.cpus().length; 
//     const cpuLoadPercent = ((loadAverage / cpuCount) * 100).toFixed(2);

//     const totalMemory = os.totalmem();
//     const freeMemory = os.freemem();
//     const memoryUsage = (((totalMemory - freeMemory) / totalMemory) * 100).toFixed(2);

//     if (cpuLoadPercent > CPU_THRESHOLD) {
//         console.log(`⚠️ CPU is overloaded: ${cpuLoadPercent}%`);
//     }

//     if (memoryUsage > MEMORY_THRESHOLD) {
//         console.log(`⚠️ Memory usage is high: ${memoryUsage}%`);
//     }
// };

// getServerStats();


// module.exports = { getServerStats, monitorServer };