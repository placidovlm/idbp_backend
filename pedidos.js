
var express = require('express');
var router = express.Router();

var dateFormat = require('dateformat');
var now = new Date();
var agora = dateFormat(now, "dd/mm/yyyy HH:MM:ss");
console.log(agora + ': Serviço iniciado');



router.post
('/', function (req, res) {
    
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
            .input("igreja_destino", sql.VarChar(60), req.body.igreja_destino)    
            .input("nome_solicitante", sql.VarChar(60), req.body.nome_solicitante)
            .input("telefone_solicitante", sql.VarChar(15), req.body.telefone_solicitante)
            .input("datahora_pedido", sql.DateTime2, Date())
            .input("autorizacao_ligacao", sql.Bit, req.body.autorizacao_ligacao)
            .input("pedido_oracao", sql.Text, req.body.pedido_oracao)  
            .input("oracao_respondida", sql.Bit, req.body.oracao_respondida)
            .input("area_oracao", sql.VarChar(40), req.body.area_oracao)  
            .input("email_solicitante", sql.VarChar(40), req.body.email_solicitante)  
            .input("oracao_publica", sql.Bit, 0) 
            .query('INSERT INTO TB_ORACAO (igreja_destino, nome_solicitante, telefone_solicitante,datahora_pedido,autorizacao_ligacao,pedido_oracao,oracao_respondida,area_oracao, email_solicitante, oracao_publica)' 
                + ' VALUES (@igreja_destino, @nome_solicitante, @telefone_solicitante, @datahora_pedido, @autorizacao_ligacao, @pedido_oracao, @oracao_respondida, @area_oracao, @email_solicitante, @oracao_publica);')

            console.log(req.body);
            var now = new Date();
            var agora = dateFormat(now, "dd/mm/yyyy HH:MM:ss");
            console.log(agora + '-> POST Pedidos');
            res.json(result1.recordset)


        } catch (err) {
            // ... error checks
            console.log(err);
        }
    })()

    sql.on('error', err => {
        // ... error handler
        console.log(err);
    })

});


module.exports = router;