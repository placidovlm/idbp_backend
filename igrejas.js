
var express = require('express');
var router = express.Router();

var dateFormat = require('dateformat');
var now = new Date();
var agora = dateFormat(now, "dd/mm/yyyy HH:MM:ss");
console.log(agora + ': Serviço iniciado');
var igrejas = [];


router.get('/', function (req, res) {


    var config = {
        user: 'admin',
        port: 1521,
        password: 'Manaus2019',
        server: 'pazmanaus.cpky04z0f3t7.sa-east-1.rds.amazonaws.com',
        database: 'Banco_Oracao',

    };

    const sql = require('mssql');

    (async function () {
        try {
            let pool = await sql.connect(config)
            let result1 = await pool.request()
                .query('SELECT * FROM TB_IGREJA')

            console.dir(result1.recordset)
            var now = new Date();
            var agora = dateFormat(now, "dd/mm/yyyy HH:MM:ss");
            console.log(agora + ' -> GET Igrejas');
            res.json(result1.recordset)


        } catch (err) {
            // ... error checks
        }
    })()

    sql.on('error', err => {
        // ... error handler
    })

});

module.exports = router;