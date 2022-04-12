require('dotenv');

const sanityClient = require("@sanity/client");  
const sanity = { 
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2022-03-27'
};

var client;
if (sanity.projectId) {
    client = sanityClient({...sanity, useCdn: false, token: process.env.SANITY_READ_TOKEN});
}
module.exports = client; 
