## Below is format of data create shop

{
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    cardNumber: DataTypes.STRING,
    bank: DataTypes.STRING,
    bankAccount: DataTypes.STRING,
    products: [
        {
            categoryId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            slug: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.NUMBER,
            amount: DataTypes.NUMBER,
            status: DataTypes.BOOLEAN,
            materialId: [],
            transportId: []
        },
        ...
    ]
}