// CORE MODULES
const http = require('http');
const fs = require('fs');
const url = require('url');

//CUSTOM MODULES
const replaceHtml = require('./Modules/replaceHtml.js');

const html = fs.readFileSync('./Template/index.html', 'utf-8');
const productListHtml = fs.readFileSync('./Template/product.html', 'utf-8');
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf8'));
let productDetailHtml = fs.readFileSync('./Template/product-details.html', 'utf8')



const server = http.createServer((request, response) => {
    //let path = request.url;

    let {query, pathname: path} = url.parse(request.url, true);

    if(path === '/' || path.toLocaleLowerCase() === '/home'){
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'my-header' : 'Hello Alessandro'
        });

        response.end('You are in homepage')
    } else if (path.toLocaleLowerCase() === '/about'){
        response.writeHead(200, {
            'Content-Type':'text/html',
            'my-header' : 'Hello form about page'
        })

        response.end(html.replace('{{%CONTENT%}}', 'You are in about page'))
    } else if (path.toLocaleLowerCase() === '/products') {
        if(!query.id){
            productHtmlArray = products.map((product) =>{
                return replaceHtml(productListHtml, product)
            })

            response.writeHead(200, {'Content-Type': 'text/html'});
    
            let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','))

            response.end(productResponseHtml);

        } else {
            productId = products[query.id];
            let productDetailResponseHtml = replaceHtml(productDetailHtml, productId);
            response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml))
        }


    } else {
        response.writeHead(404, {'Content-Type': 'text/html'})
    }
})

server.listen(4000, 'localhost', () => {
    console.log('Server running at port 4000');
})