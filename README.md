# Mil Kositas 🛍️

Tienda online estática de **Mil Kositas by Freisy**: útiles, hogar, belleza, tecnología, moda y juguetes a buen precio, con pago por **Yape / Plin** y envíos a todo el Perú.

## Ver la tienda

Una vez publicada en GitHub Pages: `https://yeisonjuan12-blip.github.io/mil-cositas/`

## Estructura

```
index.html          Tienda (catálogo, carrito, checkout, seguimiento)
creditos.html       Autoría y licencia de cada foto
assets/styles.css   Diseño responsive
assets/app.js       Datos, lógica y configuración
assets/qrcode.min.js Generador de QR local
imagenes/1.jpg…20.jpg Fotos de los 20 productos
imagenes/logo.png   Logo
.nojekyll           Necesario para que GitHub Pages no procese con Jekyll
```

## Configuración rápida

Todo lo editable está al inicio de `assets/app.js`, en el objeto `CONFIG`:

```js
const CONFIG = {
  whatsapp: "51999999999",  // WhatsApp de la tienda (código de país, sin +)
  holder: "Freisy",         // titular de Yape / Plin
  yape: "999999999",        // número de Yape
  plin: "999999999",        // número de Plin
  freeShippingFrom: 99,     // envío gratis desde S/ 99
  shippingCost: 8,          // costo de envío si no llega al mínimo
  deliveryTime: "24 a 48 horas",
  cardUrl: "",              // link de pago con tarjeta (Culqi / Izipay / Mercado Pago)
  qrYape: "imagenes/qr-yape.png",  // opcional: tu QR real de Yape
  qrPlin: "imagenes/qr-plin.png"   // opcional: tu QR real de Plin
};
```

- Si **no** pones `qr-yape.png` / `qr-plin.png`, el sitio genera un QR con el número y el monto exacto del pedido.
- Si pones `cardUrl`, se muestra el botón de pago con tarjeta.
- El pedido se guarda en el navegador y se envía por WhatsApp con un clic (no requiere servidor).

## Pedidos

Cada checkout genera un código de seguimiento (ej. `MK-R982NZ`) y un resumen que el cliente envía a la tienda por WhatsApp con el detalle, la dirección y el comprobante de pago adjunto.

## Fotos

Las imágenes provienen de Wikimedia Commons con licencias libres (CC BY, CC BY-SA y dominio público). La autoría y licencia de cada una está en `creditos.html`.
