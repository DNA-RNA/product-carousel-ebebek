
(() => {
  const checkPath = () => {
    const path = window.location.pathname.replace(/\/$/, "").toLowerCase();
    console.log("PATH:", path);
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
              <div class="carousel-arrow left-arrow">&#10094;</div>
              <div class="carousel-window">
                <div class="carousel-wrapper"></div>
              </div>
              <div class="carousel-arrow right-arrow">&#10095;</div>
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
        }

        .carousel-wrapper {
          display: flex;
          transition: transform 0.3s ease;
         
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
          top: 50%;
          transform: translateY(-50%);
          background: #f28e00;
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          z-index: 5;
        }

        .left-arrow { left: 0; }
        .right-arrow { right: 0; }

        .carousel-product-item {
          flex: 0 0 calc((100% - 80px) / 5); /* 5 kart (4x20px gap) */
          margin-right: 20px;
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          height: 558px; /* yüksek yapı */
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
    cursor:pointer;
}
    @media (max-width: 1480px) {
  .carousel-product-item {
    flex: 0 0 calc((100% - 60px) / 4); /* 4 kart (3x20px gap) */
  }
}

@media (max-width: 1280px) {
  .carousel-product-item {
    flex: 0 0 calc((100% - 40px) / 3); /* 3 kart (2x20px gap) */
  }
}

@media (max-width: 987px) {
  .carousel-product-item {
    flex: 0 0 calc((100% - 20px) / 2); /* 2 kart */
  }

  .carousel-arrow {
    display: none; /* Okları gizle */
  }

  .carousel-window {
    overflow-x: auto;
    scroll-behavior: smooth;
  }

  .carousel-wrapper {
    flex-wrap: nowrap;
    min-width: fit-content;
  }
}


        .carousel-product-item img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 8px 8px 0 0;
        }

        .product-title {
          margin: 10px;
          font-weight: bold;
          font-size: 14px;
        }

        .product-price {
          font-size: 16px;
          font-weight: bold;
          color: #f25e0b;
          margin-left: 10px;
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

        .heart-icon {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 20px;
          cursor: pointer;
          color: #999;
        }

        .heart-icon.filled {
          color: #f25e0b;
        }
       



  .carousel-window {
    overflow-x: auto;
    scroll-behavior: smooth;
  }

  .carousel-wrapper {
    flex-wrap: nowrap;
    min-width: fit-content;
  }

      `;
      $("<style></style>").html(css).appendTo("head");
    },

    renderProducts: () => {
      $(".carousel-wrapper").empty();
      self.products.forEach((p) => {
        let priceHTML = `<span class="product-price">${p.price.toFixed(2)} TL</span>`;
        if (p.price !== p.original_price) {
          const discount = Math.round(100 * (1 - p.price / p.original_price));
          priceHTML = `
            <span class="product-price">${p.price.toFixed(2)} TL</span>
            <span class="product-original-price">${p.original_price.toFixed(2)} TL</span>
            <span class="product-discount">-${discount}%</span>
          `;
        }
        const filled = self.favorites.includes(p.id) ? "filled" : "";
        const item = `
          <div class="carousel-product-item" data-url="${p.url}" data-id="${p.id}">
            <div class="heart-icon ${filled}">&#10084;</div>
            <img src="${p.img}" alt="${p.name}">
            <div class="product-title">${p.brand} - ${p.name}</div>
            ${priceHTML}
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
        if (!$(e.target).hasClass("heart-icon")) {
          const url = $(this).data("url");
          if (url) window.open(url, "_blank");
        }
      });
      $("body").on("click", ".heart-icon", function (e) {
        e.stopPropagation();
        const id = $(this).closest(".carousel-product-item").data("id");
        if (self.favorites.includes(id)) {
          self.favorites = self.favorites.filter((f) => f !== id);
          $(this).removeClass("filled");
        } else {
          self.favorites.push(id);
          $(this).addClass("filled");
        }
        localStorage.setItem("favorites", JSON.stringify(self.favorites));
      });
      $(window).on("resize", () => {
  const w = window.innerWidth;
  if (w <= 987) {
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
  if (w <= 987) {
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

