import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { 
  ShoppingBag, 
  Utensils, 
  Film, 
  Gamepad2, 
  Car, 
  Leaf, 
  MapPin, 
  Phone, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -6 }}
    className="bg-brand-green/5 border border-brand-green/15 rounded-lg p-8 sm:p-10 transition-all hover:border-brand-green/30 hover:shadow-2xl hover:shadow-brand-green/10 relative overflow-hidden group"
  >
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-green-dark to-brand-green scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
    <div className="text-4xl mb-5 text-brand-green">
      <Icon size={40} />
    </div>
    <h3 className="font-serif text-xl text-white mb-3">{title}</h3>
    <p className="text-sm text-brand-text/50 leading-relaxed">{description}</p>
  </motion.div>
);

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "عن المول", href: "#about" },
    { name: "المرافق", href: "#features" },
    { name: "المعرض", href: "#gallery" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 ${isScrolled ? "bg-brand-black/85 backdrop-blur-xl border-b border-brand-green/15" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-serif text-2xl font-bold text-brand-green tracking-tight">شام سيتي</a>
        
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-brand-text/70 hover:text-brand-green text-sm font-medium tracking-wide transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-green transition-all group-hover:w-full" />
            </a>
          ))}
          <a href="#contact" className="bg-brand-green-dark hover:bg-brand-green text-white px-6 py-2 rounded transition-colors text-sm font-bold">تواصل معنا</a>
        </div>

        <button className="md:hidden text-brand-green" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-black/95 backdrop-blur-2xl border-b border-brand-green/10"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-brand-text/80 text-lg font-medium"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsMenuOpen(false)}
                className="bg-brand-green text-white text-center py-3 rounded font-bold"
              >
                تواصل معنا
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const palmY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const palmScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="relative overflow-x-hidden">
      <Nav />

      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_60%,#0a2e14_0%,#050a05_70%)]">
        {/* Grid Background Effect */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "linear-gradient(rgba(0,200,83,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,83,0.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            animation: "grid-drift 20s linear infinite"
          }}
        />

        {/* Ambient Bloom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-1 bg-gradient-to-r from-transparent via-brand-green to-transparent shadow-[0_0_60px_20px_rgba(0,200,83,0.35)]" />

        <motion.div 
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-20 text-center px-6"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] sm:text-xs tracking-[0.5em] text-brand-green uppercase mb-4"
          >
            دمشق &nbsp;·&nbsp; سوريا
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-tight bg-gradient-to-br from-brand-green-glow via-brand-green to-[#005c24] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,255,106,0.3)] mb-2"
          >
            Sham City Center
            <span className="block font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide mt-2 bg-gradient-to-r from-white to-brand-green bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,200,83,0.3)]">
              شام سيتي سنتر
            </span>
          </motion.h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-brand-green to-transparent mx-auto my-6 shadow-[0_0_12px_#00c853]" 
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.2 }}
            className="text-xs sm:text-base md:text-lg font-light text-brand-text/60 tracking-widest uppercase"
          >
            وجهتك التسويقية الأولى في قلب الشام
          </motion.p>
        </motion.div>

        {/* Foreground Palm Trees */}
        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-30">
          <motion.img 
            style={{ y: palmY, scale: palmScale }}
            className="absolute -bottom-5 -left-20 h-[95vh] max-h-[860px] object-contain brightness-[0.55] saturate-[1.2] hue-rotate-[10deg] drop-shadow-[0_0_18px_rgba(0,200,83,0.25)] origin-bottom-left animate-[palmsway_8s_ease-in-out_infinite]"
            src="https://www.pngplay.com/wp-content/uploads/1/Palm-Tree-PNG-Transparent.png" 
            alt="palm" 
          />
          <motion.img 
            style={{ y: palmY, scale: palmScale }}
            className="absolute -bottom-5 -right-20 h-[95vh] max-h-[860px] object-contain brightness-[0.55] saturate-[1.2] hue-rotate-[10deg] drop-shadow-[0_0_18px_rgba(0,200,83,0.25)] origin-bottom-right scale-x-[-1] animate-[palmsway_9s_ease-in-out_infinite_reverse]"
            src="https://www.pngplay.com/wp-content/uploads/1/Palm-Tree-PNG-Transparent.png" 
            alt="palm" 
          />
        </div>

        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[10px] tracking-[0.3em] text-brand-green uppercase">اكتشف</span>
          <ChevronDown className="text-brand-green" size={18} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 sm:py-32 px-6 sm:px-12 bg-brand-deep border-t border-brand-green/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-3 border border-brand-green/30 rounded-lg" />
            <img 
              src="https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?w=800&q=80" 
              alt="Sham City Mall Exterior" 
              className="relative z-10 w-full h-[300px] sm:h-[450px] object-cover rounded shadow-2xl brightness-90 saturate-[0.8]"
            />
            <div className="absolute -bottom-5 -left-5 z-20 bg-brand-green-dark text-white p-6 sm:p-8 rounded shadow-xl text-center min-w-[140px]">
              <span className="font-serif text-3xl sm:text-5xl font-black block leading-none">200+</span>
              <span className="text-[10px] sm:text-xs tracking-widest opacity-80 uppercase">محل تجاري</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-label">من نحن</p>
            <h2 className="section-title">مركز تسوق <span>راقٍ</span> في قلب دمشق</h2>
            <p className="section-body">
              شام سيتي سنتر هو الوجهة التسويقية الأولى في سوريا، يجمع بين التسوق الفاخر وتجارب الترفيه المميزة تحت سقف واحد.
              يضم المركز أكثر من 200 محل تجاري يمثل كبرى الماركات العالمية والمحلية، فضلاً عن مطاعم راقية ومناطق ترفيه للعائلة.
            </p>
            <p className="section-body mt-6">
              صُمِّم بأسلوب معماري عصري يلتقي فيه الأصالة الشامية بالحداثة، ليوفر لزواره تجربة تسوق استثنائية لا تُنسى.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32 px-6 sm:px-12 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <p className="section-label">ما نقدمه</p>
            <h2 className="section-title">مرافق <span>متكاملة</span></h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard 
              icon={ShoppingBag} 
              title="تسوق فاخر" 
              description="أكثر من 200 متجر يضم أشهر الماركات العالمية والمحلية لتجربة تسوق لا مثيل لها." 
            />
            <FeatureCard 
              icon={Utensils} 
              title="مطاعم عالمية" 
              description="منطقة مطاعم متنوعة تضم المأكولات الشرقية والغربية وأشهر مطاعم الوجبات السريعة." 
            />
            <FeatureCard 
              icon={Film} 
              title="سينما ودور عرض" 
              description="صالات سينما بأحدث التقنيات لتجربة سينمائية مذهلة للعائلة والأصدقاء." 
            />
            <FeatureCard 
              icon={Gamepad2} 
              title="ترفيه للأطفال" 
              description="منطقة ترفيه متكاملة مخصصة للأطفال تضمن لهم وقتاً ممتعاً وآمناً." 
            />
            <FeatureCard 
              icon={Car} 
              title="موقف سيارات" 
              description="موقف سيارات واسع بطاقة استيعابية كبيرة يضمن لك الراحة من أول لحظة." 
            />
            <FeatureCard 
              icon={Leaf} 
              title="مناطق خضراء" 
              description="ممرات وحدائق داخلية بتصميم عصري توفر أجواء منعشة ومريحة لزوارنا." 
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 sm:py-32 px-6 sm:px-12 bg-brand-deep border-t border-brand-green/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <p className="section-label">معرض الصور</p>
            <h2 className="section-title">اكتشف <span>عالمنا</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px] sm:auto-rows-[300px]">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="lg:row-span-2 group relative overflow-hidden rounded-lg cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=700&q=80" alt="Mall" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 saturate-75" />
              <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-brand-green/70 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm tracking-widest font-bold uppercase">الردهة الرئيسية</span>
              </div>
            </motion.div>
            
            {[
              { img: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=600&q=80", label: "المتاجر" },
              { img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80", label: "منطقة الطعام" },
              { img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80", label: "الترفيه" },
              { img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80", label: "الأزياء" },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
              >
                <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 saturate-75" />
                <div className="absolute inset-x-0 bottom-0 p-6 pt-16 bg-gradient-to-t from-brand-green/70 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs tracking-widest font-bold uppercase">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 sm:py-32 px-6 sm:px-12 bg-brand-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <p className="section-label">تواصل معنا</p>
            <h2 className="section-title">نحن هنا <span>لخدمتك</span></h2>
            <p className="section-body mb-12">
              يسعدنا الإجابة على جميع استفساراتك وتزويدك بكل المعلومات التي تحتاجها عن شام سيتي سنتر.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-brand-green flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-brand-green uppercase mb-1">الموقع</p>
                  <p className="text-brand-text/85 text-lg">دمشق، سوريا</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-brand-green flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div dir="ltr" className="text-right">
                  <p className="text-[10px] tracking-widest text-brand-green uppercase mb-1">الهاتف</p>
                  <p className="text-brand-text/85 text-lg">+964 770 499 6603</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-brand-green flex-shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-brand-green uppercase mb-1">أوقات العمل</p>
                  <p className="text-brand-text/85 text-lg">٩ صباحاً – ١١ مساءً · طوال أيام الأسبوع</p>
                </div>
              </div>
            </div>
          </div>

          <form className="bg-brand-deep/50 p-8 sm:p-10 rounded-xl border border-brand-green/10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-brand-green uppercase">الاسم</label>
                <input type="text" placeholder="اسمك الكريم" className="w-full bg-brand-green/5 border border-brand-green/15 focus:border-brand-green rounded px-4 py-3 text-sm outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-brand-green uppercase">الهاتف</label>
                <input type="tel" placeholder="+964 ..." dir="ltr" className="w-full bg-brand-green/5 border border-brand-green/15 focus:border-brand-green rounded px-4 py-3 text-sm outline-none transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] tracking-widest text-brand-green uppercase">البريد الإلكتروني</label>
              <input type="email" placeholder="example@email.com" dir="ltr" className="w-full bg-brand-green/5 border border-brand-green/15 focus:border-brand-green rounded px-4 py-3 text-sm outline-none transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] tracking-widest text-brand-green uppercase">رسالتك</label>
              <textarea rows={4} placeholder="كيف يمكننا مساعدتك؟" className="w-full bg-brand-green/5 border border-brand-green/15 focus:border-brand-green rounded px-4 py-3 text-sm outline-none transition-colors resize-none" />
            </div>
            <button type="submit" className="w-full sm:w-auto bg-brand-green-dark hover:bg-brand-green text-white px-10 py-4 rounded font-bold uppercase tracking-widest text-sm transition-all transform hover:-translate-y-1 shadow-lg shadow-brand-green/20">
              إرسال الرسالة
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-deep border-t border-brand-green/10 py-16 px-6 sm:px-12 text-center sm:text-right">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="font-serif text-3xl font-black text-brand-green mb-4">شام سيتي سنتر</h2>
            <div className="flex justify-center sm:justify-start gap-6 text-brand-text/40">
              <Facebook className="hover:text-brand-green cursor-pointer transition-colors" size={20} />
              <Instagram className="hover:text-brand-green cursor-pointer transition-colors" size={20} />
              <Twitter className="hover:text-brand-green cursor-pointer transition-colors" size={20} />
            </div>
          </div>
          
          <div className="flex flex-col sm:items-end gap-2">
            <div className="flex gap-8 text-sm text-brand-text/50">
              <a href="#about" className="hover:text-brand-green transition-colors">عن المول</a>
              <a href="#features" className="hover:text-brand-green transition-colors">المرافق</a>
              <a href="#gallery" className="hover:text-brand-green transition-colors">المعرض</a>
            </div>
            <p className="text-[10px] text-brand-text/30 tracking-widest uppercase mt-4">© 2026 شام سيتي سنتر · دمشق، سوريا</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
