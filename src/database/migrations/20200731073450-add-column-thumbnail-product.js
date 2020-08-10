const { Models } = require("../models");

const { Product } = Models;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "thumbnail", {
      allowNull: false,
      defaultValue: "https://i.ibb.co/9cj28M4/blank-profile-pic.jpg",
      type: Sequelize.STRING,
    });

    const products = await Product.scope("gallery", "withThumbnail").findAll();
    await Promise.all(
      products.map((product) => {
        const { gallery } = product;
        const thumbnail = gallery[0].src;
        const payload = {
          id: product.id,
          thumbnail,
        };
        return Product.update(payload, {
          where: { id: product.id },
        });
      }),
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "thumbnail");
  },
};
