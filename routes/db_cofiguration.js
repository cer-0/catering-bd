const oracledb = require('oracledb');

// Archivo de configuración de conexión JSON
const connectionConfig = {
    user: 'elbicho',
    password: '1234',
    connectString: 'localhost:1521/xepdb1'
};

// Función para establecer la conexión y exportarla
async function initialize() {
    let connection;
    try {
        connection = await oracledb.getConnection(connectionConfig);
        console.log('Connected to the Oracle database.');
        return connection;
    } catch (err) {
        console.error('Error connecting to the database:', err.message);
        throw err;
    }
}

module.exports.initialize = initialize;