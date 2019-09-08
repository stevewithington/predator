'use strict';
const logger = require('../../common/logger'),
    uuid = require('uuid'),
    databaseConnector = require('./database/databaseConnector');

module.exports.createProcessor = async function (processor) {
    let processorId = uuid.v4();
    try {
        await databaseConnector.insertProcessor(processorId, processor);
        logger.info('Processor saved successfully to database');
    } catch (error) {
        logger.error(error, 'Error occurred trying to create new processor');
        return Promise.reject(error);
    }
};