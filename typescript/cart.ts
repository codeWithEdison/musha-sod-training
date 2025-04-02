
enum Category{
    ELECTRONIC,
    CLOTHING,
    FOOD,
    BOOKS
}
type CartItem = {
    id: number| string;
    name: string;
    price: number;
    quantity: number;
    category: Category
}
// function to calculate subtotal
 function calculateSubTot(items: CartItem[]) : number{
    return items.reduce((total, item) => total +  item.price * item.quantity, 0)
 }

 // function to calculate total discount 
 function applyDiscount(items : CartItem[]): number{
    let totaDiscount = 0;

    // count total item in cart 

    const totalItems = items.reduce((count, item) => count + item.quantity, 0);

    // $10 off entire order when buying 5+ items
    if(totalItems >= 5){
        totaDiscount += 10;
    }
    // 10% off when buying 2+ books 
    const bookItems = items.filter(item => item.category === Category.BOOKS);
    const totalBooksQty = bookItems.reduce((count, bookItem) => count + bookItem.quantity, 0);
    const booksSubTotal  = bookItems.reduce((total, bookItem) => total + bookItem.price * bookItem.quantity, 0);
    if(totalBooksQty >= 2){
        totaDiscount += booksSubTotal * 0.1;
    }

     // 20% off when buying 3+ clothing items
    const clothingItems = items.filter(item => item.category === Category.CLOTHING);
    const totalClothingQty = clothingItems.reduce((count, clothingItem) => count + clothingItem.quantity, 0);
    const clothingSubTotal  = clothingItems.reduce((total, clothingItem) => total + clothingItem.price * clothingItem.quantity, 0);
    if(totalClothingQty >= 3){
        totaDiscount += clothingSubTotal * 0.2;
    }

      // 5% off electronics over $500 total
    const electronicItems = items.filter(item => item.category === Category.ELECTRONIC);
    const electronicSubTotal  = electronicItems.reduce((total, electronicItem) => total + electronicItem.price * electronicItem.quantity, 0);
    if(electronicSubTotal > 500){
        totaDiscount += electronicSubTotal * 0.05;
    }
    return totaDiscount;
}

// Calculate the final total after discounts
function calculateTotal(items: CartItem[]): number{
    const subtotal = calculateSubTot(items);
    const discount = applyDiscount(items);
    return subtotal - discount;
}

// Test with example data
const cart: CartItem[] = [
    { id: '1', name: 'JavaScript Book', price: 45, quantity: 2, category: Category.BOOKS },
    { id: '2', name: 'T-shirt', price: 25, quantity: 1, category: Category.CLOTHING },
    { id: '3', name: 'Headphones', price: 120, quantity: 1, category: Category.ELECTRONIC },
  ];


console.log('Subtotal:', calculateSubTot(cart));
console.log('Discount:', applyDiscount(cart));
console.log('Total:', calculateTotal(cart));