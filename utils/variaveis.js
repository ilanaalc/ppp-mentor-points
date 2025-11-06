const configLocal = JSON.parse(open('../config/config.local.json'));
export function obterBaseURL() {
    return __ENV.API_BASE_URL || configLocal.baseURL;
}