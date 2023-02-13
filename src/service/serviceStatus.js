const fetch = require('node-fetch-retry');
const {Service} = require("./Service");

const refreshDelay = 15;

const services = {
    'AAT': [ 
        getServices('aat'),
        new Service('em-ccd-orchestrator',`http://em-ccd-orchestrator-aat.service.core-compute-aat.internal`)
    ],
    'PERFTEST': [
        getServices('perftest'), 
        new Service('em-ccd-orchestrator',`http://em-ccd-orchestrator-perftest.service.core-compute-perftest.internal`)
    ],
    'ITHC': [
        getServices('ithc'), 
        new Service('em-ccdorc',`http://em-ccdorc-ithc.service.core-compute-ithc.internal`)
    ],
    'DEMO': [
        getServices('demo'),
        new Service('em-ccdorc',`http://em-ccdorc-demo.service.core-compute-demo.internal`)
    ], 
    'PROD':[ 
        getServices('prod'), 
        new Service('em-ccd-orchestrator',`http://em-ccd-orchestrator-prod.service.core-compute-prod.internal`)
    ]
    
}
    
function getAllServiceStatus() {
    return services;
}

function getServices(env) {

    return [
        new Service('dg-docassembly', `http://dg-docassembly-${env}.service.core-compute-${env}.internal`),
        new Service('em-stitching', `http://em-stitching-${env}.service.core-compute-${env}.internal`),
        new Service('em-anno', `http://em-anno-${env}.service.core-compute-${env}.internal`),
        new Service('dm-store', `http://dm-store-${env}.service.core-compute-${env}.internal`),
        new Service('em-npa', `http://em-npa-${env}.service.core-compute-${env}.internal`),
        new Service('em-hrs-api', `http://em-hrs-api-${env}.service.core-compute-${env}.internal`),
    ]
}

function monitorStatus() {
    Object.entries(services).forEach(([env, services]) => {
        services.forEach(service => {
            const controller = new AbortController();
            const signal = controller.signal;

            new Promise((resolve, reject) => {
                fetch(service.url + '/health', { signal, retry: 3, pause: 1500, silent: true })
                    .then(response => resolve(response.json()))
                    .catch(() => reject);

                setTimeout(() => {
                    controller.abort();
                    reject();
                }, refreshDelay * 1000);
            })
                .then(data => {
                    if(data.status === 'UP') {
                        service.setLastSeen((Date.now()));
                    }
                })
                .catch(() => {
                    console.log('Failed to connect to ' + service.url + ' after 3 retries.');
                });
        })
    })
}

monitorStatus();
setInterval(monitorStatus, refreshDelay * 1000)

module.exports.getAllServiceStatus = getAllServiceStatus;