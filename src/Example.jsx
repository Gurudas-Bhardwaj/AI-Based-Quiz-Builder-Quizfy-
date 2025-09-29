import React, { useState } from "react";
import img from "./Context/img.jpeg"
// Evil Eye Protection Bracelet - Landing Page (Tailwind + React)
// Default export a single React component that can be dropped into a project using TailwindCSS.

export default function Example() {
  const [form, setForm] = useState({
    name: "",
    mobile: "+91",
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // Mock submit flow; replace with real API call
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
    }, 900);
  }

  return (
    <div className="min-h-screen font-Outfit bg-gradient-to-b from-indigo-950 via-indigo-800 to-sky-900 text-slate-100">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-emerald-400 flex items-center justify-center text-indigo-900 font-bold shadow-lg">EE</div>
          <div>
            <h1 className="font-bold text-lg md:text-xl">Guard Your Aura</h1>
            <p className="text-xs text-slate-200">Evil Eye Protection Bracelet</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 items-center text-sm text-slate-200">
          <span className="flex items-center gap-2">✨ <strong>₹199/-</strong></span>
          <span className="px-3 py-1 rounded-full bg-indigo-700/40">Free Shipping</span>
          <span className="px-3 py-1 rounded-full bg-indigo-700/40">COD Available</span>
          <button className="ml-4 rounded-md bg-amber-400/95 text-indigo-900 px-4 py-2 font-semibold hover:scale-105 transition">
            BUY NOW
          </button>
        </nav>
      </header>

      {/* HERO */}
      <main className="max-w-6xl mx-auto px-6 py-8 grid gap-8 grid-cols-1 lg:grid-cols-2 items-center">
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-900/40 px-3 py-1 rounded-full text-xs">
            <span>Handmade • Unisex • Adjustable</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Guard Your Aura: <br /> Embrace Positivity with Our
            <span className="text-amber-300"> Evil Eye Bracelet</span>
          </h2>

          <p className="text-slate-200/90 max-w-xl">
            Handmade, adjustable string bracelet designed to protect you from
            negative vibes and invite positive energy. Lightweight, durable and
            perfect for everyday wear.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <button className="px-6 py-3 rounded-md bg-amber-400 text-indigo-900 font-semibold shadow hover:scale-105 transition">
              BUY NOW &amp; PROTECT YOUR ENERGY
            </button>

            <div className="flex gap-3 items-center text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-indigo-700/40 flex items-center justify-center">🚚</span>
                <div>
                  <div className="w-20 font-semibold">Free Shipping</div>
                  <div className="text-slate-300 text-[12px]">Across India</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-indigo-700/40 flex items-center justify-center">💵</span>
                <div>
                  <div className="w-28 font-semibold">Cash on Delivery</div>
                  <div className="text-slate-300 text-[12px]">Pay ₹199 on delivery</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <div className="p-3 rounded-lg bg-white/5 text-center w-28">
              <div className="text-2xl font-bold">⭐ 4.9</div>
              <div className="text-xs text-slate-300">200+ reviews</div>
            </div>

            <div className="p-3 rounded-lg bg-white/5 text-center w-36">
              <div className="text-lg font-bold">Limited</div>
              <div className="text-xs text-slate-300">Stock running out</div>
            </div>
          </div>
        </section>

        {/* Product Image Card */}
        <aside className="relative">
          <div className="bg-white/5 rounded-3xl p-6 flex items-center justify-center shadow-2xl">
            {/* Replace the div below with an <img /> pointing to your product photo */}
            <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-slate-800 to-indigo-700 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-white/5 flex items-center justify-center text-amber-300 font-semibold">
              <img src={img} alt="" />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 left-6 bg-slate-900/30 rounded-xl px-4 py-3 shadow-md">
            <div className="text-xs text-slate-300">Perfect gift boxed</div>
            <div className="font-semibold">Presented in Elegant Packaging</div>
          </div>
        </aside>
      </main>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h3 className="text-2xl font-bold mb-6">Crafted for Your Protection &amp; Style</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard title="Handmade Design" desc="Authentic craftsmanship: durable thread, detailed knots." emoji="🤲" />
          <FeatureCard title="Protective Evil Eye" desc="Your shield: guards against negativity, invites positivity." emoji="👁️" />
          <FeatureCard title="Unisex Style" desc="Universal appeal: perfect for everyone, everyday elegance." emoji="🧑‍🤝‍🧑" />
          <FeatureCard title="Adjustable Fit" desc="Comfort & convenience: effortless fit for all wrist sizes." emoji="🪢" />
          <FeatureCard title="Premium Look" desc="Elevated gifting: presented in an elegant gift box." emoji="🎁" />
          <FeatureCard title="Free Shipping" desc="Fast shipping across India." emoji="🚚" />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h3 className="text-2xl font-bold mb-4">More Than Just an Accessory</h3>
        <p className="text-slate-300 max-w-3xl">Your daily dose of positivity — a chic accessory with a purpose. Protect your spirit while looking effortlessly stylish.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Defend Your Spirit" desc="Active protection from negative energies." icon="🛡️" />
          <Card title="Style Meets Soul" desc="A chic accessory with profound spiritual meaning." icon="✨" />
          <Card title="The Perfect Gift" desc="Share protection & good vibes with loved ones." icon="💝" />
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-2xl font-bold mb-4">Your Journey to Protection Starts Here</h3>
            <ol className="list-decimal pl-6 space-y-3 text-slate-200">
              <li>
                <strong>Click Below:</strong> Select your bracelet by clicking 'Order Now'.
              </li>
              <li>
                <strong>Fill Details:</strong> Provide your Name, Address, and Contact Information.
              </li>
              <li>
                <strong>Pay on Delivery:</strong> Enjoy the ease of Cash on Delivery (₹199/-).
              </li>
            </ol>

            <div className="mt-4 inline-flex items-center gap-2 bg-amber-200/10 px-3 py-2 rounded-md">
              <span className="text-amber-300">⚡</span>
              <div>
                <div className="text-slate-200 font-semibold">Hurry! Limited Stock.</div>
                <div className="text-slate-300 text-sm">Secure Your Protection Today!</div>
              </div>
            </div>
          </div>

          {/* ORDER FORM */}
          <div className="bg-indigo-900/40 p-6 rounded-2xl shadow-lg">
            <h4 className="text-xl font-bold mb-3">Complete Your Order</h4>
            {orderPlaced ? (
              <div className="bg-emerald-900/30 p-4 rounded-md">
                <div className="font-semibold">Order Confirmed!</div>
                <div className="text-sm text-slate-300">We will call you to confirm delivery details. Thank you!</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <label className="block">
                  <span className="text-sm text-slate-200">Full Name</span>
                  <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full rounded-md bg-white/5 border border-white/5 px-3 py-2 placeholder-slate-400 outline-none focus:ring-2 focus:ring-amber-300" placeholder="Your full name" />
                </label>

                <label className="block">
                  <span className="text-sm text-slate-200">Mobile Number</span>
                  <input name="mobile" value={form.mobile} onChange={handleChange} required className="mt-1 w-full rounded-md bg-white/5 border border-white/5 px-3 py-2 placeholder-slate-400 outline-none focus:ring-2 focus:ring-amber-300" placeholder="+91XXXXXXXXXX" />
                </label>

                <label className="block">
                  <span className="text-sm text-slate-200">Street / Address</span>
                  <input name="street" value={form.street} onChange={handleChange} required className="mt-1 w-full rounded-md bg-white/5 border border-white/5 px-3 py-2 placeholder-slate-400 outline-none focus:ring-2 focus:ring-amber-300" placeholder="House no, street, area" />
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <label>
                    <span className="text-sm text-slate-200">City</span>
                    <input name="city" value={form.city} onChange={handleChange} required className="mt-1 w-full rounded-md bg-white/5 border border-white/5 px-3 py-2 placeholder-slate-400 outline-none focus:ring-2 focus:ring-amber-300" placeholder="City" />
                  </label>
                  <label>
                    <span className="text-sm text-slate-200">State</span>
                    <input name="state" value={form.state} onChange={handleChange} required className="mt-1 w-full rounded-md bg-white/5 border border-white/5 px-3 py-2 placeholder-slate-400 outline-none focus:ring-2 focus:ring-amber-300" placeholder="State" />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <label>
                    <span className="text-sm text-slate-200">Pincode</span>
                    <input name="pincode" value={form.pincode} onChange={handleChange} required className="mt-1 w-full rounded-md bg-white/5 border border-white/5 px-3 py-2 placeholder-slate-400 outline-none focus:ring-2 focus:ring-amber-300" placeholder="Pin" />
                  </label>
                  <label>
                    <span className="text-sm text-slate-200">Landmark (Optional)</span>
                    <input name="landmark" value={form.landmark} onChange={handleChange} className="mt-1 w-full rounded-md bg-white/5 border border-white/5 px-3 py-2 placeholder-slate-400 outline-none focus:ring-2 focus:ring-amber-300" placeholder="Near bus stop, building" />
                  </label>
                </div>

                <div>
                  <div className="text-sm text-slate-200 mb-2">Payment Method</div>
                  <label className="flex items-center gap-3 bg-white/3 px-3 py-2 rounded-md">
                    <input type="radio" name="payment" defaultChecked />
                    <div>
                      <div className="font-semibold">Cash on Delivery (COD)</div>
                      <div className="text-sm text-slate-300">Pay ₹199 on delivery</div>
                    </div>
                  </label>
                </div>

                <button type="submit" disabled={loading} className="w-full mt-2 px-4 py-3 rounded-md bg-amber-400 text-indigo-900 font-semibold hover:scale-105 transition">
                  {loading ? "Placing order..." : "PLACE ORDER (₹199 - COD)"}
                </button>
              </form>
            )}

            <div className="mt-4 text-xs text-slate-300">We will never share your details. Delivery typically within 3-7 business days.</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-6 py-6 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <div className="font-semibold">Kishangarh Bas, Alwar, Rajasthan – 301405</div>
            <div className="text-sm text-slate-300 mt-1">Email: support@example.com • Phone: +91-XXXXXXXXXX</div>
          </div>

          <div className="flex items-center gap-3">
            <a className="text-sm text-slate-300 hover:underline">Privacy Policy</a>
            <a className="text-sm text-slate-300 hover:underline">Terms & Conditions</a>
            <div className="flex items-center gap-2">
              <a className="text-slate-300/90">Instagram</a>
              <a className="text-slate-300/90">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


/* Small subcomponents used above */
function FeatureCard({ title, desc, emoji }) {
  return (
    <div className="bg-white/3 p-4 rounded-xl shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-2xl">{emoji}</div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-slate-300">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, desc, icon }) {
  return (
    <div className="p-4 rounded-xl bg-white/3">
      <div className="text-3xl mb-3">{icon}</div>
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-slate-300 mt-1">{desc}</div>
    </div>
  );
}
