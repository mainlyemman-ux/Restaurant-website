(function () {
  var S = window.SITE;
  if (!S) return;

  function waLink(message) {
    return "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(message || S.whatsappMessage);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // Page title and description
  document.title = S.name + " | Restaurant in " + S.address.split(",").pop().trim();
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", S.subtext);

  // Text fields: <element data-bind="key">
  document.querySelectorAll("[data-bind]").forEach(function (node) {
    var value = S[node.getAttribute("data-bind")];
    if (typeof value === "string") node.textContent = value;
  });

  // Links
  document.querySelectorAll("[data-wa]").forEach(function (node) {
    node.setAttribute("href", waLink());
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener");
  });
  document.querySelectorAll("[data-tel]").forEach(function (node) {
    node.setAttribute("href", "tel:" + S.phoneTel);
  });
  document.querySelectorAll("[data-maps]").forEach(function (node) {
    node.setAttribute("href", "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(S.mapsQuery));
  });

  // Ticker: repeat the items so the loop never shows a gap
  var ticker = document.getElementById("ticker");
  if (ticker) {
    var items = S.ticker.concat(S.ticker);
    items.forEach(function (text) {
      ticker.appendChild(el("span", "ticker-item", text));
    });
  }

  // Menu cards
  var menu = document.getElementById("menu-items");
  if (menu) {
    S.menu.forEach(function (item, i) {
      var card = el("article", "dish" + (i % 3 === 1 ? " dish-tilt" : ""));
      card.appendChild(el("div", "dish-img"));
      var body = el("div", "dish-body");
      body.appendChild(el("h3", "", item.name));
      body.appendChild(el("p", "dish-note", item.note));
      var row = el("div", "dish-row");
      row.appendChild(el("span", "dish-price", item.price));
      var order = el("a", "btn btn-small btn-red", "Order");
      order.setAttribute("href", waLink("Hello, I'd like to order the " + item.name + "."));
      order.setAttribute("target", "_blank");
      order.setAttribute("rel", "noopener");
      row.appendChild(order);
      body.appendChild(row);
      card.appendChild(body);
      menu.appendChild(card);
    });
  }

  // Specials
  var specials = document.getElementById("specials-items");
  if (specials) {
    S.specials.forEach(function (item) {
      var card = el("div", "special");
      card.appendChild(el("h3", "", item.name));
      card.appendChild(el("p", "", item.note));
      card.appendChild(el("p", "special-price", item.price));
      specials.appendChild(card);
    });
  }

  // Hours
  var hoursList = document.getElementById("hours-list");
  if (hoursList) {
    S.hoursList.forEach(function (h) {
      var li = el("li");
      li.appendChild(el("span", "", h.day));
      li.appendChild(el("strong", "", h.time));
      hoursList.appendChild(li);
    });
  }
})();
