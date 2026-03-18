// ==========================================
// دیتابیس محصولات
// ==========================================
const productsDB = [
  {
    id: "1",
    title: "هدست Apple Vision Pro",
    priceNum: 185000000,
    priceStr: "۱۸۵,۰۰۰,۰۰۰",
    category: "wearable",
    badge: "ویژه",
    badgeClass: "badge-info",
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800",
    desc: "تلفیق بی‌نظیر دنیای دیجیتال و واقعیت با رزولوشن 4K برای هر چشم. نسل جدید محاسبات فضایی.",
    features: ["نمایشگر Micro-OLED", "ردیابی دقیق چشم و دست"],
  },
  {
    id: "2",
    title: "هدفون سونی WH-1000XM4",
    priceNum: 9500000,
    priceStr: "۹,۵۰۰,۰۰۰",
    category: "audio",
    badge: "تخفیف",
    badgeClass: "",
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80",
    desc: "بهترین هدفون نویز کنسلینگ با کیفیت صدای Hi-Res. ایده‌آل برای محیط‌های کاری و سفر.",
    features: ["نویز کنسلینگ پیشرفته", "۳۰ ساعت شارژدهی"],
  },
  {
    id: "3",
    title: "کیبورد Keychron K2",
    priceNum: 4200000,
    priceStr: "۴,۲۰۰,۰۰۰",
    category: "gaming",
    badge: "",
    badgeClass: "",
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80",
    desc: "کیبورد مکانیکال بی‌سیم و فشرده، مناسب برنامه‌نویسی و گیمینگ با قابلیت اتصال به مک و ویندوز.",
    features: ["سوییچ‌های Gateron", "نورپردازی RGB"],
  },
  {
    id: "4",
    title: "لپ‌تاپ MacBook Air M2",
    priceNum: 54000000,
    priceStr: "۵۴,۰۰۰,۰۰۰",
    category: "laptop",
    badge: "پرفروش",
    badgeClass: "badge-success",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    desc: "لپ‌تاپ فوق‌سبک اپل با چیپست قدرتمند M2 و طراحی بدون فن برای کارکرد کاملاً بی‌صدا.",
    features: ["چیپست Apple M2", "۱۸ ساعت شارژدهی"],
  },
  {
    id: "5",
    title: "موس لاجیتک MX Master 3S",
    priceNum: 5100000,
    priceStr: "۵,۱۰۰,۰۰۰",
    category: "gaming",
    badge: "",
    badgeClass: "",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
    desc: "بهترین موس ارگونومیک با اسکرول الکترومغناطیسی و سنسور فوق دقیق روی شیشه.",
    features: ["اسکرول MagSpeed", "سنسور 8K DPI"],
  },
  {
    id: "6",
    title: "کنسول PlayStation 5",
    priceNum: 32500000,
    priceStr: "۳۲,۵۰۰,۰۰۰",
    category: "gaming",
    badge: "موجود شد",
    badgeClass: "badge-info",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
    desc: "نسل نهم کنسول‌های بازی سونی با حافظه SSD فوق‌سریع برای لودینگ‌های صفر ثانیه‌ای.",
    features: ["گرافیک 4K 120Hz", "کنترلر DualSense"],
  },
];

// ==========================================
// متغیرهای وضعیت (State)
// ==========================================
let cart = JSON.parse(localStorage.getItem("techshop_cart")) || [];
let currentDetailProductId = null;
let detailCurrentQty = 1;
let activeObserver = null;

const toPersianNum = (num) =>
  num.toString().replace(/\d/g, (x) => "۰۱۲۳۴۵۶۷۸۹"[x]);
const formatPrice = (num) => toPersianNum(num.toLocaleString());

const seoData = {
  home: {
    title: "تک‌شاپ | فروشگاه گجت‌های هوشمند",
    desc: "فروشگاه اینترنتی تک‌شاپ، ارائه‌دهنده جدیدترین لپ‌تاپ‌ها، کنسول‌های بازی، و گجت‌های هوشمند با بهترین قیمت.",
  },
  products: {
    title: "خرید محصولات | فروشگاه تک‌شاپ",
    desc: "جدیدترین گجت‌های روز دنیا را با ضمانت اصالت کالا و ارسال سریع از تک‌شاپ خریداری کنید.",
  },
  about: {
    title: "درباره ما | تک‌شاپ",
    desc: "داستان شکل‌گیری تک‌شاپ و ارزش‌های کلیدی ما برای ارائه بهترین خدمات تکنولوژی به شما.",
  },
  contact: {
    title: "ارتباط با ما | تک‌شاپ",
    desc: "آدرس، شماره تماس و راه‌های ارتباطی با پشتیبانی فروشگاه اینترنتی تک‌شاپ.",
  },
  cart: { title: "سبد خرید | تک‌شاپ", desc: "سبد خرید شما در فروشگاه تک‌شاپ." },
};

