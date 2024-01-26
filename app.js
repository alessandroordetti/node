const http = require('http');
const fs = require('fs');
const url = require('url');

const html = fs.readFileSync('./Template/index.html', 'utf-8');
const productListHtml = fs.readFileSync('./Template/product.html', 'utf-8');
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf8'));



function replaceHtml(template, product){
    let output = template.replace('{{%NAME%}}', product.name);
    output = output.replace('{{%IMAGE%}}', product.productImage);
    output = output.replace('{{%MODELNAME%}}', product.modeName);
    output = output.replace('{{%MODELNO%}}', product.modelNumber);
    output = output.replace('{{%CAMERA%}}', product.camera);
    output = output.replace('{{%SIZE%}}', product.size);
    output = output.replace('{{%COLOR%}}', product.color);
    output = output.replace('{{%PRICE%}}', product.price);
    output = output.replace('{{%ID%}}', product.id);


    return output;
}

const server = http.createServer((request, response) => {
    //let path = request.url;

    let {query, pathname: path} = url.parse(request.url, true);

    /* console.log(query); */

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
        if(!query.id){
            products.map((prod) =>{
                replaceHtml(productListHtml, prod)
            })

            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
    
            let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','))
            response.end(productResponseHtml);
        } else {
            response.end('This is product with id = ' + query.id )
        }


    } else {
        response.writeHead(404, {'Content-Type': 'text/html'})
    }
})

server.listen(4000, 'localhost', () => {
    console.log('Server running at port 4000');
})