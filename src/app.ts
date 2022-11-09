import express from 'express';
import {JsonRpcEngine} from 'json-rpc-engine';
import bodyParser from 'body-parser';
import {getProvider} from './EthereumUtils';
import {ethers} from 'ethers';

const PORT = process.env.PORT || 3000;

const app = express();
const engine = new JsonRpcEngine();
const provider = getProvider();

app.use(bodyParser.json())

engine.push(async function (req, res, next, end) {
    try {
        const zkSyncProviderRes = await provider.send(req.method, req.params);
        console.log('zkSyncProviderRes = ', zkSyncProviderRes)
        res.result = zkSyncProviderRes;
        end();
    } catch (error) {
        console.log(error);
        end(error);
    }

});

app.post('/', async (req, res) => {
    try {
        const response = await engine.handle(req.body);
        console.log(response)
        res.json(response);
    } catch (error) {
        console.log(error)
        res.status(500);
        res.json(error);
    }
});

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});
