import http from 'k6/http';
import {check, sleep} from 'k6';
import { obterBaseURL } from '../utils/variaveis.js';
import { cadastrarUsuarioK6 } from '../helpers/cadastrarUsuario.js';

export const options = {
        // vus: 10,
        // duration: '30s',
        iterations: 1,

    thresholds: {
        http_req_duration: ['p(95)<2000'],
        http_req_failed: ['rate<0.01']
    }
}

export default function() {
    cadastrarUsuarioK6();
    const url = obterBaseURL() + '/users/login';
    const payload = JSON.stringify({
        email: 'julio@mentoria.com',
        password: '123456',
    })

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    const res = http.post(url, payload, params);

    check (res, {
        'O status code deve ser 200': (r) => r.status === 200,
    });

    sleep(1);
};