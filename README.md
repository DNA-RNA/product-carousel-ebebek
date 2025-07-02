# Custom Vanilla JS Carousel

This project is a simple responsive product carousel built with Vanilla JS + jQuery fallback.
It supports:

- Dynamic visible item count (`visibleItems`) based on screen width.
- Arrow navigation with transform slide logic.
- Mobile scroll fallback with `overflow-x: auto`.
- Favorite products toggle stored in `localStorage`.
- Fully responsive breakpoints: 5 / 4 / 3 / 2 visible cards.

## How it works

- **Data**: Products are fetched once and cached in `localStorage`.
- **Favorites**: Clicking the heart saves the ID in `localStorage` and updates the icon.
- **Resize**: The carousel recalculates visible cards and slider position dynamically.

## Placement

The carousel is inserted directly **below the main hero banner** by injecting it **above the next product carousel** inside the same container hierarchy.  
This ensures consistent styling and layout with the existing e-bebek page structure.

## Demo Screenshots

![Ekran Resmi 2025-07-02 21 14 10](https://github.com/user-attachments/assets/d497e05a-1884-4330-ac30-42d21e9851c2)



## Yerleşim

Bu carousel bileşeni, **e-bebek sitesi üzerinde ana hero banner alanının hemen altına** eklenmiştir.  
Yerleşim, mevcut ürün carousel yapısının **hemen üstüne** yerleştirilerek, sayfa düzeni bozulmadan **aynı container hiyerarşisi** korunmuştur.

Bu sayede:
- Sayfanın mevcut padding ve boşluk kurallarına tam uyum sağlar.
- Tasarım bütünlüğü bozulmaz.
- Carousel diğer ürün carouselleriyle görsel bütünlük içinde görünür.

### Teknik Detay

Script, `$(".banner__titles")` seçici ile hero başlığını bulur ve `before()` yöntemi ile yeni carousel HTML’ini mevcut alt ürün carousel’inin üstüne ekler.  
Böylece herhangi bir ek `div` karmaşası olmadan, tam doğru yere otomatik yerleşir.

**Yerleşim örneği:**
```html
<div class="hero-banner"></div>
<!-- Carousel buraya yerleşir -->
<div class="mevcut-product-carousel"></div>



