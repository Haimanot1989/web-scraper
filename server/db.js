const typeorm = require("typeorm");

class Creator {
  constructor(id, name, img, ytURL) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.ytURL = ytURL;
  }
}
class Product {
  constructor(id, name, label_price, unit_price, url, image_url) {
    this.id = id;
    this.name = name;
    this.label_price = label_price;
    this.unit_price = unit_price;
    this.url = url;
    this.image_url = image_url;
  }
}

const EntitySchema = require("typeorm").EntitySchema;

const CreatorSchema = new EntitySchema({
  name: "Creator",
  target: Creator,
  columns: {
    id: { primary: true, type: "int", generated: true },
    name: { type: "varchar" },
    img: { type: "text" },
    ytURL: { type: "text" }
  }
});

const ProductSchema = new EntitySchema({
  name: "Product",
  target: Product,
  columns: {
    id: { primary: true, type: "int", generated: false },
    name: { type: "varchar" },
    label_price: { type: "varchar" },
    unit_price: { type: "varchar" },
    url: { type: "text" },
    image_url: { type: "text" }
  }
});
async function getConnection() {
  return await typeorm.createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "haitekie",
    database: "setuptourist",
    synchronize: true,
    logging: false,
    entities: [CreatorSchema, ProductSchema],
    keepConnectionAlive: true
  });
}

async function getAllProducts() {
  const connection = await getConnection();
  const productRepo = connection.getRepository(Product);
  const products = await productRepo.find();
  connection.close();
  return products;
}
async function getAllCreators() {
  console.log("At db getAllCreators");
  const connection = await getConnection();
  const creatorRepo = connection.getRepository(Creator);
  const creators = await creatorRepo.find();
  console.log("in getAllCreators creators", creators);
  connection.close();
  return creators;
}

async function insertCreator(name, img, ytURL) {
  const connection = await getConnection();

  //create
  const creator = new Creator();
  creator.name = name;
  creator.img = img;
  creator.ytURL = ytURL;

  //save
  console.log("Connection from db", connection);
  const createRepo = connection.getRepository(Creator);
  const res = await createRepo.save(creator);
  console.log("Saved ", res);

  //return new list
  const allCreators = await createRepo.find();
  connection.close();
  return allCreators;
}

async function insertProduct(id, name, img, ytURL) {
  const connection = await getConnection();

  //create
  const product = new Product();
  product.name = name;
  product.img = img;
  product.ytURL = ytURL;

  //save
  console.log("Connection from db", connection);
  const productRepo = connection.getRepository(Product);
  const res = await productRepo.save(product);
  console.log("Saved ", res);

  //return new list
  const allProducts = await productRepo.find();
  connection.close();
  return allProducts;
}

module.exports = {
  getAllCreators,
  insertCreator,
  getAllProducts,
  insertProduct
};