function updateSEO(viewId, customTitle = null) {
  const seo = seoData[viewId];
  if (seo) {
    document.title = customTitle ? customTitle : seo.title;
    document.getElementById("meta-description").content = seo.desc;
  }
}

// ==========================================
// سیستم هوشمند انیمیشن (Scroll Observer)
// ==========================================
function initScrollAnimations() {
  if (activeObserver) activeObserver.disconnect();

  activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          activeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  // فقط المان‌های داخل صفحه فعال و فوتر را رصد کن
  const activeView = document.querySelector(".page-view.active");
  if (activeView) {
    activeView
      .querySelectorAll(
        ".reveal-up:not(.revealed), .reveal-scale:not(.revealed), .reveal-right:not(.revealed), .reveal-left:not(.revealed)",
      )
      .forEach((el) => activeObserver.observe(el));
  }

  // فوتر همیشه رصد می‌شود
  document
    .querySelectorAll("footer .reveal-up:not(.revealed)")
    .forEach((el) => activeObserver.observe(el));
}

// ==========================================
// سیستم مسیریابی (SPA Router)
// ==========================================
function navigate(viewId, param = null) {
  document
    .querySelectorAll(".nav-item-link")
    .forEach((el) => el.classList.remove("active"));
  const activeLink = document.querySelector(
    `.nav-item-link[data-target="${viewId}"]`,
  );
  if (activeLink) activeLink.classList.add("active");

  document.querySelectorAll(".page-view").forEach((el) => {
    el.classList.remove("active");
    // پاک کردن انیمیشن‌های صفحه‌ای که از آن خارج می‌شویم تا دفعه بعد دوباره پخش شود
    el.querySelectorAll(".revealed").forEach((rev) =>
      rev.classList.remove("revealed"),
    );
  });

  const targetView = document.getElementById(`view-${viewId}`);
  targetView.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });

  updateSEO(viewId);

  if (viewId === "home") renderHomeProducts();
  if (viewId === "products") renderAllProducts();
  if (viewId === "product-detail" && param) loadProductDetail(param);
  if (viewId === "cart") renderCartPage();

  // فراخوانی Observer برای المان‌های صفحه جدید پس از رندر شدن
  setTimeout(initScrollAnimations, 100);
}

