let id = 0;

function idGenerator() {
    return ++id;
}

class Product {
    counstructor(name, price, amount) {
        this.id = idGenerator();
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.sum = this.sum();
    }

    sum() {
        return this.amount * this.price;
    }
}  

