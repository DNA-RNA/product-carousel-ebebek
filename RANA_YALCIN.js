(() => {
  const checkPath = () => {
    const path = window.location.pathname.replace(/\/$/, "").toLowerCase();
    if (path !== "" && path !== "/index.html") {
      console.log("wrong page");
      return false;
    } else {
      return true;
    }
  };
  if (!checkPath()) return;

  const loadjQuery = () => {
    if (typeof jQuery === "undefined") {
      const script = document.createElement("script");
      script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
      script.onload = () => self.init();
      document.head.appendChild(script);
    } else {
      self.init();
    }
  };

  const self = {
    products: [],
    favorites: [],
    currentIndex: 0,
    visibleItems: 5,

    buildHTML: () => {
      const html = `
      <div class="product-carousel-container">
        <div class="product-container">
          <div class="carousel-title-bg">
            <h2 class="carousel-title">Beğenebileceğinizi Düşündüklerimiz</h2>
          </div>
          <div class="carousel-controls">
            <div class="carousel">
            <button type="button" aria-label="back" class="carousel-arrow left-arrow"></button>
            <button type="button" aria-label="next" class="carousel-arrow right-arrow"></button>          
              <div class="carousel-window">
                <div class="carousel-wrapper"></div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
      `;
      $(".banner__titles").before(html);
    },

    buildCSS: () => {
      const css = `
      .product-carousel-container {
        padding-top: 20px;
      }

      .carousel-title-bg {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fef6eb;
        padding: 25px 67px;
        border-top-left-radius: 35px;
        border-top-right-radius: 35px;
        font-family: Quicksand-Bold;
        font-weight: 700;
      }

      .product-container {
        padding-bottom: 50px;
      }

      .carousel-title {
        font-family: Quicksand-Bold;
        font-size: 3rem;
        font-weight: 700;
        line-height: 1.11;
        color: #f28e00;
        margin: 0;
      }

      .carousel-controls {
        box-shadow: 15px 15px 30px 0 #ebebeb80;
        background-color: #fff;
        border-bottom-left-radius: 35px;
        border-bottom-right-radius: 35px;
        position: relative;
      }

      .carousel-window {
        overflow: hidden;
        width: 100%;
        padding: 2rem 0;
      }

      .carousel-wrapper {
        display: flex;
        transition: transform 0.3s ease;
        flex-wrap: nowrap;
        min-width: auto;
      }

      .carousel {
        width: 100%;
        position: relative;
        z-index: 1;
      }

      .carousel-arrow {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        bottom: 50%;
        top: auto;
        background: #f28e00;
      }

      .left-arrow {
        background: url("https://cdn06.e-bebek.com/assets/svg/prev.svg")
          no-repeat;
        background-color: #fef6eb;
        background-position: 18px;
        left: -65px;
      }
      .right-arrow {
        background: url("https://cdn06.e-bebek.com/assets/svg/next.svg")
          no-repeat;
        background-color: #fef6eb;
        background-position: 18px;
        right: -65px;
      }
      .carousel-arrow:hover {
        background-color: #fff;
        border: 1px solid #f28e00;
      }

      .carousel-product-item {
        flex: 0 0 calc((100% - 80px) / 5);
        margin-right: 20px;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        font-family: Poppins, "cursive";
        font-size: 12px;
        padding: 5px;
        color: #7d7d7d;
        margin: 0 20px 20px 3px;
        border: 1px solid #ededed;
        text-decoration: none;
        background-color: #fff;
      }
      .carousel-product-item:hover {
        box-shadow: 0 0 0 0 #00000030, inset 0 0 0 3px #f28e00;
        cursor: pointer;
      }
      @media (max-width: 1480px) {
        .carousel-product-item {
          flex: 0 0 calc((100% - 60px) / 4);
        }
      }

      @media (max-width: 1280px) {
        .carousel-product-item {
          flex: 0 0 calc((100% - 40px) / 3);
        }
      }

      @media (max-width: 987px) {
        .carousel-product-item {
          flex: 0 0 calc((100% - 20px) / 2); /* 2 kart */
        }

        .carousel-window {
          padding-top: 2rem;
        }

        .carousel-wrapper {
          flex-wrap: nowrap;
          min-width: fit-content;
        }
      }

      .carousel-product-item-anchor,
      .carousel-product-item-content {
        text-decoration: none;
        outline: none;
        color: unset;
        background: unset;
      }
      .carousel-product-item-anchor-img {
        position: relative;
        display: block;
        width: 100%;
        background-color: #fff;
        margin-bottom: 65px !important;
        text-align: center;
        margin: 0 0 1rem;
      }
      .carousel-product-item-anchor-img img {
        display: block;
        width: 100%;
        max-height: 100%;
        height: 203px;
        object-fit: contain;
      }
      .carousel-product-item-multiple-badge {
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        position: absolute;
        z-index: 1;
      }

      .carousel-product-item-content {
        padding: 0 17px 17px;
        padding-bottom: 13px;
      }
      .carousel-product-item-brand {
        font-size: 1.2rem;
        height: 42px;
        overflow: hidden;
        margin-bottom: 10px;
      }
      .carousel-product-item-stars-wrapper {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 0.5rem;
        padding: 5px 0 15px;
      }

      .stars {
        display: flex;
      }

      .star {
        color: #fed100;
        font-size: 18px;
        margin-right: 4px;
      }

      .review-count {
        font-size: 14px;
        color: #555;
        margin: 0 !important;
      }

      .carousel-product-item-price {
        position: relative;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        height: 43px;
      }

      .product-price {
        display: block;
        width: 100%;
        font-size: 2.2rem;
        font-weight: 600;
        color: #7d7d7d;
      }

      .product-original-price {
        font-size: 14px;
        text-decoration: line-through;
        color: #999;
        margin-left: 8px;
      }

      .product-discount {
        background: #f25e0b;
        color: #fff;
        font-size: 12px;
        padding: 2px 6px;
        border-radius: 4px;
        display: inline-block;
        margin-left: 8px;
      }

      .fav-heart-icon.filled {
        color: #f25e0b;
      }

      .fav-heart {
        position: absolute;
        cursor: pointer;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 2px 4px 0 #00000024;
        width: 50px;
        height: 50px;
        right: 15px;
        top: 10px;
      }

      .fav-heart-icon {
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
        height: auto !important;
        transition: opacity 0.2s ease;
      }

      .fav-hover-heart {
        opacity: 0;
      }

      .fav-heart:hover .fav-hover-heart {
        opacity: 1;
       
      }
      .default-heart{
        width: 25px;
        height: 25px;
        position: absolute;
        top: 13px;
        right: 12px;
      }
      .fav-heart:hover .default-heart {
       display:none;
      }

      .fav-heart.filled .default-heart,
      .fav-heart.filled .fav-hover-heart {
        display: none;
      }

      .fav-heart.filled .filled-heart {
        display: block;
      }

      .product-item-old-price {
        font-size: 1.4rem;
        font-weight: 500;
        text-decoration: line-through;
      }
      .carousel-product-price-percent {
        color: #00a365;
        font-size: 18px;
        font-weight: 700;
        display: inline-flex;
        justify-content: center;
        margin-left: 0.5rem;
      }
      .icon {
        display: inline-block;
        height: 22px;
        font-size: 22px;
        margin-left: 3px;
      }
      .discounted {
        color: #00a365;
      }
      @media (max-width: 575px) {
        .carousel-arrow {
          display: none;
        }
        .carousel-window {
          overflow-x: auto;
        }
      }
      .carousel-product-item:last-child {
        margin-right: 0;
      }
      @media (max-width: 990px) {
        .carousel-product-item {
          flex: 0 0 calc((100% - 20px) / 2);
        }

        .carousel-wrapper {
          flex-wrap: nowrap;
          min-width: auto;
        }
      }
      @media (max-width: 480px) {
        .carousel-title-bg {
          padding: 0 22px 0 10px;
          background-color: #fff;
        }
        .carousel-title {
          font-size: 2.2rem;
          line-height: 1.5;
        }
        .product-price {
          font-size: 1.8rem;
        }
        .carousel-product-item-content {
          padding: 0 10px 10px;
        }
        .add-basket-button{
          padding: 10px !important;
        }
        .carousel-product-item-stars-wrapper {
          gap: 0px;
        }
      }
      @media screen and (max-width: 375px) {
        .carousel-product-item-content {
          padding: 5px 5px 10px 0;
        }
      }
      .product-item-promo {
        min-height: 70px;
        padding-left: 7.5px;
      }
      .product-item-content-basket {
        padding: 0 17px 17px;
      }
      .add-basket-button {
        position: relative;
        z-index: 2;
        margin-top: 19px;
        width: 100%;
        padding: 15px 20px;
        border-radius: 37.5px;
        background-color: #fff7ec;
        color: #f28e00;
        font-family: Poppins, "cursive";
        font-size: 1.4rem;
        font-weight: 700;
      }
      .add-basket-button:hover {
        background-color: #f18e00;
        color: #ffffff;
      }
    
      `;
      $("<style></style>").html(css).appendTo("head");
    },

    renderProducts: () => {
      $(".carousel-wrapper").empty();
      self.products.forEach((p) => {
        let priceHTML = `<span class="product-price">${p.price.toFixed(
          2
        )} TL</span>`;
        if (p.price !== p.original_price && p.price < p.original_price) {
          const discount = Math.round(100 * (1 - p.price / p.original_price));
          priceHTML = `
    <div style="display: flex; align-items: center;">
      <span class="product-item-old-price">${p.original_price.toFixed(
        2
      )} TL</span>
      <span class="carousel-product-price-percent">%${discount} <i class="icon icon-decrease"></i></span>
    </div>
    <span class="product-price discounted">${p.price.toFixed(2)} TL</span>
  `;
        } else {
          priceHTML = `
    <span class="product-price">${p.price.toFixed(2)} TL</span>
  `;
        }

        const filled = self.favorites.includes(p.id) ? "filled" : "";
        const item = `
        <div class="carousel-product-item" data-url="${p.url}" data-id="${
          p.id
        }">
      <a class="carousel-product-item-anchor">
        <div class="carousel-product-item-anchor-img">
          <div class="carousel-product-item-multiple-badge">
            <span style="display: flex; flex-direction: column">
              <img
                alt="popular"
                style="height: auto; object-fit: contain"
                src="https://www.e-bebek.com/assets/images/cok-satan.png"
              />
            </span>
          </div>
          <img src="${p.img}" alt="${p.name}" />
        </div>
        <div class="carousel-product-item-content">
          <a class="carousel-product-item-anchor">
            <h2 class="carousel-product-item-brand">
              <b>${p.brand} - </b> <span> ${p.name}</span>
            </h2>
            <div class="carousel-product-item-stars-wrapper">
              <div class="stars">
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
              </div>
              <p class="review-count">(390)</p>
            </div>
          </a>
          <div class="carousel-product-item-price">${priceHTML}</div>
        </div>
        <div class="product-item-promo"></div>
      </a>
      <div class="fav-heart ${filled}">
        <img
          class="fav-heart-icon default-heart"
          src="https://www.e-bebek.com/assets/svg/default-favorite.svg"
          alt="heart"
        />
        <img
          class="fav-heart-icon fav-hover-heart"
          src="https://www.e-bebek.com/assets/svg/default-hover-favorite.svg"
          alt="heart"
        />

        ${
          filled
            ? `<img
          class="fav-heart-icon filled-heart"
          src="https://www.e-bebek.com/assets/svg/added-favorite.svg"
          alt="heart"
        />`
            : ""
        }
      </div>
      <div class="product-item-content-basket">
      <div class="carousel-product-item-price">
       <div class="add-basket">
            <button class="add-basket-button">Sepete Ekle</button>       
        </div>
      </div>   
      </div>
    </div>

        `;
        $(".carousel-wrapper").append(item);
      });
    },

    updateSlider: () => {
      const itemWidth = $(".carousel-product-item").outerWidth(true);
      const translateX = -(self.currentIndex * itemWidth);
      $(".carousel-wrapper").css("transform", `translateX(${translateX}px)`);
    },

    setEvents: () => {
      $("body").on("click", ".left-arrow", () => {
        if (self.currentIndex > 0) {
          self.currentIndex--;
          self.updateSlider();
        }
      });
      $("body").on("click", ".right-arrow", () => {
        const maxIndex = self.products.length - self.visibleItems;
        if (self.currentIndex < maxIndex) {
          self.currentIndex++;
          self.updateSlider();
        }
      });
      $("body").on("click", ".carousel-product-item", function (e) {
        if (!$(e.target).hasClass("fav-heart-icon")) {
          const url = $(this).data("url");
          if (url) window.open(url, "_blank");
        }
      });
      $("body").on("click", ".fav-heart", function (e) {
        e.stopPropagation();
        const id = $(this).closest(".carousel-product-item").data("id");

        if (self.favorites.includes(id)) {
          self.favorites = self.favorites.filter((f) => f !== id);
          $(this).removeClass("filled");
          $(this).find(".filled-heart").remove();
        } else {
          self.favorites.push(id);
          $(this).addClass("filled");
          $(this).append(
            `<img class="fav-heart-icon filled-heart" src="https://www.e-bebek.com/assets/svg/added-favorite.svg" alt="heart">`
          );
        }
        $("body").on("click", ".carousel-product-item", function (e) {
          if ($(e.target).closest(".fav-heart").length) return;
          const url = $(this).data("url");
          if (url) window.open(url, "_blank");
        });

        localStorage.setItem("favorites", JSON.stringify(self.favorites));
      });

      $(window).on("resize", () => {
        const w = window.innerWidth;
        if (w <= 990) {
          self.visibleItems = 2;
        } else if (w <= 1280) {
          self.visibleItems = 3;
        } else if (w <= 1480) {
          self.visibleItems = 4;
        } else {
          self.visibleItems = 5;
        }
        self.updateSlider();
      });
    },

    loadData: () => {
      const saved = localStorage.getItem("products");
      const favs = localStorage.getItem("favorites");
      if (favs) self.favorites = JSON.parse(favs);
      if (saved) {
        self.products = JSON.parse(saved);
        self.renderProducts();
      } else {
        fetch(
          "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
        )
          .then((res) => res.json())
          .then((json) => {
            self.products = json;
            localStorage.setItem("products", JSON.stringify(json));
            self.renderProducts();
          });
      }
    },

    init: () => {
      const w = window.innerWidth;
      if (w <= 990) {
        self.visibleItems = 2;
      } else if (w <= 1280) {
        self.visibleItems = 3;
      } else if (w <= 1480) {
        self.visibleItems = 4;
      } else {
        self.visibleItems = 5;
      }
      self.buildHTML();
      self.buildCSS();
      self.loadData();
      self.setEvents();
    },
  };

  (function (history) {
    const pushState = history.pushState;
    history.pushState = function (state) {
      const result = pushState.apply(history, arguments);
      window.dispatchEvent(new Event("pushstate"));
      return result;
    };
  })(window.history);

  window.addEventListener("pushstate", checkPath);
  window.addEventListener("popstate", checkPath);
  window.addEventListener("hashchange", checkPath);

  loadjQuery();
})();