// ==========================================
// سبد خرید و توست
// ==========================================
function saveCart() {
  localStorage.setItem("techshop_cart", JSON.stringify(cart));
  updateCartBadge();
  if (document.getElementById("view-cart").classList.contains("active"))
    renderCartPage();
}
function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.innerText = toPersianNum(totalItems);
  badge.style.display = totalItems > 0 ? "block" : "none";
}
function addToCart(productId, qty = 1) {
  const product = productsDB.find((p) => p.id === productId);
  if (!product) return;
  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) existingItem.qty += qty;
  else cart.push({ ...product, qty: qty });
  saveCart();
  showToast("محصول با موفقیت به سبد خرید اضافه شد.");
}
function changeCartQty(productId, amount) {
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.qty += amount;
    if (item.qty < 1) item.qty = 1;
    saveCart();
  }
}
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
}
function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "custom-toast";
  toast.innerHTML = `<i class="bi bi-check-circle-fill fs-5 text-success"></i> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ==========================================
// رندر بخش‌های سایت
// ==========================================
function scrollSlider(amount) {
  const track = document.getElementById("home-product-track");
  if (track) track.scrollBy({ left: amount, behavior: "smooth" });
}

function renderHomeProducts() {
  const track = document.getElementById("home-product-track");
  track.innerHTML = "";
  productsDB.forEach((product, i) => {
    let badgeHTML = product.badge
      ? `<span class="product-badge ${product.badgeClass}">${product.badge}</span>`
      : "";
    track.innerHTML += `
          <div class="reveal-right" style="transition-delay: ${i * 0.1}s; flex: 0 0 280px;">
            <div class="product-card" onclick="navigate('product-detail', '${product.id}')">
              ${badgeHTML}
              <div class="product-img-box"><img src="${product.image}" alt="${product.title}"></div>
              <h5 class="product-title">${product.title}</h5>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="product-price">${product.priceStr} <small class="text-muted">تومان</small></span>
                <div class="add-to-cart-sm" onclick="event.stopPropagation(); addToCart('${product.id}')" title="افزودن به سبد"><i class="bi bi-cart-plus"></i></div>
              </div>
            </div>
          </div>
        `;
  });
  setTimeout(initScrollAnimations, 50);
}

function renderAllProducts() {
  const grid = document.getElementById("products-grid");
  const searchInput = document.getElementById("searchInput");
  const category =
    document.querySelector('input[name="category"]:checked')?.value || "all";
  const sort = document.getElementById("sortSelect").value;

  let filtered = [...productsDB];

  if (searchInput && searchInput.value) {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(searchInput.value.toLowerCase()),
    );
  }
  if (category !== "all")
    filtered = filtered.filter((p) => p.category === category);

  if (sort === "price-asc") filtered.sort((a, b) => a.priceNum - b.priceNum);
  if (sort === "price-desc") filtered.sort((a, b) => b.priceNum - a.priceNum);

  document.getElementById("product-count-text").innerText = toPersianNum(
    filtered.length,
  );
  grid.innerHTML = "";

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-12 text-center py-5 text-muted reveal-scale">محصولی با این مشخصات یافت نشد!</div>`;
    return;
  }

  filtered.forEach((product, i) => {
    let badgeHTML = product.badge
      ? `<span class="product-badge ${product.badgeClass}">${product.badge}</span>`
      : "";
    grid.innerHTML += `
          <div class="col reveal-up" style="transition-delay: ${(i % 6) * 0.1}s">
            <div class="product-card" onclick="navigate('product-detail', '${product.id}')">
              ${badgeHTML}
              <div class="product-img-box"><img src="${product.image}" alt="${product.title}"></div>
              <h5 class="product-title">${product.title}</h5>
              <div class="mt-auto">
                <div class="product-price mb-3">${product.priceStr} <span class="fs-6 text-muted">تومان</span></div>
                <button class="btn btn-outline-info w-100 rounded-pill" onclick="event.stopPropagation(); addToCart('${product.id}')">
                  <i class="bi bi-cart-plus me-1"></i> افزودن به سبد
                </button>
              </div>
            </div>
          </div>
        `;
  });
  setTimeout(initScrollAnimations, 50);
}

document
  .getElementById("searchInput")
  .addEventListener("input", renderAllProducts);
document
  .querySelectorAll('input[name="category"]')
  .forEach((el) => el.addEventListener("change", renderAllProducts));
document
  .getElementById("sortSelect")
  .addEventListener("change", renderAllProducts);

function loadProductDetail(id) {
  const product = productsDB.find((p) => p.id === id);
  if (!product) return navigate("products");

  updateSEO("product-detail", `${product.title} | تک‌شاپ`);
  currentDetailProductId = id;
  detailCurrentQty = 1;

  let featuresHTML = product.features
    .map(
      (f) =>
        `<li class="mb-2"><i class="bi bi-check2-circle text-cyan me-2"></i>${f}</li>`,
    )
    .join("");

  document.getElementById("pd-container").innerHTML = `
        <div class="row g-5">
          <div class="col-lg-5 reveal-right" style="transition-delay: 0.1s;"><div class="image-gallery"><img src="${product.image}" alt="${product.title}"></div></div>
          <div class="col-lg-7">
            <h1 class="fw-bold mb-3 reveal-left" style="transition-delay: 0.2s;">${product.title}</h1>
            <div class="product-price fs-2 mb-4 reveal-left" style="transition-delay: 0.3s;">${product.priceStr} <span class="fs-5 text-muted">تومان</span></div>
            <p class="text-muted mb-4 lh-lg reveal-left" style="transition-delay: 0.4s;">${product.desc}</p>
            
            <div class="d-flex align-items-center gap-4 mb-4 reveal-left" style="transition-delay: 0.5s;">
              <span class="fw-bold">تعداد:</span>
              <div class="quantity-selector">
                <button class="quantity-btn" onclick="updateDetailQty(-1)"><i class="bi bi-dash"></i></button>
                <div id="pd-quantity">۱</div>
                <button class="quantity-btn" onclick="updateDetailQty(1)"><i class="bi bi-plus"></i></button>
              </div>
            </div>
            
            <div class="reveal-left" style="transition-delay: 0.6s;">
              <button class="btn-gradient w-100 py-3 fs-5 rounded-4 mb-4" onclick="addToCart('${product.id}', detailCurrentQty)">
                <i class="bi bi-cart-plus me-2"></i> افزودن به سبد خرید
              </button>
            </div>
            
            <h5 class="fw-bold border-bottom border-secondary pb-2 mb-3 mt-4 reveal-up" style="transition-delay: 0.7s;">ویژگی‌های کلیدی</h5>
            <ul class="list-unstyled reveal-up" style="transition-delay: 0.8s;">${featuresHTML}</ul>
          </div>
        </div>
      `;
  setTimeout(initScrollAnimations, 50);
}

