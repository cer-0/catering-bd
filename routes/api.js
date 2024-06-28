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

router.post('/insert-employee', async (req, res) => {
    let connection;
    try {
        connection = await db.initialize();
        const { nombre, apellido_paterno, apellido_materno, correo, lada, telefono} = req.body;
        const rol_de_empleado  = parseInt(req.body.rol_de_empleado, 10);
        const bilingue = parseInt(req.body.bilingue === 'on' ? '1' : '0', 10);
        const sucursal = parseInt(req.body.sucursal, 10);
        
        // Insertar en la tabla producto
        await connection.execute(
            `insert into empleado(nombre, apellido_paterno, apellido_materno, correo_empleado, lada, telefono, 
            rol_empleado_id, bilingue_id, sucursal_id) 
            values(:nombre, :apellido_paterno, :apellido_materno, :correo, 
            :lada, :telefono, :rol_de_empleado, :bilingue, :sucursal)`,
            {
                nombre,
                apellido_paterno,
                apellido_materno,
                correo,
                lada,
                telefono,
                rol_de_empleado,
                bilingue,
                sucursal
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
        res.status(500).send('Error al insertar el empleado');
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

//Endopoint para eliminar productos en la base de datos
router.post('/delete-product', async (req, res) => {
    let connection;
    try {
        connection = await db.initialize();
        const codigo = req.body.codigo;

        // Eliminar en la tabla producto

        // await connection.execute(
        //     `DELETE FROM producto_sucursal WHERE lower(producto_codigo) = lower(:codigo)`,
        //     {
        //         codigo
        //     }
        // );
        

        await connection.execute(
            `DELETE FROM producto WHERE lower(codigo) = lower(:codigo)`,
            {
                codigo
            }
        );

        // Commit de la transacción
         await connection.commit();
        res.status(201).redirect('/inventory');
    } catch (err) {
        // Rollback de la transacción en caso de error
        if (connection) {
            await connection.rollback();
        }
        res.status(500).send('Error al eliminar el producto');
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