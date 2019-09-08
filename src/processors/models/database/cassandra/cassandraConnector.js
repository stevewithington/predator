let logger = require('../../../../common/logger');
let databaseConfig = require('../../../../config/databaseConfig');
let client;

const INSERT_PROCESSOR = 'INSERT INTO jobs(id, test_id, arrival_rate, cron_expression, duration, emails, environment, ramp_to, webhooks, parallelism, max_virtual_users, notes, proxy_url, debug) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

module.exports = {
    init,
    insertProcessor
};

let queryOptions = {
    consistency: databaseConfig.cassandraConsistency,
    prepare: true
};

async function init(cassandraClient) {
    client = cassandraClient;
}

function insertProcessor(processorId, processorInfo) {
    let params = [processorId, jobInfo.test_id, jobInfo.arrival_rate, jobInfo.cron_expression, jobInfo.duration, jobInfo.emails, jobInfo.environment, jobInfo.ramp_to, jobInfo.webhooks, jobInfo.parallelism, jobInfo.max_virtual_users, jobInfo.notes, jobInfo.proxy_url, jobInfo.debug];
    return executeQuery(INSERT_PROCESSOR, params, queryOptions);
}

function executeQuery(query, params, queryOptions) {
    return client.execute(query, params, { prepare: true }, queryOptions).then((result) => {
        logger.trace('Query result', {
            query: query,
            params: params,
            rows_returned: result.rowLength
        });
        return Promise.resolve(result.rows ? result.rows : []);
    }).catch((exception) => {
        logger.error(`Cassandra query failed \n ${JSON.stringify({ query, params, queryOptions })}`, exception);
        return Promise.reject(new Error('Error occurred in communication with cassandra'));
    });
}