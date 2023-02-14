const fetch = require('node-fetch-retry');
const {Service} = require("./Service");

const refreshDelay = 15;

const services = {
    'AAT': getServices('aat'),
    'PERFTEST': getServices('perftest'),
    'ITHC': getServices('ithc'),
    'DEMO': getServices('demo'),
    'PROD': getServices('prod')
}
    
function getAllServiceStatus() {
    return services;
}

function getCcdServices(env) {
if(env === 'demo' || env === 'ithc'){
    return new Service('em-ccdorc', `http://em-ccdorc-${env}.service.core-compute-${env}.internal`)
  }else{
    return new Service('em-ccd-orchestrator', `http://em-ccd-orchestrator-${env}.service.core-compute-${env}.internal`)
  }
}

function getServices(env) {

    return [
        
        new Service('dg-docassembly', `http://dg-docassembly-${env}.service.core-compute-${env}.internal`),
        new Service('em-stitching', `http://em-stitching-${env}.service.core-compute-${env}.internal`),
        new Service('em-anno', `http://em-anno-${env}.service.core-compute-${env}.internal`),
        new Service('dm-store', `http://dm-store-${env}.service.core-compute-${env}.internal`),
        new Service('em-npa', `http://em-npa-${env}.service.core-compute-${env}.internal`),
        new Service('em-hrs-api', `http://em-hrs-api-${env}.service.core-compute-${env}.internal`),
        getCcdServices(env)
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