function updateDetailQty(change) {
  detailCurrentQty = Math.max(1, Math.min(10, detailCurrentQty + change));
  document.getElementById("pd-quantity").innerText =
    toPersianNum(detailCurrentQty);
}

function renderCartPage() {
  const emptyState = document.getElementById("cart-empty-state");
  const contentState = document.getElementById("cart-content-state");
  const itemsContainer = document.getElementById("cart-items-container");

  if (cart.length === 0) {
    emptyState.classList.remove("d-none");
    contentState.classList.add("d-none");
    return;
  }

  emptyState.classList.add("d-none");
  contentState.classList.remove("d-none");
  itemsContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, i) => {
    subtotal += item.priceNum * item.qty;
    itemsContainer.innerHTML += `
          <div class="cart-item reveal-right" style="transition-delay: ${i * 0.1}s">
            <div class="cart-item-img"><img src="${item.image}" alt="${item.title}"></div>
            <div class="flex-grow-1">
              <div class="fw-bold fs-5 mb-1">${item.title}</div>
              <div class="text-cyan fw-bold">${formatPrice(item.priceNum)} تومان</div>
            </div>
            <div class="quantity-selector">
              <button class="quantity-btn" onclick="changeCartQty('${item.id}', -1)"><i class="bi bi-dash"></i></button>
              <div style="width: 30px; text-align: center;">${toPersianNum(item.qty)}</div>
              <button class="quantity-btn" onclick="changeCartQty('${item.id}', 1)"><i class="bi bi-plus"></i></button>
            </div>
            <button class="btn btn-sm btn-outline-danger ms-3" onclick="removeFromCart('${item.id}')" title="حذف محصول"><i class="bi bi-trash"></i></button>
          </div>
        `;
  });

  const tax = Math.floor(subtotal * 0.09);
  document.getElementById("cart-subtotal").innerText =
    formatPrice(subtotal) + " تومان";
  document.getElementById("cart-tax").innerText = formatPrice(tax) + " تومان";
  document.getElementById("cart-total").innerText =
    formatPrice(subtotal + tax) + " تومان";

  setTimeout(initScrollAnimations, 50);
}

function checkout() {
  if (cart.length === 0) return;
  cart = [];
  saveCart();
  navigate("home");
  showToast("پرداخت با موفقیت انجام شد! سبد خرید خالی شد.");
}

// ==========================================
// دستیار هوشمند (AI Chatbot)
// ==========================================
function sendAiMessage() {
  const input = document.getElementById("ai-user-input");
  const text = input.value.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
  if (!text) return;

  const msgs = document.getElementById("ai-widget-messages");
  msgs.innerHTML += `<div class="user-message">${text}</div>`;
  input.value = "";
  msgs.scrollTop = msgs.scrollHeight;

  setTimeout(() => {
    msgs.innerHTML += `<div class="ai-message">متوجه درخواست شما شدم. برای مشاهده محصولات لطفاً از منوی بالای صفحه به بخش <strong>فروشگاه</strong> سر بزنید.</div>`;
    msgs.scrollTop = msgs.scrollHeight;
  }, 1000);
}

document.getElementById("ai-user-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendAiMessage();
});

// راه‌اندازی در زمان لود صفحه
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  navigate("home");
});
