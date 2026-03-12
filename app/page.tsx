"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Phone, Mail, MapPin, Clock3, Star, Menu, X, Search, ChevronRight, ArrowLeft, Fuel, Gauge, Calendar } from "lucide-react";
type ShellProps = {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  intro?: string;
};

const ACCENT = "#99f2d1";
const ACCENT_SOFT = "rgba(153, 242, 209, 0.14)";
export default function CarDealershipWebsite() {
  const [currentPage, setCurrentPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [makeFilter, setMakeFilter] = useState("All makes");
  const [bodyFilter, setBodyFilter] = useState("All body styles");
  const [priceFilter, setPriceFilter] = useState("Any budget");
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  const [selectedVehicleImageIndex, setSelectedVehicleImageIndex] = useState(0);

  const contactDetails = {
    phone: "01484255541",
    sales: "Hello@summitmotorcompany.co.uk",
    buying: "buying@summitmotorcompany.co.uk",
    address: ["Unit 3 Victoria Business Park, Sheffield Road, Holmfirth, West Yorkshire, HD9 7TT"],
    openingTimes: [
      ["Monday", "APPOINTMENT ONLY"],
      ["Tuesday", "APPOINTMENT ONLY"],
      ["Wednesday", "APPOINTMENT ONLY"],
      ["Thursday", "APPOINTMENT ONLY"],
      ["Friday", "APPOINTMENT ONLY"],
      ["Saturday", "APPOINTMENT ONLY"],
      ["Sunday", "APPOINTMENT ONLY"],
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

  const openVehiclePage = (car: any) => {
    setSelectedVehicle(car);
    setSelectedVehicleImageIndex(0);
    setCurrentPage("vehicle");
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

function Shell({ children, title, eyebrow, intro }: ShellProps) {
  return (
      <div className="min-h-screen bg-[#0b0b0b] text-white">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0b]/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 lg:px-8">
            <button onClick={() => goToPage("home")} className="text-left">
              
              <div className="mt-1 flex items-center gap-2 text-lg font-semibold">
                <Image
  src="/summit-logo.png"
  alt="Summit Motor Company"
  width={84}
  height={28}
  className="object-contain"
/>
                
              </div>
            </button>

            <nav className="hidden items-center gap-6 lg:flex">
              {pageLinks.map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => goToPage(key)}
                  className={`border-b pb-1 text-sm transition ${currentPage === key ? "border-[#99f2d1] text-white" : "border-transparent text-white/65 hover:text-[#99f2d1]"}`}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => goToPage("contact")}
                className="hidden rounded-full border px-4 py-2 text-sm font-medium text-[#0b0b0b] transition hover:opacity-90 lg:block"
                style={{ backgroundColor: ACCENT, borderColor: ACCENT }}
              >
                Enquire now
              </button>
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="rounded-full border border-white/10 p-2 transition hover:border-[#99f2d1] hover:text-[#99f2d1] lg:hidden"
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
                    className="rounded-2xl px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/5 hover:text-[#99f2d1]"
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
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">Summit Motor Company</p>
              <p className="mt-4 max-w-xs leading-6">
                Premium used vehicles in Holmfirth, professionally presented with a straightforward, appointment-led buying experience.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Explore</h3>
              <div className="mt-4 grid gap-2">
                {pageLinks.map(([key, label]) => (
                  <button key={key} onClick={() => goToPage(key)} className="text-left hover:text-[#99f2d1]">
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white">Get in touch</h3>
              <div className="mt-4 space-y-2 leading-6">
                <p>{contactDetails.phone}</p>
                <p>{contactDetails.sales}</p>
                <p>{contactDetails.buying}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white">Visit Summit</h3>
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


function StockCard({ car, hidePrice = false, onView }: { car: any; hidePrice?: boolean; onView?: (car: any) => void }) {
  return (
    <article
      className="group overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1"
      style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
    >
      <div className="relative overflow-hidden">
        <img src={car.image} alt={car.name} className="h-64 w-full object-cover brightness-90 transition duration-500 group-hover:scale-105 group-hover:brightness-100" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
      </div>
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
        <button onClick={() => onView?.(car)} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/85 transition hover:text-[#99f2d1] hover:drop-shadow-[0_0_10px_rgba(153,242,209,0.35)]">
          Full details <ChevronRight className="h-4 w-4" />
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
              src="/hero-car.jpg"
              alt="Summit Motor Company"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-[#0b0b0b]" />
          </div>

          <div className="relative mx-auto flex max-w-7xl items-end px-5 py-24 lg:px-8 lg:py-32">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">Premium used vehicles in Holmfirth</p>
              <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
                Summit Motor Company
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 md:text-lg">
                Quality used vehicles in Holmfirth, carefully selected and professionally presented with a straightforward, appointment-led buying experience.
              </p>
              <div className="mt-8 h-px w-24" style={{ backgroundColor: ACCENT }} />
            </div>
          </div>
        </section>
<section className="border-b border-white/10 bg-black">
  <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
    <div className="grid gap-4 sm:grid-cols-3">
      <div
        className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#99f2d1]"
        style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
      >
        <p className="text-2xl font-semibold text-white">Carefully selected stock</p>
        <p className="mt-2 text-sm text-white/55">
          A hand-picked selection of quality used vehicles, prepared and presented to a high standard.
        </p>
      </div>

      <div
        className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#99f2d1]"
        style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
      >
        <p className="text-2xl font-semibold text-white">Straightforward service</p>
        <p className="mt-2 text-sm text-white/55">
          A first-class, appointment-led service focused on honest communication and a smoother buying experience.
        </p>
      </div>

      <div
        className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#99f2d1]"
        style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
      >
        <p className="text-2xl font-semibold text-white">UK wide delivery</p>
        <p className="mt-2 text-sm text-white/55">
          Nationwide delivery is available across the UK, making it easy to buy from us wherever you are based.
        </p>
      </div>
    </div>
  </div>
</section>
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">Selected stock</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Vehicles in stock</h2>
            </div>
            <button onClick={() => goToPage("stock")} className="hidden text-sm text-white/75 hover:text-[#99f2d1] md:block">
              Browse all stock
            </button>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {stock.filter((car) => car.status === "in-stock").slice(0, 3).map((car) => (
              <StockCard key={car.id} car={car} onView={openVehiclePage} />
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">Why choose Summit</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">A more personal approach to vehicle sales.</h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/72">
                At Summit Motor Company, we keep a variety of hand-picked vehicles in stock and focus on delivering a straightforward, professional experience from first enquiry through to handover.
              </p>
              <button
                onClick={() => goToPage("about")}
                className="mt-8 rounded-full border px-4 py-2 text-sm font-medium text-[#0b0b0b] transition hover:opacity-90"
                style={{ backgroundColor: ACCENT, borderColor: ACCENT }}
              >
                Read more
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Hand-picked quality used vehicles",
                "Appointment-only customer service",
                "Straightforward, professional buying experience",
                "Nationwide delivery available across the UK",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[28px] border border-white/10 bg-black/25 p-6 text-sm leading-6 text-white/75"
                  style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
                >
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
        title="Quality used vehicles, professionally presented and backed by a more personal buying experience."
        intro="At Summit Motor Company, our focus is simple: quality stock, honest communication, and a first-class service for every customer who visits us in Holmfirth or buys from us from elsewhere in the UK."
      >
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                title: "Quality stock",
                text: "Every vehicle in stock is carefully chosen and professionally presented, with clear information and preparation standards that reflect the quality we want the business to be known for.",
              },
              {
                title: "Straightforward service",
                text: "From your first enquiry to final handover, we aim to keep the process organised, straightforward, and enjoyable, whether you are buying locally or from elsewhere in the UK.",
              },
              {
                title: "Built on trust",
                text: "We believe buying a used vehicle should feel clear and confidence-inspiring, with the right support, strong presentation, and service that gives customers a reason to come back again.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8"
                style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
              >
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
        eyebrow="Our stock"
        title="Browse our current stock of quality used vehicles."
        intro="Browse our latest selection of quality used vehicles in Holmfirth and use the filters below to quickly narrow your search by make, body style, and budget."
      >
        <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
            <div
              className="grid gap-4 rounded-[30px] border border-white/10 bg-white/[0.03] p-5 lg:grid-cols-4 lg:p-6"
              style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
            >
            <div className="relative lg:col-span-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search make, model or keyword"
                className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm outline-none placeholder:text-white/30 focus:border-[#99f2d1]"
              />
            </div>
            <select value={makeFilter} onChange={(e) => setMakeFilter(e.target.value)} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#99f2d1]">
              {makes.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <select value={bodyFilter} onChange={(e) => setBodyFilter(e.target.value)} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#99f2d1]">
              {bodyStyles.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#99f2d1]">
              {["Any budget", "Under £40,000", "£40,000 - £70,000", "£70,000+"].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="mt-5 flex items-center justify-between text-sm text-white/55">
            <p>{filteredInStock.length} vehicles found</p>
            <button
              onClick={() => {
                setSearch("");
                setMakeFilter("All makes");
                setBodyFilter("All body styles");
                setPriceFilter("Any budget");
              }}
              className="hover:text-[#99f2d1]"
            >
              Clear filters
            </button>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {filteredInStock.map((car) => (
              <StockCard key={car.id} car={car} onView={openVehiclePage} />
            ))}
          </div>
        </section>
      </Shell>
    );
  }

  if (currentPage === "sold") {
    return (
      <Shell
        eyebrow="Previously sold"
        title="A selection of vehicles we have previously sold."
        intro="Our sold vehicles give you a better feel for the type and quality of stock we regularly retail, while keeping the presentation clean and straightforward."
      >
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {soldCars.map((car) => (
              <StockCard key={car.id} car={car} hidePrice onView={openVehiclePage} />
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
        title="Get in touch with Summit Motor Company."
        intro="If you would like to enquire about a vehicle, discuss selling your car, or arrange an appointment, our team will be happy to help."
      >
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div
              className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8"
              style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 text-white/65" />
                  <div>
                    <p className="text-sm text-white/45">Telephone</p>
                    <p className="mt-1 text-lg font-medium">{contactDetails.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 text-white/65" />
                  <div>
                    <p className="text-sm text-white/45">Email</p>
                    <p className="mt-1 text-lg font-medium">{contactDetails.sales}</p>
                    <p className="mt-4 text-sm text-white/45">Sell your vehicle</p>
                    <p className="mt-1 text-lg font-medium">{contactDetails.buying}</p>
                  </div>
                </div>
              </div>
            </div>

            <form
              className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8"
              style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30" placeholder="First name" />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30" placeholder="Last name" />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30 md:col-span-2" placeholder="Email address" />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30 md:col-span-2" placeholder="Telephone number" />
                <textarea className="min-h-[160px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30 md:col-span-2" placeholder="Tell us how we can help and we will get back to you as soon as possible." />
              </div>
              <button
                className="mt-5 rounded-full border px-4 py-2 text-sm font-medium text-[#0b0b0b] transition hover:opacity-90"
                style={{ backgroundColor: ACCENT, borderColor: ACCENT }}
              >
                Submit enquiry
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
        title="Visit Summit Motor Company in Holmfirth."
        intro="We are based at Unit 3 Victoria Business Park, Sheffield Road, Holmfirth, West Yorkshire, HD9 7TT. Viewings are available strictly by appointment only, seven days a week."
      >
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div
              className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8"
              style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
            >
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-white/65" />
                <div>
                  <p className="text-sm text-white/45">Visit us</p>
                  <div className="mt-2 space-y-1 text-lg font-medium">
                    {contactDetails.address.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div
  className="mt-8 overflow-hidden rounded-[24px] border border-white/10"
  style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
>
                <div className="flex h-72 items-center justify-center bg-[linear-gradient(135deg,#1a1a1a,#0f0f0f)] text-center text-white/45">
                  Map location for Summit Motor Company.
                </div>
              </div>
            </div>

            <div
              className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8"
              style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
            >
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-white/65" />
                <h2 className="text-2xl font-semibold">Viewing times</h2>
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
        title="Looking to sell your vehicle?"
        intro="If you are thinking about selling your vehicle, complete the form below and our team will be in touch. We are always interested in quality stock and aim to keep the process straightforward and professional."
      >
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div
              className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8"
              style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
            >
              <h2 className="text-2xl font-semibold">Why sell through Summit?</h2>
              <div className="mt-6 grid gap-4">
                {[
                  "Fast response from our buying team",
                  "We are always interested in quality used vehicles",
                  "A simple, straightforward approach to vehicle buying",
                  "Collection and remote purchase options available",
                ].map((item) => (
                  <div
  key={item}
  className="rounded-2xl bg-black/25 p-4 text-sm text-white/75"
  style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <form
              className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8"
              style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30" placeholder="Full name" />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30" placeholder="Phone number" />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30 md:col-span-2" placeholder="Email address" />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30" placeholder="Vehicle registration" />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30" placeholder="Mileage" />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30 md:col-span-2" placeholder="Vehicle make and model" />
                <textarea className="min-h-[140px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30 md:col-span-2" placeholder="Tell us about the vehicle, its condition, service history, specification, and anything else you think would be useful." />
              </div>
              <button
                className="mt-5 rounded-full border px-4 py-2 text-sm font-medium text-[#0b0b0b] transition hover:opacity-90"
                style={{ backgroundColor: ACCENT, borderColor: ACCENT }}
              >
                Request a valuation
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
        eyebrow="Customer reviews"
        title="What our customers say about Summit Motor Company."
        intro="We pride ourselves on supplying quality used vehicles with a first-class, personal service, and our customer feedback reflects the way we like to do business."
      >
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {testimonials.map((item) => (
              <article
  key={item.name}
  className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8"
  style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
>
                <div className="flex gap-1 text-white">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-white" />
                  ))}
                </div>
                <p className="mt-5 text-lg leading-8 text-white/82">“{item.text}”</p>
                <p className="mt-6 text-sm font-medium text-white/55">Verified customer</p>
              </article>
            ))}
          </div>
        </section>
      </Shell>
    );
  }

  if (currentPage === "vehicle" && selectedVehicle) {
    // Vehicle images array (placeholder: using the same image for all)
    const vehicleImages = [selectedVehicle.image, selectedVehicle.image, selectedVehicle.image, selectedVehicle.image];
    return (
      <Shell
        eyebrow="Vehicle"
        title={`${selectedVehicle.year} ${selectedVehicle.name}`}
        intro={`Explore full details, pricing, and key specification for this ${selectedVehicle.make} currently offered by Summit Motor Company.`}
      >
        <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <button
            onClick={() => goToPage(selectedVehicle.status === "sold" ? "sold" : "stock")}
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-[#99f2d1]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {selectedVehicle.status === "sold" ? "sold stock" : "stock list"}
          </button>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <div
                className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03]"
                style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
              >
                <img
                  src={vehicleImages[selectedVehicleImageIndex]}
                  alt={selectedVehicle.name}
                  className="h-[520px] w-full object-cover"
                />
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="flex gap-4 min-w-max">
                  {vehicleImages.map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedVehicleImageIndex(index)}
                      className={`overflow-hidden rounded-[24px] border bg-white/[0.03] transition ${selectedVehicleImageIndex === index ? "border-[#99f2d1]" : "border-white/10 hover:border-[#99f2d1]"}`}
                      style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
                    >
                      <img src={image} alt={`${selectedVehicle.name} view ${index + 1}`} className="h-32 w-44 object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div
                className="rounded-[34px] border border-white/10 bg-white/[0.03] p-7"
                style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
              >
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">{selectedVehicle.make}</p>
                <h2 className="mt-3 text-4xl font-semibold leading-tight">{selectedVehicle.name}</h2>
                <p className="mt-4 text-3xl font-semibold text-white">
                  {selectedVehicle.status === "sold" || !selectedVehicle.price ? "Previously sold" : currency(selectedVehicle.price)}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 text-sm text-white/75">
                  <div className="rounded-2xl bg-black/25 p-4">Year: {selectedVehicle.year}</div>
                  <div className="rounded-2xl bg-black/25 p-4">Mileage: {selectedVehicle.mileage.toLocaleString()} miles</div>
                  <div className="rounded-2xl bg-black/25 p-4">Fuel: {selectedVehicle.fuel}</div>
                  <div className="rounded-2xl bg-black/25 p-4">Transmission: {selectedVehicle.transmission}</div>
                  <div className="rounded-2xl bg-black/25 p-4">Body style: {selectedVehicle.body}</div>
                  <div className="rounded-2xl bg-black/25 p-4">Status: {selectedVehicle.status === "sold" ? "Previously sold" : "Available now"}</div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => goToPage("contact")}
                    className="rounded-full border px-4 py-2 text-sm font-medium text-[#0b0b0b] transition hover:opacity-90"
                    style={{ backgroundColor: ACCENT, borderColor: ACCENT }}
                  >
                    Enquire now
                  </button>
                  <button
                    onClick={() => goToPage("find")}
                    className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-[#99f2d1] hover:text-[#99f2d1]"
                  >
                    Arrange viewing
                  </button>
                </div>
              </div>

              <div
                className="rounded-[34px] border border-white/10 bg-white/[0.03] p-7"
                style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
              >
                <h3 className="text-xl font-semibold">Key details</h3>
                <div className="mt-6 space-y-4 text-sm text-white/75">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-white/50">Registration year</span>
                    <span className="font-medium text-white">{selectedVehicle.year}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-white/50">Make</span>
                    <span className="font-medium text-white">{selectedVehicle.make}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-white/50">Model</span>
                    <span className="font-medium text-white">{selectedVehicle.name}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-white/50">Mileage</span>
                    <span className="font-medium text-white">{selectedVehicle.mileage.toLocaleString()} miles</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-white/50">Fuel type</span>
                    <span className="font-medium text-white">{selectedVehicle.fuel}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-white/50">Transmission</span>
                    <span className="font-medium text-white">{selectedVehicle.transmission}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">Body style</span>
                    <span className="font-medium text-white">{selectedVehicle.body}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div
              className="rounded-[34px] border border-white/10 bg-white/[0.03] p-7"
              style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
            >
              <h3 className="text-2xl font-semibold">Vehicle description</h3>
              <p className="mt-5 text-base leading-8 text-white/72">
                This {selectedVehicle.year} {selectedVehicle.name} is part of our current vehicle collection at Summit Motor Company. It is presented with key information including mileage, transmission, fuel type, and body style, giving you a clear overview before arranging a viewing or making an enquiry.
              </p>
              <p className="mt-5 text-base leading-8 text-white/72">
                If you would like to know more about this vehicle, request additional information, or arrange an appointment, please get in touch with our team and we will be happy to help.
              </p>
            </div>

            <div
              className="rounded-[34px] border border-white/10 bg-white/[0.03] p-7"
              style={{ boxShadow: `inset 0 0 0 1px ${ACCENT_SOFT}` }}
            >
              <h3 className="text-2xl font-semibold">Why buy from Summit?</h3>
              <div className="mt-6 grid gap-3 text-sm text-white/75">
                {[
                  "Quality used vehicles, professionally presented",
                  "Appointment-only viewings in Holmfirth",
                  "Straightforward, personal customer service",
                  "Nationwide delivery available across the UK",
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-black/25 p-4">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Shell>
    );
  }
  return null;
}