/*1) необходимо написать сервер, который будет работать на порту 8090

2) при отправке гет запроса с таким урлом http://localhost:8090/user

    необходимо вернуть одного юзера { userName: 'Boria', id: 1, email: 'boria23@gmail.com'}

3) при отправке гет запроса с таким урлом http://localhost:8090/users?id=1, где id может быть одно из чисел которое соответствует одному из id с массива users. В случае если такого юзера не существует то вернуть текст "User with following id does not exist"

    имея*/


const http = require('http');
const url = require('url');

const users = [

    {userName: 'Boria', id: 1, email: 'boria23@gmail.com'},

    {userName: 'Vasia', id: 2, email: 'boria23@gmail.com'},

    {userName: 'Misha', id: 3, email: 'boria23@gmail.com'},

    {userName: 'Misha', id: 3, email: 'boria23@gmail.com'},

    {userName: 'Misha', id: 3, email: 'boria23@gmail.com'},

];

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const uri = url.parse(req.url, true);
    const query = uri.query;
    console.log(query);
    const pathName = uri.pathname;
    if (pathName === ('/user')) {
        res.end(JSON.stringify(users[0]));
    }
    if (pathName === ('/users')) {
        if (query && query.id) {
            const result = users.find(user => {
                if (user.id === query.id) {
                    res.end(JSON.stringify(result));
                }
                res.end(JSON.stringify('User with following id does not exist'));
            });
        }
    }
}).listen(8090, () => console.log('Server is running on port 8090'));

