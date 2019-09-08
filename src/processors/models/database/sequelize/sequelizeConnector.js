'use strict';

const Sequelize = require('sequelize');
let client;

module.exports = {
    init,
    insertProcessor
};

async function init(sequelizeClient) {
    client = sequelizeClient;
    await initSchemas();
}

async function insertProcessor(processorId, processorInfo) {
    const processor = client.model('processor');
    let params = {
        id: processorId
    };
    return processor.create(params);
}

async function initSchemas() {
    const job = client.define('processor', {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true
        }
    });

    await job.sync();
}