"use client";
import { useMemo, useState } from "react";
import { CarFront, Phone, Mail, MapPin, Clock3, Star, Menu, X, Search, ChevronRight } from "lucide-react";

export default function CarDealershipWebsite() {
  const [currentPage, setCurrentPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [makeFilter, setMakeFilter] = useState("All makes");
  const [bodyFilter, setBodyFilter] = useState("All body styles");
  const [priceFilter, setPriceFilter] = useState("Any budget");

  const contactDetails = {
    phone: "01604 000000",
    sales: "sales@yourdealership.co.uk",
    buying: "buying@yourdealership.co.uk",
    address: ["Unit 4, Trade Centre", "Northampton", "NN1 1AA", "United Kingdom"],
    openingTimes: [
      ["Monday", "09:00 - 18:00"],
      ["Tuesday", "09:00 - 18:00"],
      ["Wednesday", "09:00 - 18:00"],
      ["Thursday", "09:00 - 18:00"],
      ["Friday", "09:00 - 18:00"],
      ["Saturday", "09:00 - 17:00"],
      ["Sunday", "By appointment"],
    ],
  };

  const stock = [
    {
      id: 1,
      name: "BMW M4 Competition xDrive",
      year: 2022,
      price: 49995,
      mileage: 18200,
      fuel: "Petrol",
      transmission: "Automatic",
      body: "Coupe",
      make: "BMW",
      status: "in-stock",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      name: "Mercedes-Benz A45 S 4MATIC+",
      year: 2021,
      price: 37995,
      mileage: 24100,
      fuel: "Petrol",
      transmission: "Automatic",
      body: "Hatchback",
      make: "Mercedes-Benz",
      status: "in-stock",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      name: "Audi RS3 Sportback Carbon Vorsprung",
      year: 2023,
      price: 45495,
      mileage: 9800,
      fuel: "Petrol",
      transmission: "Automatic",
      body: "Hatchback",
      make: "Audi",
      status: "in-stock",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      name: "Land Rover Defender 110 X-Dynamic",
      year: 2022,
      price: 61995,
      mileage: 21400,
      fuel: "Diesel",
      transmission: "Automatic",
      body: "SUV",
      make: "Land Rover",
      status: "in-stock",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 5,
      name: "Porsche 911 Carrera 4 GTS",
      year: 2022,
      price: 108995,
      mileage: 11200,
      fuel: "Petrol",
      transmission: "Automatic",
      body: "Coupe",
      make: "Porsche",
      status: "sold",
      image: "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 6,
      name: "Range Rover Sport Autobiography",
      year: 2021,
      price: 72995,
      mileage: 28750,
      fuel: "Diesel",
      transmission: "Automatic",
      body: "SUV",
      make: "Land Rover",
      status: "sold",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 7,
      name: "BMW M3 Touring Competition",
      year: 2024,
      price: 78995,
      mileage: 6400,
      fuel: "Petrol",
      transmission: "Automatic",
      body: "Estate",
      make: "BMW",
      status: "in-stock",
      image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 8,
      name: "Audi Q8 Black Edition",
      year: 2022,
      price: 52995,
      mileage: 19100,
      fuel: "Diesel",
      transmission: "Automatic",
      body: "SUV",
      make: "Audi",
      status: "sold",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const testimonials = [
    {
      name: "James R.",
      text: "Brilliant service from first enquiry to handover. The car was exactly as described and prepared to a really high standard.",
    },
    {
      name: "Sophie M.",
      text: "Sold my vehicle through them and the process was quick, fair, and properly professional the whole way through.",
    },
    {
      name: "Daniel T.",
      text: "The stock filtering makes it easy to browse online, and the team made buying remotely feel very straightforward.",
    },
    {
      name: "Amelia P.",
      text: "Lovely showroom feel, premium website, and the communication was spot on. Would absolutely recommend.",
    },
  ];

  const makes = ["All makes", ...Array.from(new Set(stock.map((car) => car.make)))];
  const bodyStyles = ["All body styles", ...Array.from(new Set(stock.map((car) => car.body)))];

  const filteredInStock = useMemo(() => {
    return stock.filter((car) => {
      if (car.status !== "in-stock") return false;
      const matchesSearch = `${car.name} ${car.make}`.toLowerCase().includes(search.toLowerCase());
      const matchesMake = makeFilter === "All makes" || car.make === makeFilter;
      const matchesBody = bodyFilter === "All body styles" || car.body === bodyFilter;
      const matchesPrice =
        priceFilter === "Any budget" ||
        (priceFilter === "Under £40,000" && car.price < 40000) ||
        (priceFilter === "£40,000 - £70,000" && car.price >= 40000 && car.price <= 70000) ||
        (priceFilter === "£70,000+" && car.price > 70000);

      return matchesSearch && matchesMake && matchesBody && matchesPrice;
    });
  }, [stock, search, makeFilter, bodyFilter, priceFilter]);

  const soldCars = stock.filter((car) => car.status === "sold");

  const currency = (value: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

  const pageLinks = [
    ["about", "About"],
    ["stock", "Stock list"],
    ["sold", "Sold stock"],
    ["contact", "Contact us"],
    ["find", "Find us"],
    ["sell", "Sell your vehicle"],
    ["testimonials", "Testimonials"],
  ];

  const goToPage = (page: string) => {
    setCurrentPage(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function Shell({ children, title, eyebrow, intro }) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0b]/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
            <button onClick={() => goToPage("home")} className="text-left">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">Prestige Motor Group</p>
              <div className="mt-1 flex items-center gap-2 text-lg font-semibold">
                <CarFront className="h-5 w-5" />
                <span>Your Dealership</span>
              </div>
            </button>

            <nav className="hidden items-center gap-6 lg:flex">
              {pageLinks.map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => goToPage(key)}
                  className={`text-sm transition ${currentPage === key ? "text-white" : "text-white/65 hover:text-white"}`}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => goToPage("contact")}
                className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white hover:text-black lg:block"
              >
                Enquire now
              </button>
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="rounded-full border border-white/10 p-2 lg:hidden"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="border-t border-white/10 bg-black/90 px-5 py-4 lg:hidden">
              <div className="grid gap-2">
                {pageLinks.map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => goToPage(key)}
                    className="rounded-2xl px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        <main>
          {(title || eyebrow || intro) && (
            <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]">
              <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
                {eyebrow && <p className="text-xs uppercase tracking-[0.35em] text-white/45">{eyebrow}</p>}
                {title && <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">{title}</h1>}
                {intro && <p className="mt-5 max-w-3xl text-base leading-7 text-white/70 md:text-lg">{intro}</p>}
              </div>
            </section>
          )}
          {children}
        </main>

        <footer className="border-t border-white/10 bg-black/40">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 text-sm text-white/65 lg:grid-cols-4 lg:px-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">Your Dealership</p>
              <p className="mt-4 max-w-xs leading-6">
                Premium used vehicle website inspired by high-end dealership layouts, ready to deploy on Vercel and customise with your own stock feed and branding.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Quick links</h3>
              <div className="mt-4 grid gap-2">
                {pageLinks.map(([key, label]) => (
                  <button key={key} onClick={() => goToPage(key)} className="text-left hover:text-white">
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white">Contact</h3>
              <div className="mt-4 space-y-2 leading-6">
                <p>{contactDetails.phone}</p>
                <p>{contactDetails.sales}</p>
                <p>{contactDetails.buying}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white">Visit us</h3>
              <div className="mt-4 space-y-1 leading-6">
                {contactDetails.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  function HeroCard({ label, value }) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur">
        <p className="text-3xl font-semibold md:text-4xl">{value}</p>
        <p className="mt-2 text-sm text-white/55">{label}</p>
      </div>
    );
  }

  function StockCard({ car, hidePrice = false }) {
    return (
      <article className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/20">
        <img src={car.image} alt={car.name} className="h-64 w-full object-cover" />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-white/45">{car.year}</p>
              <h3 className="mt-1 text-xl font-semibold leading-tight">{car.name}</h3>
            </div>
            {!hidePrice && <p className="text-lg font-semibold">{currency(car.price)}</p>}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/75">
            <div className="rounded-2xl bg-black/30 p-3">{car.mileage.toLocaleString()} miles</div>
            <div className="rounded-2xl bg-black/30 p-3">{car.fuel}</div>
            <div className="rounded-2xl bg-black/30 p-3">{car.transmission}</div>
            <div className="rounded-2xl bg-black/30 p-3">{car.body}</div>
          </div>
          <button className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/85 hover:text-white">
            View details <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </article>
    );
  }

  if (currentPage === "home") {
    return (
      <Shell>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80"
              alt="Luxury showroom car"
              className="h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-[#0b0b0b]" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1.35fr_0.9fr] lg:px-8 lg:py-28">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">Prestige & performance vehicles</p>
              <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
                A premium dealership layout built for serious stock presentation.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 md:text-lg">
                This version is structured around the style you referenced: strong hero section, premium spacing, clean navigation, high-end vehicle cards, and dedicated pages for sales, buying, reviews, and contact.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => goToPage("stock")}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  View stock
                </button>
                <button
                  onClick={() => goToPage("sell")}
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  Sell your vehicle
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <HeroCard label="Vehicles in stock" value={`${stock.filter((c) => c.status === "in-stock").length}+`} />
              <HeroCard label="Google-style review score" value="4.9/5" />
              <HeroCard label="Nationwide buying & sales" value="UK-wide" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">Latest vehicles</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Curated stock, presented properly</h2>
            </div>
            <button onClick={() => goToPage("stock")} className="hidden text-sm text-white/75 hover:text-white md:block">
              View all stock
            </button>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {stock.filter((car) => car.status === "in-stock").slice(0, 3).map((car) => (
              <StockCard key={car.id} car={car} />
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">About the dealership</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Built to feel premium without looking overdesigned.</h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/72">
                The structure follows a prestige dealership approach: clear top navigation, luxury imagery, stock-first browsing, easy enquiry paths, and separate pages for buying, selling, location, and social proof.
              </p>
              <button
                onClick={() => goToPage("about")}
                className="mt-8 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Read more
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Dedicated stock and sold stock pages",
                "Fast vehicle search and filter controls",
                "Clear contact, location, and opening times",
                "Sell-your-car lead capture layout",
              ].map((item) => (
                <div key={item} className="rounded-[28px] border border-white/10 bg-black/25 p-6 text-sm leading-6 text-white/75">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </Shell>
    );
  }

  if (currentPage === "about") {
    return (
      <Shell
        eyebrow="About"
        title="A prestige dealership website designed around trust, stock quality, and a premium buying experience."
        intro="Use this page to tell your story, explain your standards, and show buyers why they should choose your business over a faceless marketplace listing."
      >
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                title: "Exacting standards",
                text: "Every vehicle should be carefully chosen, professionally prepared, and presented with detailed photography, accurate descriptions, and transparent condition notes.",
              },
              {
                title: "A proper customer journey",
                text: "From first enquiry to handover, the experience should feel organised, informed, and high touch — especially for higher-value vehicles.",
              },
              {
                title: "Long-term trust",
                text: "This layout leaves space for warranty info, finance support, aftersales, detailing, transport, and repeat-customer credibility.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <p className="mt-4 text-base leading-7 text-white/72">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </Shell>
    );
  }

  if (currentPage === "stock") {
    return (
      <Shell
        eyebrow="Stock list"
        title="Browse our current vehicle collection."
        intro="This page includes the filter system you asked for, so customers can search stock quickly by keyword, make, body style, and budget."
      >
        <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="grid gap-4 rounded-[30px] border border-white/10 bg-white/[0.03] p-5 lg:grid-cols-4 lg:p-6">
            <div className="relative lg:col-span-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search make or model"
                className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm outline-none placeholder:text-white/30"
              />
            </div>
            <select value={makeFilter} onChange={(e) => setMakeFilter(e.target.value)} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none">
              {makes.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <select value={bodyFilter} onChange={(e) => setBodyFilter(e.target.value)} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none">
              {bodyStyles.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none">
              {["Any budget", "Under £40,000", "£40,000 - £70,000", "£70,000+"].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="mt-5 flex items-center justify-between text-sm text-white/55">
            <p>{filteredInStock.length} vehicle(s) found</p>
            <button
              onClick={() => {
                setSearch("");
                setMakeFilter("All makes");
                setBodyFilter("All body styles");
                setPriceFilter("Any budget");
              }}
              className="hover:text-white"
            >
              Reset filters
            </button>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {filteredInStock.map((car) => (
              <StockCard key={car.id} car={car} />
            ))}
          </div>
        </section>
      </Shell>
    );
  }

  if (currentPage === "sold") {
    return (
      <Shell
        eyebrow="Sold stock"
        title="A record of previously sold vehicles."
        intro="Per your request, sold stock is displayed without prices. This keeps the page clean while still showing the level of stock your dealership moves."
      >
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {soldCars.map((car) => (
              <StockCard key={car.id} car={car} hidePrice />
            ))}
          </div>
        </section>
      </Shell>
    );
  }

  if (currentPage === "contact") {
    return (
      <Shell
        eyebrow="Contact us"
        title="Speak to the team about sales, sourcing, buying, or part exchange."
        intro="This page is set up for your phone numbers, sales email, buying email, WhatsApp, and a premium enquiry form."
      >
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 text-white/65" />
                  <div>
                    <p className="text-sm text-white/45">Phone</p>
                    <p className="mt-1 text-lg font-medium">{contactDetails.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 text-white/65" />
                  <div>
                    <p className="text-sm text-white/45">Sales</p>
                    <p className="mt-1 text-lg font-medium">{contactDetails.sales}</p>
                    <p className="mt-4 text-sm text-white/45">Vehicle buying</p>
                    <p className="mt-1 text-lg font-medium">{contactDetails.buying}</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30" placeholder="First name" />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30" placeholder="Last name" />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30 md:col-span-2" placeholder="Email address" />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30 md:col-span-2" placeholder="Phone number" />
                <textarea className="min-h-[160px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30 md:col-span-2" placeholder="How can we help?" />
              </div>
              <button className="mt-5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90">
                Send enquiry
              </button>
            </form>
          </div>
        </section>
      </Shell>
    );
  }

  if (currentPage === "find") {
    return (
      <Shell
        eyebrow="Find us"
        title="Visit the showroom, view vehicles in person, or arrange an appointment."
        intro="This page combines map/location content with opening hours, making it easy for customers to know exactly where you are and when you are open."
      >
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-white/65" />
                <div>
                  <p className="text-sm text-white/45">Showroom address</p>
                  <div className="mt-2 space-y-1 text-lg font-medium">
                    {contactDetails.address.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 overflow-hidden rounded-[24px] border border-white/10">
                <div className="flex h-72 items-center justify-center bg-[linear-gradient(135deg,#1a1a1a,#0f0f0f)] text-center text-white/45">
                  Google Map embed goes here
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-white/65" />
                <h2 className="text-2xl font-semibold">Opening times</h2>
              </div>
              <div className="mt-6 divide-y divide-white/10">
                {contactDetails.openingTimes.map(([day, time]) => (
                  <div key={day} className="flex items-center justify-between py-4 text-sm">
                    <span className="text-white/75">{day}</span>
                    <span className="font-medium text-white">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Shell>
    );
  }

  if (currentPage === "sell") {
    return (
      <Shell
        eyebrow="Sell your vehicle"
        title="Make it simple for owners to submit their car for purchase or sale-or-return."
        intro="This page is styled to feel premium and trustworthy, with room for form fields, valuation messaging, and reasons to sell through your dealership."
      >
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
              <h2 className="text-2xl font-semibold">Why sell through us?</h2>
              <div className="mt-6 grid gap-4">
                {[
                  "Fast response from the buying team",
                  "Prestige and performance vehicle focus",
                  "Straight purchase or sale-or-return options",
                  "Nationwide vehicle collection available",
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-black/25 p-4 text-sm text-white/75">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <form className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30" placeholder="Full name" />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30" placeholder="Phone number" />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30 md:col-span-2" placeholder="Email address" />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30" placeholder="Registration" />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30" placeholder="Mileage" />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30 md:col-span-2" placeholder="Make and model" />
                <textarea className="min-h-[140px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30 md:col-span-2" placeholder="Tell us about the car, condition, service history, and any modifications" />
              </div>
              <button className="mt-5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90">
                Request valuation
              </button>
            </form>
          </div>
        </section>
      </Shell>
    );
  }

  if (currentPage === "testimonials") {
    return (
      <Shell
        eyebrow="Testimonials"
        title="Customer feedback that builds trust before the first phone call."
        intro="A dedicated reviews page is ideal for higher-value sales because buyers often want reassurance on communication, preparation standards, and overall professionalism."
      >
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
                <div className="flex gap-1 text-white">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-white" />
                  ))}
                </div>
                <p className="mt-5 text-lg leading-8 text-white/82">“{item.text}”</p>
                <p className="mt-6 text-sm font-medium text-white/55">{item.name}</p>
              </article>
            ))}
          </div>
        </section>
      </Shell>
    );
  }

  return null;
}
