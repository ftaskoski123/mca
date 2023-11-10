class Product {
    name: string;
    domestic: boolean;
    price: number;
    description: string;
    weight?: number;
  
    constructor(name: string, domestic: boolean, price: number, description: string, weight?: number) {
      this.name = name;
      this.domestic = domestic;
      this.price = price;
      this.description = description;
      this.weight = weight;
    }
  
    getPrice(): string {
      return `$${this.price.toFixed(1)}`;
    }
  
    getWeight(): string {
      return this.weight ? `${this.weight}g` : 'N/A';
    }
  
    getInfo(): string {
      return `... ${this.name}\nPrice: ${this.getPrice()}\n${this.description}\nWeight: ${this.getWeight()}`;
    }
  }
  
  class Inventory {
    products: Product[];
  
    constructor() {
      this.products = [];
    }
  
    addProduct(product: Product): void {
      this.products.push(product);
    }
  
    getProductsByCategory(isDomestic: boolean): Product[] {
      return this.products.filter(product => product.domestic === isDomestic);
    }
  
    getTotalCost(isDomestic: boolean): number {
      const products = this.getProductsByCategory(isDomestic);
      return products.reduce((total, product) => total + product.price, 0);
    }
  
    getTotalCount(isDomestic: boolean): number {
      const products = this.getProductsByCategory(isDomestic);
      return products.length;
    }
  
    displayProducts(isDomestic: boolean): string {
      const products = this.getProductsByCategory(isDomestic);
      const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));
      return sortedProducts.map(product => product.getInfo()).join('\n');
    }
  
    displayInventory(): void {
      console.log(`. Domestic`);
      console.log(this.displayProducts(true));
      console.log(`. Imported`);
      console.log(this.displayProducts(false));
      console.log(`Domestic cost: $${this.getTotalCost(true).toFixed(1)}`);
      console.log(`Imported cost: $${this.getTotalCost(false).toFixed(1)}`);
      console.log(`Domestic count: ${this.getTotalCount(true)}`);
      console.log(`Imported  count: ${this.getTotalCount(false)}`);
    }
  }
  
  fetch('https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1')
    .then(response => response.json())
    .then((response: any) => {
      const inventory = new Inventory();
  
      response.forEach((item: any) => {
        const product = new Product(item.name, item.domestic, item.price, item.description, item.weight);
        inventory.addProduct(product);
      });
  
      inventory.displayInventory();
    })
    .catch(error => {
      console.error(error);
    });
  