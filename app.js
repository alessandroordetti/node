const http = require('http');
const fs = require('fs');

const html = fs.readFileSync('./Template/index.html', 'utf-8');
const productListHtml = fs.readFileSync('./Template/product.html', 'utf-8');
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf8'));

let productHtmlArray = products.map((prod) => {
    
    let output = productListHtml.replace('{{%NAME%}}', prod.name);
    output = output.replace('{{%IMAGE%}}', prod.productImage);
    output = output.replace('{{%MODELNAME%}}', prod.modeName);
    output = output.replace('{{%MODELNO%}}', prod.modelNumber);
    output = output.replace('{{%CAMERA%}}', prod.camera);
    output = output.replace('{{%SIZE%}}', prod.size);
    output = output.replace('{{%COLOR%}}', prod.color);
    output = output.replace('{{%PRICE%}}', prod.price);

    return output;
})

console.log(productHtmlArray)

const server = http.createServer((request, response) => {
    let path = request.url;

    if(path === '/' || path.toLocaleLowerCase() === '/home'){
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'my-header' : 'Hello Alessandro'
        });

        response.end(html.replace('{{%CONTENT%}}', productHtmlArray))
    } else if (path.toLocaleLowerCase() === '/about'){
        response.writeHead(200, {
            'Content-Type':'text/html',
            'my-header' : 'Hello form about page'
        })

        response.end(html.replace('{{%CONTENT%}}', 'You are in about page'))
    } else if (path.toLocaleLowerCase() === '/products') {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });

        console.log(productHtmlArray);
        response.end(html.replace('{{%CONTENT%}}', productHtmlArray));
    } else {
        response.writeHead(404, {'Content-Type': 'text/html'})
    }
})

server.listen(4000, 'localhost', () => {
    console.log('Server running at port 4000');
})