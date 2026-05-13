const { useState, useEffect, useRef, useMemo } = React;
const { Tee, Hoodie, Pants, Jacket, Cap, Bag, Dress } = window.Garments;

const STORE = window.__STORE || {};
const SECTION = STORE.section || "Womens";
const PRODUCTS = STORE.products || [];
const BANNER = STORE.banner || {
  tag1: "[ STUDIO ] SPRING / SUMMER '26",
  tag2: "The Field Edit · Issue 12",
  headline: ["Тренд загварууд - ШИНЭ ЦУГЛУУЛГА", "", "", "", ""],
  meta: [["Editorial","EM-26.04"],["Photographer","S. Larsen"],["Location","40.7128° N"]]
};

const CATEGORIES = SECTION === "Womens" ? [
  { id: "tees", num: "01", label: "Dresses", note: "Elegant silhouettes, refined." },
  { id: "hoodies", num: "02", label: "Hoodies", note: "350gsm fleece, mid-weight." },
  { id: "pants", num: "03", label: "Classical", note: "Timeless pieces, tailored." },
  { id: "outer", num: "04", label: "Outerwear", note: "Field-tested, weather-aware." },
  { id: "acc", num: "05", label: "Accessories", note: "Caps, bags, the closing note." }
] : SECTION === "Mens" ? [
  { id: "tees", num: "01", label: "Suits", note: "Tailored essentials, sharp." },
  { id: "hoodies", num: "02", label: "Hoodies", note: "350gsm fleece, mid-weight." },
  { id: "pants", num: "03", label: "Pants", note: "Trousers and denim, cut wide." },
  { id: "outer", num: "04", label: "Outerwear", note: "Field-tested, weather-aware." },
  { id: "acc", num: "05", label: "Accessories", note: "Caps, bags, the closing note." }
] : [
  { id: "tees", num: "01", label: "T-Shirts", note: "Daily basics, considered." },
  { id: "hoodies", num: "02", label: "Hoodies", note: "350gsm fleece, mid-weight." },
  { id: "pants", num: "03", label: "Pants", note: "Trousers and denim, cut wide." },
  { id: "outer", num: "04", label: "Outerwear", note: "Field-tested, weather-aware." },
  { id: "acc", num: "05", label: "Accessories", note: "Caps, bags, the closing note." }
];

const SIZES = ["XS", "S", "M", "L", "XL"];

