class Product {
    constructor(name, domestic, price, description, weight) {
      this.name = name;
      this.domestic = domestic;
      this.price = price;
      this.description = description;
      this.weight = weight;
    }
  
    getPrice() {
      return `$${this.price.toFixed(1)}`;
    }
  
    getWeight() {
      return this.weight ? `${this.weight}g` : 'N/A';
    }
  
    getInfo() {
      return `... ${this.name}\nPrice: ${this.getPrice()}\n${this.description}\nWeight: ${this.getWeight()}`;
    }
  }
  
  class Inventory {
    constructor() {
      this.products = [];
    }
  
    addProduct(product) {
      this.products.push(product);
    }
  
    getProductsByCategory(isDomestic) {
      return this.products.filter(product => product.domestic === isDomestic);
    }
  
    getTotalCost(isDomestic) {
      const products = this.getProductsByCategory(isDomestic);
      return products.reduce((total, product) => total + product.price, 0);
    }
  
    getTotalCount(isDomestic) {
      const products = this.getProductsByCategory(isDomestic);
      return products.length;
    }
  
    displayProducts(isDomestic) {
      const products = this.getProductsByCategory(isDomestic);
      const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));
      return sortedProducts.map(product => product.getInfo()).join('\n');
    }
  
    displayInventory() {
      console.log(`. Domestic`);
      console.log(this.displayProducts(true));
      console.log(`. Imported`);
      console.log(this.displayProducts(false));
      console.log(`Domestic cost: $${this.getTotalCost(true).toFixed(1)}`);
      console.log(`Imported cost: $${this.getTotalCost(false).toFixed(1)}`);
      console.log(`Domestic count: ${this.getTotalCount(true)}`);
      console.log(`Imported count: ${this.getTotalCount(false)}`);
    }
  }
  
  fetch('https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1')
    .then(response => response.json())
    .then(response => {
      const inventory = new Inventory();
  
      response.forEach(item => {
        const product = new Product(item.name, item.domestic, item.price, item.description, item.weight);
        inventory.addProduct(product);
      });
  
      inventory.displayInventory();
    })
    .catch(error => {
      console.error(error);
    });