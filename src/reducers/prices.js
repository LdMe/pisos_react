const prices = (prices = [], action) => {
    switch (action.type) {
        case 'CREATE':
            return [...prices, action.payload];
        case 'FETCH_ALL':
            return action.payload;
        case 'DELETE':
            return prices.filter((price) => price._id !== action.payload);
        case 'UPDATE':
            return prices.map((price) => price._id === action.payload._id ? action.payload : price);
        case 'LIKE':
            return prices.map((price) => price._id === action.payload._id ? action.payload : price);
        default:
            return prices;
    }
}

export default prices;