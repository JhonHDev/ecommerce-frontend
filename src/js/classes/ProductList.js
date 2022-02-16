import products from "../../../db.json";
class ProductList {
  constructor(productList = []) {
    this.productList = productList;
    this.$productListContent = document.getElementById("productListContent");
  }

  getProducts() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(products), 1000);
    });
  }

  loadProducts() {
    this.getProducts()
      .then(({ products }) => {
        this.productList = [...products];
        this.renderProducts(this.productList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  productTemplate({ id, name, image, price, parcelamento }) {
    const $productTemplate = document.createElement("div");

    $productTemplate.innerHTML = `
      <article class="product" id=${id}>
        <img
          src=${image}
          class="product__image"
          alt=${name}
          title=${name}
        />

        <h2 class="product__name">${name}</h2>

        <div class="product__details">
          <span class="product__price">R$ ${price}</span>
          <span class="product__parcelamento">até ${parcelamento[0]}x de R$${parcelamento[1]}</span>
        </div>

        <button class="button" type="button">Comprar</button>
      </article>
    `;

    return $productTemplate.firstElementChild;
  }

  renderProducts(products) {
    const $fragment = document.createDocumentFragment();

    this.$productListContent.innerHTML = "";

    products.forEach((product, index) => {
      const initialProducts = 8;

      const $productTemplate = this.productTemplate(product);

      if (index > initialProducts) {
        $productTemplate.classList.add("hide");
      }
      $fragment.appendChild($productTemplate);
    });

    this.$productListContent.appendChild($fragment);
  }
}

export default ProductList;