function ProductCard({ p, onAdd, density }) {
  const [hover, setHover] = useState(false);
  const [pickedSize, setPickedSize] = useState(null);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const G = { Tee, Hoodie, Pants, Jacket, Cap, Bag, Dress }[p.type];
  const studioBg =
    p.type === "Pants" ? "#e6e0d3" :
    p.type === "Hoodie" ? "#dfd9cc" :
    p.type === "Jacket" ? "#d6cfc1" :
    p.type === "Cap" ? "#ebe5d8" :
    p.type === "Bag" ? "#dcd5c6" : "#e8e2d5";

  const onMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
    setTilt({ x: -y, y: x });
  };
  const onLeave = () => { setHover(false); setTilt({ x: 0, y: 0 }); };

  return (
    <article
      ref={cardRef}
      className={"prod " + (density === "dense" ? "dense " : "") + (hover ? "is-hover " : "")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      onMouseMove={onMove}>

      <div className="prod-frame" style={{ background: studioBg }}>
        <div
          className="prod-stage"
          style={{
            transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hover ? 1.04 : 1})`
          }}>
          {p.img ? (
            <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} />
          ) : (
            <>
              <div className="garment garment-front" style={{ opacity: hover ? 0 : 1 }}>
                <G color={p.color} alt={false} />
              </div>
              <div className="garment garment-back" style={{ opacity: hover ? 1 : 0 }}>
                <G color={p.color} alt={true} />
              </div>
            </>
          )}
        </div>

        <div className="corner tl">{p.code}</div>
        {p.sale && <div className="corner tr accent">— ${p.price - p.sale} off</div>}

        <div className="quick" data-show={hover}>
          <div className="quick-sizes">
            {SIZES.map((s, i) =>
              <button
                key={s}
                className={"size-pill " + (pickedSize === s ? "on" : "")}
                style={{ "--i": i }}
                onClick={(e) => { e.stopPropagation(); setPickedSize(s); }}>
                {s}</button>
            )}
          </div>
          <button
            className="quick-add"
            onClick={(e) => {
              e.stopPropagation();
              onAdd(p, pickedSize || "M");
            }}>
            <span>{pickedSize ? `Add — ${pickedSize}` : "Quick add"}</span>
            <span className="arrow">↗</span>
          </button>
        </div>

        <span className="dot d1" />
        <span className="dot d2" />
        <span className="dot d3" />
      </div>

      <div className="prod-meta">
        <div className="meta-row">
          <span className="prod-name">{p.name}</span>
          <span className="prod-price">
            {p.sale ? <><s>${p.price}</s> <em>${p.sale}</em></> : <>${p.price}</>}
          </span>
        </div>
        <div className="meta-row sub">
          <span>{p.cat === "tees" ? (SECTION === "Womens" ? "Dress" : SECTION === "Mens" ? "Suit" : "T-Shirt") : p.cat === "hoodies" ? "Hoodie" : p.cat === "pants" ? (SECTION === "Womens" ? "Classical" : "Trouser") : p.cat === "outer" ? "Outerwear" : "Accessory"}</span>
          <span>5 colors</span>
        </div>
      </div>
    </article>
  );
}

function Section({ cat, products, onAdd, density }) {
  return (
    <section className="section" id={`sec-${cat.id}`}>
      <header className="section-head">
        <div className="sec-left">
          <span className="sec-num">{cat.num}</span>
          <h2 className="sec-title">{cat.label}</h2>
        </div>
        <div className="sec-right">
          <span className="sec-note">{cat.note}</span>
          <a className="sec-link" href="#">View all ({products.length}) →</a>
        </div>
      </header>
      <div className={`grid grid-${density}`}>
        {products.map((p) => <ProductCard key={p.id} p={p} onAdd={onAdd} density={density} />)}
      </div>
    </section>
  );
}

function Header({ cartCount, onOpenCart, onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  return (
    <>
    <header className={"top " + (scrolled ? "scrolled" : "")}>
      <nav className="top-left">
        <a className={"lk " + (SECTION === "Home" ? "active" : "")} href="index.html">Home</a>
        <a className={"lk " + (SECTION === "Womens" ? "active" : "")} href="ARIRANG.html">Womens</a>
        <a className={"lk " + (SECTION === "Mens" ? "active" : "")} href="Mens.html">Mens</a>
        <a className={"lk " + (SECTION === "Stores" ? "active" : "")} href="Stores.html">Stores</a>
      </nav>
      <button className="hamburger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={"ham-line " + (menuOpen ? "open" : "")} />
        <span className={"ham-line " + (menuOpen ? "open" : "")} />
      </button>
      <a className="brand" href="index.html" aria-label="Arirang home">
        <span className="brand-mark" style={{ letterSpacing: "2.2px" }}>ARIRANG</span>
        <span className="brand-sub">— MONGOLIA · ULAANBAATAR</span>
      </a>
      <div className="top-right">
        <button className="lk" onClick={onSearch}>Search</button>
        <button className="lk cart-btn" onClick={onOpenCart}>
          Bag <span className="cart-num">[{String(cartCount).padStart(2, "0")}]</span>
        </button>
      </div>
    </header>
    {menuOpen && (
      <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
        <nav className="mobile-menu" onClick={e => e.stopPropagation()}>
          <a className={"mm-link " + (SECTION === "Home" ? "active" : "")} href="index.html">Home</a>
          <a className={"mm-link " + (SECTION === "Womens" ? "active" : "")} href="ARIRANG.html">Womens</a>
          <a className={"mm-link " + (SECTION === "Mens" ? "active" : "")} href="Mens.html">Mens</a>
          <a className={"mm-link " + (SECTION === "Stores" ? "active" : "")} href="Stores.html">Stores</a>
          <div className="mm-divider" />
          <button className="mm-link" onClick={() => { setMenuOpen(false); onSearch(); }}>Search</button>
          <button className="mm-link" onClick={() => { setMenuOpen(false); onOpenCart(); }}>
            Bag [{String(cartCount).padStart(2, "0")}]
          </button>
        </nav>
      </div>
    )}
    </>
  );
}

function Banner({ marquee }) {
  return (
    <section className="banner">
      <div className="banner-grid">
        <div className="banner-tag">
          <div>{BANNER.tag1}</div>
          <div>{BANNER.tag2}</div>
        </div>
        <div className="banner-display">
          <h1 style={{ fontWeight: "200", fontSize: "48px" }}>
            <em style={{ fontWeight: "600" }}>{BANNER.headline[0]}</em>{BANNER.headline[1]}<br />
            {BANNER.headline[2]}<em style={{ fontWeight: "600", letterSpacing: "-4.3px" }}>{BANNER.headline[3]}</em>{BANNER.headline[4]}
          </h1>
        </div>
        <div className="banner-meta">
          {BANNER.meta.map(([k,v],i) => (<div className="bm-row" key={i}><span>{k}</span><span>{v}</span></div>))}
          <div className="bm-row"><span>Pieces</span><span>{PRODUCTS.length} new</span></div>
        </div>
      </div>
      <div className="marquee">
        <div className="m-track">
          {[...Array(2)].map((_, i) =>
            <span key={i} className="m-line">
              {marquee} · Free returns within 30 days · Made in limited runs · {marquee} · Studio · 14 Lispenard ·&nbsp;
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

function CategoryStrip({ active, onPick, gender, onGender, filteredProducts }) {
  const prods = filteredProducts || PRODUCTS;
  return (
    <nav className="catstrip">
      <span className="cs-label">[ Filter — Catalogue ]</span>
      <button className={"cs " + (active === "all" ? "on" : "")} onClick={() => onPick("all")}>All ({prods.length})</button>
      {CATEGORIES.map((c) => {
        const count = prods.filter((p) => p.cat === c.id).length;
        if (count === 0) return null;
        return (
          <button key={c.id} className={"cs " + (active === c.id ? "on" : "")} onClick={() => onPick(c.id)}>
            {c.label} ({count})
          </button>
        );
      })}
      {SECTION === "Stores" && (
        <>
          <span className="cs-divider" />
          <button className={"cs gender-pill " + (gender === "all" ? "on" : "")} onClick={() => onGender("all")}>All</button>
          <button className={"cs gender-pill " + (gender === "mens" ? "on" : "")} onClick={() => onGender("mens")}>Mens</button>
          <button className={"cs gender-pill " + (gender === "womens" ? "on" : "")} onClick={() => onGender("womens")}>Womens</button>
        </>
      )}
      <span className="cs-spacer" />
      <button className="cs ghost">Sort: New ↓</button>
    </nav>
  );
}

function CartDrawer({ open, items, onClose, onRemove, onQty }) {
  const subtotal = items.reduce((a, i) => a + (i.product.sale || i.product.price) * i.qty, 0);
  return (
    <>
      <div className={"cart-scrim " + (open ? "on" : "")} onClick={onClose} />
      <aside className={"cart-drawer " + (open ? "on" : "")} aria-hidden={!open}>
        <header className="cart-head">
          <span className="cart-title">Shopping Bag — {items.length}</span>
          <button className="cart-x" onClick={onClose}>Close ×</button>
        </header>
        <div className="cart-body">
          {items.length === 0 &&
            <div className="cart-empty">
              <p>Your bag is quiet.</p>
              <p className="muted">Add a garment to begin.</p>
            </div>
          }
          {items.map((it, idx) => {
            const G = { Tee, Hoodie, Pants, Jacket, Cap, Bag, Dress }[it.product.type];
            return (
              <div className="cart-item" key={idx}>
                <div className="ci-thumb" style={{ background: "#ebe5d8" }}>
                  <div style={{ width: "80%", height: "80%", margin: "auto", display: "flex" }}>
                    <G color={it.product.color} />
                  </div>
                </div>
                <div className="ci-info">
                  <div className="ci-row">
                    <span>{it.product.name}</span>
                    <span>${(it.product.sale || it.product.price) * it.qty}</span>
                  </div>
                  <div className="ci-row sub">
                    <span>Size {it.size} · {it.product.code}</span>
                    <button className="ci-rm" onClick={() => onRemove(idx)}>Remove</button>
                  </div>
                  <div className="ci-row qty">
                    <button onClick={() => onQty(idx, -1)}>−</button>
                    <span>{it.qty}</span>
                    <button onClick={() => onQty(idx, 1)}>+</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <footer className="cart-foot">
          <div className="cf-row"><span>Subtotal</span><span>${subtotal}</span></div>
          <div className="cf-row sub"><span>Shipping</span><span>Calculated next</span></div>
          <button className="cf-checkout" disabled={items.length === 0}>Checkout — ${subtotal}</button>
          <p className="cf-note">Carbon-neutral shipping. Free returns within 30 days.</p>
        </footer>
      </aside>
    </>
  );
}

function App() {
  const t = { theme: "paper", accent: "#e10a17", density: "airy", marquee: "Spring/Summer '26 — The Field Edit" };
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [active, setActive] = useState("all");
  const [gender, setGender] = useState("all");
  const [toast, setToast] = useState(null);

  const addToCart = (product, size) => {
    setCart((prev) => {
      const found = prev.findIndex((i) => i.product.id === product.id && i.size === size);
      if (found >= 0) {
        const copy = [...prev];
        copy[found] = { ...copy[found], qty: copy[found].qty + 1 };
        return copy;
      }
      return [...prev, { product, size, qty: 1 }];
    });
    setToast({ name: product.name, size });
    clearTimeout(window.__toastT);
    window.__toastT = setTimeout(() => setToast(null), 2200);
  };
  const removeItem = (idx) => setCart((prev) => prev.filter((_, i) => i !== idx));
  const setQty = (idx, d) => setCart((prev) => prev.map((it, i) => i === idx ? { ...it, qty: Math.max(1, it.qty + d) } : it));

  const cartCount = cart.reduce((a, i) => a + i.qty, 0);
  const genderFiltered = gender === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.gender === gender || !p.gender);
  const sectionsToShow = active === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.id === active);

  return (
    <div className={"app theme-" + t.theme}>
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} onSearch={() => window.openSearch && window.openSearch()} />
      {!STORE.hideBanner && <Banner marquee={t.marquee} />}
      <CategoryStrip active={active} onPick={setActive} gender={gender} onGender={(g) => { setGender(g); setActive("all"); }} filteredProducts={genderFiltered} />
      <main className="catalogue">
        {sectionsToShow.map((cat) => {
          const catProducts = genderFiltered.filter((p) => p.cat === cat.id);
          if (catProducts.length === 0) return null;
          return (
            <Section
              key={cat.id}
              cat={cat}
              density={t.density}
              products={catProducts}
              onAdd={addToCart} />
          );
        })}
      </main>
      <footer className="foot">
        <div className="foot-grid">
          <div className="fg-col">
            <div className="fg-h">Arirang —</div>
            <p>A small studio making quiet garments. Cut in limited runs across New York and Seoul.</p>
          </div>
          <div className="fg-col">
            <div className="fg-h">Shop</div>
            <a href="#">T-Shirts</a><a href="#">Hoodies</a><a href="#">Pants</a><a href="#">Outerwear</a><a href="#">Accessories</a>
          </div>
          <div className="fg-col">
            <div className="fg-h">Studio</div>
            <a href="#">Lookbook</a><a href="#">Stockists</a><a href="#">Stores</a>
          </div>
          <div className="fg-col">
            <div className="fg-h">Newsletter</div>
            <p>Quiet dispatch. Once a season.</p>
            <form onSubmit={(e) => e.preventDefault()} className="sub">
              <input placeholder="email@studio.com" />
              <button>→</button>
            </form>
          </div>
        </div>
        <div className="foot-base">
          <span>© 2026 Arirang Studio</span>
          <span>14 Lispenard · NYC</span>
          <span>본사 · 서울 성수동</span>
          <span>Privacy · Terms</span>
        </div>
      </footer>

      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onRemove={removeItem} onQty={setQty} />

      {toast &&
        <div className="toast">
          <span className="toast-bar" />
          <div>
            <strong>Added.</strong> {toast.name} · Size {toast.size}
          </div>
          <button onClick={() => { setCartOpen(true); setToast(null); }}>View bag →</button>
        </div>
      }

    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
