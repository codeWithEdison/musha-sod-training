var Category;
(function (Category) {
    Category[Category["ELECTRONIC"] = 0] = "ELECTRONIC";
    Category[Category["CLOTHING"] = 1] = "CLOTHING";
    Category[Category["FOOD"] = 2] = "FOOD";
    Category[Category["BOOKS"] = 3] = "BOOKS";
})(Category || (Category = {}));
// function to calculate subtotal
function calculateSubTot(items) {
    return items.reduce(function (total, item) { return total + item.price * item.quantity; }, 0);
}
// function to calculate total discount 
function applyDiscount(items) {
    var totaDiscount = 0;
    // count total item in cart 
    var totalItems = items.reduce(function (count, item) { return count + item.quantity; }, 0);
    // $10 off entire order when buying 5+ items
    if (totalItems >= 5) {
        totaDiscount += 10;
    }
    // 10% off when buying 2+ books 
    var bookItems = items.filter(function (item) { return item.category === Category.BOOKS; });
    var totalBooksQty = bookItems.reduce(function (count, bookItem) { return count + bookItem.quantity; }, 0);
    var booksSubTotal = bookItems.reduce(function (total, bookItem) { return total + bookItem.price * bookItem.quantity; }, 0);
    if (totalBooksQty >= 2) {
        totaDiscount += booksSubTotal * 0.1;
    }
    // 20% off when buying 3+ clothing items
    var clothingItems = items.filter(function (item) { return item.category === Category.CLOTHING; });
    var totalClothingQty = clothingItems.reduce(function (count, clothingItem) { return count + clothingItem.quantity; }, 0);
    var clothingSubTotal = clothingItems.reduce(function (total, clothingItem) { return total + clothingItem.price * clothingItem.quantity; }, 0);
    if (totalClothingQty >= 3) {
        totaDiscount += clothingSubTotal * 0.2;
    }
    // 5% off electronics over $500 total
    var electronicItems = items.filter(function (item) { return item.category === Category.ELECTRONIC; });
    var electronicSubTotal = electronicItems.reduce(function (total, electronicItem) { return total + electronicItem.price * electronicItem.quantity; }, 0);
    if (electronicSubTotal > 500) {
        totaDiscount += electronicSubTotal * 0.05;
    }
    return totaDiscount;
}
// Calculate the final total after discounts
function calculateTotal(items) {
    var subtotal = calculateSubTot(items);
    var discount = applyDiscount(items);
    return subtotal - discount;
}
// Test with example data
var cart = [
    { id: '1', name: 'JavaScript Book', price: 45, quantity: 2, category: Category.BOOKS },
    { id: '2', name: 'T-shirt', price: 25, quantity: 1, category: Category.CLOTHING },
    { id: '3', name: 'Headphones', price: 120, quantity: 1, category: Category.ELECTRONIC },
];
console.log('Subtotal:', calculateSubTot(cart));
console.log('Discount:', applyDiscount(cart));
console.log('Total:', calculateTotal(cart));
