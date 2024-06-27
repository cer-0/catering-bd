const path = require('path');
const express = require('express');
const router = express.Router();
const db = require('./db_cofiguration');

//Pagina principal

router.get('/', async (req, res) => {
    let connection;
    try {
        connection = await db.initialize();
        const total_items = await connection.execute("select count(*) from producto_sucursal");
        const in_stock = await connection.execute("select count(*) from producto_sucursal where cantidad > 0");
        const out_of_stock = await connection.execute("select count(*) from producto_sucursal where cantidad = 0");
        const total_staff = await connection.execute("select count(*) from empleado");
        const supervisors = await connection.execute("select count(*) from empleado where rol_empleado_id = 1");
        const line_staff = await connection.execute("select count(*) from empleado where rol_empleado_id = 2");
        const drivers = await connection.execute("select count(*) from empleado where rol_empleado_id = 3");
        const coffeemakers = await connection.execute("select count(*) from empleado where rol_empleado_id = 4");
        const total_branches = await connection.execute("select count(*) from sucursal");
        const cdmx_branches = await connection.execute("select count(estado_id) from sucursal join direccion on (sucursal.direccion_id = direccion.id) where estado_id = 1");
        const veracruz_branches = await connection.execute("select count(estado_id) from sucursal join direccion on (sucursal.direccion_id = direccion.id) where estado_id = 2");
        const quintana_roo_branches = await connection.execute("select count(estado_id) from sucursal join direccion on (sucursal.direccion_id = direccion.id) where estado_id = 5");

        res.render('index', {
            title: 'Dashboard',
            total_items: total_items.rows[0][0],
            in_stock: in_stock.rows[0][0],
            out_of_stock: out_of_stock.rows[0][0],
            total_staff: total_staff.rows[0][0],
            supervisors: supervisors.rows[0][0],
            line_staff: line_staff.rows[0][0],
            drivers: drivers.rows[0][0],
            coffeemakers: coffeemakers.rows[0][0],
            total_branches: total_branches.rows[0][0],
            CDMX_branches: cdmx_branches.rows[0][0],
            veracruz_branches: veracruz_branches.rows[0][0],
            quintana_roo_branches: quintana_roo_branches.rows[0][0]
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

//Pagina de productos

router.get('/inventory', async (req, res) => {
    let connection;
    try {
        connection = await db.initialize();
        const result = await connection.execute("select nombre from producto");
        res.render('inventory', {
            title: 'Inventory',
            data: result.rows.map(row => ({nombre: row[0]}))
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

module.exports = router;