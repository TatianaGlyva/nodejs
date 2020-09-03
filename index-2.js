/*1) Заимлементить сервер на порту 3000

2) Сервер должен реагировать на POST запрос /user , принимая такое body { school: 'Hillel', course: 'javascript pro'},
и необходимо добавить поле teacher: 'Sergei' к этому обьекту и вернуть его*/


const http = require('http');

http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    const methods = ['POST', 'OPTIONS'];
    if(methods.includes(req.method) && req.url === '/post') {
        let body = [];
        req
            .on('data', (chunk) => {
                body.push(chunk)
            })
            .on('end', () => {
                body = String(body);
                if(body) {
                    const r = JSON.parse(body);
                    r.teacher = 'Sergei';
                    res.end(JSON.stringify(r))
                }
                res.end(JSON.stringify({}));
            });
    }
}).listen(3000, () => console.log('Server is running on port 3000'));