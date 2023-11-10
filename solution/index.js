var Product = /** @class */ (function () {
    function Product(name, domestic, price, description, weight) {
        this.name = name;
        this.domestic = domestic;
        this.price = price;
        this.description = description;
        this.weight = weight;
    }
    Product.prototype.getPrice = function () {
        return "$".concat(this.price.toFixed(1));
    };
    Product.prototype.getWeight = function () {
        return this.weight ? "".concat(this.weight, "g") : 'N/A';
    };
    Product.prototype.getInfo = function () {
        return "... ".concat(this.name, "\nPrice: ").concat(this.getPrice(), "\n").concat(this.description, "\nWeight: ").concat(this.getWeight());
    };
    return Product;
}());
var Inventory = /** @class */ (function () {
    function Inventory() {
        this.products = [];
    }
    Inventory.prototype.addProduct = function (product) {
        this.products.push(product);
    };
    Inventory.prototype.getProductsByCategory = function (isDomestic) {
        return this.products.filter(function (product) { return product.domestic === isDomestic; });
    };
    Inventory.prototype.getTotalCost = function (isDomestic) {
        var products = this.getProductsByCategory(isDomestic);
        return products.reduce(function (total, product) { return total + product.price; }, 0);
    };
    Inventory.prototype.getTotalCount = function (isDomestic) {
        var products = this.getProductsByCategory(isDomestic);
        return products.length;
    };
    Inventory.prototype.displayProducts = function (isDomestic) {
        var products = this.getProductsByCategory(isDomestic);
        var sortedProducts = products.sort(function (a, b) { return a.name.localeCompare(b.name); });
        return sortedProducts.map(function (product) { return product.getInfo(); }).join('\n');
    };
    Inventory.prototype.displayInventory = function () {
        console.log(". Domestic");
        console.log(this.displayProducts(true));
        console.log(". Imported");
        console.log(this.displayProducts(false));
        console.log("Domestic cost: $".concat(this.getTotalCost(true).toFixed(1)));
        console.log("Imported cost: $".concat(this.getTotalCost(false).toFixed(1)));
        console.log("Domestic count: ".concat(this.getTotalCount(true)));
        console.log("Imported  count: ".concat(this.getTotalCount(false)));
    };
    return Inventory;
}());
fetch('https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1')
    .then(function (response) { return response.json(); })
    .then(function (response) {
    var inventory = new Inventory();
    response.forEach(function (item) {
        var product = new Product(item.name, item.domestic, item.price, item.description, item.weight);
        inventory.addProduct(product);
    });
    inventory.displayInventory();
})
    .catch(function (error) {
    console.error(error);
});
