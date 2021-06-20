import Cookies from 'js-cookie'


const async csrfFetch = (url, options = {}) => {
    options.headers = options.headers || {};
    options.method = options.method || 'GET';

    if (options.method.toUpperCase() !== 'GET') {
        options.headers['XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
        options.headers['Content-Type'] = options.headers['Content-Type'] || "application/json"
    }

    const res = await window.fetch(url, options)
    if (res.status >= 400) throw res;

    return res;
}

export default csrfFetch;
