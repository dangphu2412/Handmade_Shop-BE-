## This is short description about models relation in sequelize

# One to one relation

```
# Example: User has One Role

- User will have roleId
- Role hasOne User
- User belongsTo Role

# In models Role: 
- Role.hasOne(models.User, {
    as: "users" ~ alias,
    foreignKey: "roleId" ~ In table user
})

- User.belongsTo(models.Role, {
    as: "roles" ~ alias,
    foreignKey: "roleId" ~ In table user
})
```

# One to many relation

```
# Example: User has Many Product

- Product will have userId
- User hasMany Product
- Product belongsTo User

# In models Role: 
- User.hasMany(models.Product, {
    as: "products" ~ alias,
    foreignKey: "userId" ~ In table user
})

- Product.belongsTo(models.User, {
    as: "users" ~ alias,
    foreignKey: "userId" ~ In table user
})
```

# Many to many relation

```
# Example: 
* Product has Many Tag
* Tag has Many Product

- Will have a middle table called: ProductTag
- Contains: productId & tagId

# In models Role: 
- Product.belongsToMany(models.Tag, {
    as: "products" ~ alias,
    through: "ProductTag",
    foreignKey: "productId" ~ In table Product
    otherKey: "tagId" ~ In table Tag
})

- Tag.belongsTo(models.Product, {
    as: "tags" ~ alias,
    through: "ProductTag",
    foreignKey: "tagId" ~ In table Tag
    otherKey: "productId" ~ In table Product
})
```

## Alias in this project

# Users - Roles - Permissions - 