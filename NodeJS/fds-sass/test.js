const os = require('os');
console.log(os.platform());
console.log(os.freemem());

const m = require('./module');
console.log(m.name);
