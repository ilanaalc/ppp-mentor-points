import http from 'k6/http';
import { obterBaseURL } from '../utils/variaveis.js';

export function cadastrarUsuarioK6() {
    const url = obterBaseURL() + '/users/register';
    const payload = JSON.stringify({
        name: 'julio',
        email: 'julio@mentoria.com',
        password: '123456',
        classId: '',
        isAdmin: true
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    const res = http.post(url, payload, params);
    return res;
}