const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("../../services/logger");

const configure = (app) => {
try{
    require('dotenv').config();

    app.use(bodyParser.urlencoded({
        extended: true,
    }))
    app.use(bodyParser.json({limit:'2mb'}))
    app.use(cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204,
      }))
    return app;
}catch(ex){
    logger.error(`[critical-error]- ${JSON.stringify(ex)}`);
}
};

module.exports = configure;
