const express = require('express');
const router = express.Router();
const db = require('./db_cofiguration');

//Endopoint para insertar productos en la base de datos
router.post('/insert-product', async (req, res) => {
    let connection;
    try {
        connection = await db.initialize();
        const { codigo, nombre, descripcion, caducidad} = req.body;
        const tipo = parseInt(req.body.tipo, 10);
        const sucursal = parseInt(req.body.sucursal, 10);
        const cantidad = parseInt(req.body.cantidad, 10);
        
        // Insertar en la tabla producto
        await connection.execute(
            `INSERT INTO producto(codigo, nombre, descripcion, caducidad, tipo_producto_id) 
            VALUES (:codigo, :nombre, :descripcion, TO_DATE(:caducidad, 'YYYY-MM-DD'), :tipo)`,
            {
                codigo,
                nombre,
                descripcion,
                caducidad,
                tipo
            }
        );

        // Insertar en la tabla producto_sucursal
        await connection.execute(
            `INSERT INTO producto_sucursal(producto_codigo, sucursal_id, cantidad) 
            VALUES (:codigo, :sucursal, :cantidad)`,
            {
                codigo,
                sucursal,
                cantidad
            }
        );

        // Commit de la transacción
         await connection.commit();
        res.status(201).redirect('/administration');
    } catch (err) {
        // Rollback de la transacción en caso de error
        if (connection) {
            await connection.rollback();
        }
        res.status(500).send('Error al insertar el producto');
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