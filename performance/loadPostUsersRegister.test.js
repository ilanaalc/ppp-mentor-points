import http from 'k6/http';
import {check, sleep} from 'k6';
import { obterBaseURL } from '../utils/variaveis.js';

export const options = {
        vus: 10,
        duration: '30s',

    thresholds: {
        http_req_duration: ['p(95)<2000'],
        http_req_failed: ['rate<0.01']
    }
}

export default function() {
    const url = obterBaseURL() + '/users/register';
    const payload = JSON.stringify({
        name: `user_${Math.random()}`,
        email: `user_${Math.random()}@alunomentoria.com`,
        password: '123456',
        classId: 'T2',
        isAdmin: false
    })

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    const res = http.post(url, payload, params);

    check (res, {
        'O status code deve ser 201': (r) => r.status === 201,
    });

    sleep(1);
};