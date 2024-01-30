function replaceHtml(template, product) {
    let output = template.replace('{{%NAME%}}', product.name);
    output = output.replace('{{%IMAGE%}}', product.productImage);
    output = output.replace('{{%MODELNAME%}}', product.modeName);
    output = output.replace('{{%MODELNO%}}', product.modelNumber);
    output = output.replace('{{%CAMERA%}}', product.camera);
    output = output.replace('{{%SIZE%}}', product.size);
    output = output.replace('{{%COLOR%}}', product.color);
    output = output.replace('{{%PRICE%}}', product.price);
    output = output.replace('{{%ID%}}', product.id);
    output = output.replace('{{%DESC%}}', product.Description);

    return output;
}

module.exports = replaceHtml;