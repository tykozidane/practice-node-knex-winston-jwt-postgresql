const winston = require('winston')
const expresswinston = require('express-winston')
const moment = require('moment-timezone')
require('winston-daily-rotate-file')

module.exports = {
    request: expresswinston.logger({
        meta: true,
        transports:[
            new winston.transports.DailyRotateFile({
                filename: "./logs/%DATE%.log",
                datePattern: "YYYY/MM/DD",
                zippedArchive: false,
                frequency: '24h'
            })

        ],
        format: winston.format.printf((info) => {
            var arr = [];
            arr.push(moment.tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss.SSS'));
            arr.push(info.meta.req.headers.idReq);
            arr.push('REQ');
            arr.push(info.meta.req.method); //! Method
            arr.push(info.meta.req.url); //! Url
            arr.push(JSON.stringify(info.meta.req.headers)); //! Headers
            arr.push(JSON.stringify(info.meta.req.body)); //! Request Body
            return(arr).join(' | ');
        }),
        requestWhitelist: ['body', 'url', 'headers', 'method', 'ip', 'idReq'],
        responseWhitelist: ['body'],
    }),
    response: expresswinston.logger({
        meta: true,
        skip: function (req, res) {
            if (req.url == '/api/v1/gate/mode-info') return true;
        },
        transports: [
            new winston.transports.DailyRotateFile({
                filename: "./logs/%DATE%.log",
                datePattern: "YYYY/MM/DD",
                zippedArchive: false,
                frequency: '24h'
            }),
            new winston.transports.Console({
                json: true,
                colorize: true
            }),
        ],
        format: winston.format.printf((info) => {
            var arr = [];
            arr.push(moment.tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss.SSS')); //! Timestamp
            arr.push(info.meta.req.headers.idReq); //! ID
            arr.push('RES'); //! Name
            arr.push(info.meta.req.method); //! Method
            arr.push(info.meta.res.statusCode); //! Http Status
            
            arr.push(info.meta.req.ip); //! Remote Address
            arr.push(info.meta.req.url); //! Url
            arr.push(info.meta.responseTime); //! Response Time
            // if(!info.meta.res.body){
            //     arr.push("Data Tidak Ditemukan"); //Body Kosong
            // } else {
                arr.push(JSON.stringify(info.meta.res.body)); //! Headers                
            // }
            
            
            return (arr).join(' | ')
        }),
        requestWhitelist: ['body', 'url', 'headers', 'method', 'ip'],
        responseWhitelist: ['body', 'statusCode'],
    })
}