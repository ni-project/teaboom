
export class Product {
  constructor(products) {
    this.products = products;
    this.initialization();
    this.bindEvents();
  }

  $BODY = null;
  $CONTAINER = null;
  $ART = null;
  $COST = null;
  $STOCK = null;
  $WEIGHT_CONTAINER = null;
  $WEIGHT_BUTTONS = null;
  $MODAL_CONTAINER = null;
  $MODAL_CLOSE = null;
  $GALLERY_IMAGE = null;

  initialization = () => {
    this.$BODY = document.querySelector('body');
    this.$CONTAINER = this.$BODY.querySelector('.js-product');
    this.$ART = this.$CONTAINER.querySelector('.js-product-art');
    this.$COST = this.$CONTAINER.querySelector('.js-product-cost');
    this.$STOCK = this.$CONTAINER.querySelector('.js-product-stock');
    this.$WEIGHT_CONTAINER = this.$CONTAINER.querySelector('.js-product-weight-list');

    this.$WEIGHT_CONTAINER.innerHTML = this.products.map((button, index) =>
      this.renderWeightButton(button.weight, index)
    ).join('');

    this.$WEIGHT_BUTTONS = this.$WEIGHT_CONTAINER.querySelectorAll('button');

    this.$MODAL_CONTAINER = this.$BODY.querySelector('.js-modal');
    this.$MODAL_CLOSE = this.$MODAL_CONTAINER.querySelector('.js-modal-close');
    this.$GALLERY_IMAGE = this.$CONTAINER.querySelector('.js-product-gallery-image');
  }

  bindEvents = () => {
    this.$WEIGHT_BUTTONS.forEach((button, index) => {
      button.addEventListener('click', () => this.handleClickWeightButton(button, index))
    });

    this.$GALLERY_IMAGE.addEventListener('click', () => this.handleClickGalleryImage());
    this.$MODAL_CLOSE.addEventListener('click', () => this.handleClickModalClose());

    this.updateProduct(0);
  }

  handleClickWeightButton = (button, index) => {
    const isActive = button.classList.contains('active');

    if ( !isActive ) {
      this.updateProduct(index);
    }
  }

  renderWeightButton = (value, index) => {
    const isActive = index === 0;

    return `<button type="button" class="${isActive ? 'active' : ''}">${value} г</button>`;
  }

  renderArt = (product) => {
    return `арт. ${product.art}`;
  }

  renderCost = (product) => {
    const COST_FORMATTED = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    });
    const PRICE_OLD = product.price.old ? `<span>${COST_FORMATTED.format(product.price.old)}</span>` : '';

    return `${COST_FORMATTED.format(product.price.current)} ${PRICE_OLD}`;
  }

  renderStock = (product) => {
    return `На складе: <span>${product.stock}</span>`;
  }

  handleClickGalleryImage = () => {
    this.$MODAL_CONTAINER.classList.add('active');
  }

  handleClickModalClose = () => {
    this.$MODAL_CONTAINER.classList.remove('active');
  }

  updateProduct = (index) => {
    const CURRENT_PRODUCT = this.products[index];
    const WEIGHT_BUTTON_ACTIVE = this.$WEIGHT_CONTAINER.querySelector('.active');

    WEIGHT_BUTTON_ACTIVE.classList.remove('active');

    this.$ART.innerHTML = this.renderArt(CURRENT_PRODUCT);
    this.$COST.innerHTML = this.renderCost(CURRENT_PRODUCT);
    this.$STOCK.innerHTML = this.renderStock(CURRENT_PRODUCT);

    this.$WEIGHT_BUTTONS[index].classList.add('active');
  }
}