import './styles/app.scss'
import { products } from "./source/data.js";
import { Product } from "./page/product.js";

class Common {
  constructor() {
    this.init()
  }

  $CURTAIN = null;

  init = () => {
    this.$CURTAIN = document.querySelector('.js-curtain');

    if ( document.querySelector('.js-product') ) {
      new Product(products);
    }

    this.$CURTAIN.classList.add('hide');
  }
}

new Common();