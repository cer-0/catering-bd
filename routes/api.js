const express = require("express");
const router = express.Router();
const db = require("./db_cofiguration");

router.get("/cantidad_de_productos", async (req, res) => {
    let connection;
    try {
        connection = await db.initialize();
        const result = await connection.execute("select sum(cantidad) from producto_sucursal");
        const cantidad = result.rows[0][0];
        res.json({ cantidad });
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
    }
);

module.exports = router;