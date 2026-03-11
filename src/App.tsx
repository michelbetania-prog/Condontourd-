import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Users, 
  Globe, 
  TrendingUp, 
  MessageCircle, 
  Mail, 
  Phone, 
  ArrowRight,
  ChevronRight,
  Star,
  ShieldCheck,
  Building2,
  Award,
  X,
  ChevronDown
} from 'lucide-react';

// --- Components ---

const Accordion = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left font-bold text-slate-800 hover:text-brand-accent transition-colors group"
      >
        <span className="text-lg">{title}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-slate-400 group-hover:text-brand-accent`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-slate-600 text-sm space-y-4 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PoliciesModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden"
          >
            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-2xl font-serif text-slate-900">Información del Evento</h3>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-slate-200 rounded-full transition-colors group"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-slate-400 group-hover:text-slate-600" />
              </button>
            </div>
            <div className="p-6 md:p-10 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <Accordion title="Precios y Formas de Pago">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-slate-600 mb-1 italic">Si realizas tu inscripción entre el 15 de marzo y el 31 de mayo</p>
                      <p className="text-2xl font-bold text-brand-primary">💰 US$160</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-slate-600 mb-1 italic">Si realizas tu inscripción entre el 1 de junio y el 31 de julio</p>
                      <p className="text-2xl font-bold text-brand-primary">💰 US$300</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-slate-600 mb-1 italic">Si realizas tu inscripción entre el 1 de agosto y el 15 de octubre</p>
                      <p className="text-2xl font-bold text-brand-primary">💰 US$400</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <p className="font-bold text-slate-800 mb-2">Forma de pago</p>
                    <p>La inscripción al evento se confirma únicamente con el pago total del monto correspondiente al momento de la compra.</p>
                  </div>
                </div>
              </Accordion>
              <Accordion title="Políticas de Devolución">
                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-slate-800 mb-1">Confirmación de inscripción</p>
                    <p>La inscripción al evento se confirma únicamente con el pago total del monto correspondiente al momento de la compra.</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 mb-1">Cancelaciones por parte del participante</p>
                    <p>Las inscripciones no son reembolsables una vez realizado el pago.</p>
                    <p className="mt-2">En caso de no poder asistir, el participante podrá transferir su entrada a otra persona, notificándolo previamente a la organización.</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 mb-1">Cambios de titularidad</p>
                    <p>La transferencia de la inscripción a otra persona deberá notificarse al menos 72 horas antes del evento, proporcionando los datos del nuevo participante.</p>
                    <p className="mt-2">La notificación debe enviarse al correo: <a href="mailto:drazoilafernandez@gmail.com" className="text-brand-accent font-bold hover:underline">drazoilafernandez@gmail.com</a></p>
                  </div>
                </div>
              </Accordion>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-accent transition-all"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="https://lh3.googleusercontent.com/d/1VR7f0ZRQw_gbUEoBATTyOrg0sdKmGPAh" 
            alt="CodontouRD Logo" 
            className={`h-12 w-auto transition-all ${isScrolled ? '' : 'brightness-0 invert'}`}
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#beneficios" className={`text-sm font-medium hover:text-brand-accent transition-colors ${isScrolled ? 'text-slate-600' : 'text-white/80'}`}>Beneficios</a>
          <a href="#detalles" className={`text-sm font-medium hover:text-brand-accent transition-colors ${isScrolled ? 'text-slate-600' : 'text-white/80'}`}>Detalles</a>
          <a href="#organizadora" className={`text-sm font-medium hover:text-brand-accent transition-colors ${isScrolled ? 'text-slate-600' : 'text-white/80'}`}>Organizadora</a>
          <a href="#registro" className="bg-brand-accent text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-primary transition-all">Inscribirme</a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
    {/* Background Image Placeholder */}
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop" 
        alt="Dental Clinic High End" 
        className="w-full h-full object-cover brightness-[0.3]"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/50 to-brand-primary"></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center"
      >
        <span className="inline-block px-4 py-1 rounded-full bg-brand-accent/20 text-brand-accent text-sm font-bold tracking-widest uppercase mb-8 border border-brand-accent/30">
          Primer Congreso de Turismo Dental en RD
        </span>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mb-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight max-w-4xl lg:text-left">
            Tu excelencia Clínica + <span className="text-brand-accent italic">Visión Global</span>: El nuevo nivel del turismo dental
          </h1>
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="relative shrink-0"
          >
            <div className="bg-gradient-to-br from-brand-accent to-blue-600 p-1 rounded-3xl shadow-[0_0_50px_rgba(14,165,233,0.3)]">
              <div className="bg-brand-primary/90 backdrop-blur-xl px-10 py-8 rounded-[1.4rem] text-center border border-white/10">
                <p className="text-white/60 text-xs uppercase tracking-[0.2em] font-bold mb-2">Inscripción</p>
                <div className="flex flex-col items-center">
                  <span className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-1">US$160</span>
                  <div className="h-px w-full bg-white/10 my-3"></div>
                  <p className="text-brand-accent font-medium text-sm">Precio final US$400</p>
                  <p className="text-white/40 text-[10px] uppercase mt-2 tracking-widest">Tarifa de lanzamiento</p>
                  
                  <button 
                    type="button"
                    onClick={() => {
                      // We need to trigger the modal from here too. 
                      // I'll make the state global or pass it down.
                      // For now, I'll assume the user wants it in the registration form mostly,
                      // but I'll add a scroll to registration or trigger the same modal.
                      const event = new CustomEvent('open-policies');
                      window.dispatchEvent(event);
                    }}
                    className="mt-4 text-[10px] font-bold text-brand-accent hover:text-white transition-colors uppercase tracking-[0.2em] underline decoration-brand-accent/30 underline-offset-4"
                  >
                    Ver precios y políticas
                  </button>
                </div>
              </div>
            </div>
            {/* Decorative elements for the badge */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand-gold rounded-full animate-pulse"></div>
          </motion.div>
        </div>

        <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          ¿Tu clínica dental está lista para el mercado global o solo para el local? Únete a la élite de la odontología exportadora en el destino #1 del Caribe.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="#registro" className="btn-primary flex items-center gap-3 group text-lg px-10">
            ASEGURAR MI LUGAR AHORA
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#detalles" className="text-white/80 hover:text-white font-medium flex items-center gap-2 transition-colors">
            Ver programa completo
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
    
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
        <div className="w-1 h-2 bg-white/50 rounded-full"></div>
      </div>
    </div>
  </section>
);

const Problem = () => (
  <section className="section-padding bg-white">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl mb-8 leading-tight text-slate-900 tracking-tight">
          El paciente internacional no busca un "dentista"...
        </h2>
        <p className="text-lg text-slate-600 mb-6 italic border-l-4 border-brand-accent pl-6">
          "Busca una Clínica Dental que le brinde solución integral basada en confianza y experiencia."
        </p>
        <p className="text-xl font-medium text-slate-800">
          Nos enseñaron a hacer medicina, pero no nos enseñaron a vender medicina.
        </p>
      </motion.div>
      <div className="relative">
        {/* PLACEHOLDER: Imagen de la marca o concepto de confianza */}
        <img 
          src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop" 
          alt="Trust in Dentistry" 
          className="rounded-2xl shadow-2xl"
          referrerPolicy="no-referrer"
        />
        <div className="absolute -bottom-6 -right-6 bg-brand-primary text-white p-8 rounded-2xl shadow-xl hidden md:block">
          <p className="text-4xl font-serif font-bold mb-1">#1</p>
          <p className="text-sm uppercase tracking-widest opacity-70">Destino del Caribe</p>
        </div>
      </div>
    </div>
  </section>
);

const Presentation = () => (
  <section className="section-padding bg-slate-900 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/5 skew-x-12 translate-x-1/2"></div>
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl mb-6 tracking-tight">CodontouRD 2026</h2>
        <p className="text-xl text-brand-accent font-medium tracking-[0.2em] uppercase">El puente entre tu consulta y el mundo</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: Globe, title: "Captación Global", desc: "Estrategias probadas para atraer pacientes de EE.UU., Canadá y Europa." },
          { icon: TrendingUp, title: "Venta Compleja", desc: "Cómo cerrar tratamientos de alta complejidad a miles de kilómetros." },
          { icon: ShieldCheck, title: "Protocolos High-End", desc: "Atención de clase mundial que garantiza la recomendación." },
          { icon: Building2, title: "Gestión Mipyme", desc: "Convierte tu clínica en una exportadora de servicios de salud." },
          { icon: Users, title: "Networking Real", desc: "Conecta con hoteles, tour operadores y plataformas clave." },
          { icon: Award, title: "Marca País", desc: "Posiciónate usando la fuerza de República Dominicana como destino." }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
          >
            <item.icon className="w-12 h-12 text-brand-accent mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Urgency = () => (
  <section className="py-24 bg-brand-accent relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
      <h2 className="text-4xl md:text-6xl font-serif text-brand-primary mb-8 tracking-tight">
        ¿Serás espectador o protagonista?
      </h2>
      <p className="text-2xl text-brand-primary/80 mb-12 max-w-3xl mx-auto leading-relaxed">
        La República Dominicana ya es el destino #1 del Caribe. El mercado no espera.
      </p>
      <a href="#registro" className="bg-brand-primary text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-slate-800 transition-all shadow-2xl inline-block">
        PRE-REGÍSTRATE AHORA Y OBTÉN PRIORIDAD
      </a>
    </div>
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
      <div className="absolute top-10 left-10 w-64 h-64 border-8 border-brand-primary rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 border-8 border-brand-primary rounded-full"></div>
    </div>
  </section>
);

const EventDetails = () => (
  <section id="detalles" className="section-padding bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-10">
          <h2 className="text-4xl md:text-5xl mb-8 tracking-tight">Detalles del Congreso</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                <Calendar className="text-brand-accent w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Fecha</p>
                <p className="text-xl font-medium text-slate-900">Sábado 24 de octubre 2026</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="text-brand-accent w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Lugar</p>
                <p className="text-xl font-medium text-slate-900 leading-snug">Centro de Convenciones Hotel Dominican Fiesta, Santo Domingo</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="text-brand-accent w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Horario</p>
                <p className="text-xl font-medium text-slate-900">8:30 a.m. a 6:00 p.m.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                <Globe className="text-brand-accent w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Marco del Evento</p>
                <p className="text-xl font-medium text-slate-900">Bolsa Turística del Caribe (BTC)</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          {/* PLACEHOLDER: Imagen del Hotel Dominican Fiesta o mapa */}
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" 
            alt="Hotel Dominican Fiesta" 
            className="rounded-3xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  </section>
);

const PreviousEvent = () => (
  <section className="section-padding bg-slate-50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">Éxito de Nuestro Primer Encuentro</h2>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">Revive el impacto del Primer Encuentro de Turismo Dental en RD. Una comunidad que ya está transformando la odontología con visión global.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Imágenes representativas del evento anterior */}
        {[
          "https://lh3.googleusercontent.com/d/1KTjlOVvJu_fg6OXBWrHiwSzmBfff_14i",
          "https://lh3.googleusercontent.com/d/1FpiiTUpqgWbpwYLcbMAy14cRgnnJ5uUL",
          "https://lh3.googleusercontent.com/d/1ZBxEqFSgRdAW8938ynDJFqS_piFMY6kV"
        ].map((url, i) => (
          <div key={i} className="aspect-video bg-slate-200 rounded-2xl overflow-hidden group shadow-md">
            <img 
              src={url} 
              alt={`Evento Anterior ${i + 1}`} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Dr. Ricardo Méndez", text: "El evento anterior cambió mi perspectiva sobre cómo gestionar mi clínica para pacientes extranjeros." },
          { name: "Dra. Elena Santos", text: "Excelente organización y contenido de altísimo valor estratégico. Imprescindible para crecer." },
          { name: "Dr. Juan Pérez", text: "Las conexiones que hice en el primer encuentro ya están dando frutos en mi consulta." }
        ].map((t, i) => (
          <div key={i} className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-brand-gold text-brand-gold" />)}
            </div>
            <p className="text-slate-600 italic mb-6">"{t.text}"</p>
            <p className="font-bold text-slate-900">{t.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Organizer = () => (
  <section id="organizadora" className="section-padding bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          {/* Foto de la organizadora Dra. Zoila Fernández */}
          <div className="aspect-[3/4] bg-slate-200 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="https://lh3.googleusercontent.com/d/1Yqf9LsNVputslKsMv4zGKfdncxAys4c0" 
              alt="Dra. Zoila Fernández" 
              className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-brand-gold text-white p-8 rounded-2xl shadow-xl max-w-xs border border-white/20">
            <p className="font-serif italic text-lg leading-relaxed">
              “El odontólogo dominicano es excelente y se merece que el mundo lo conozca…”
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl mb-6">Dra. Zoila Fernández</h2>
          <p className="text-brand-accent font-bold uppercase tracking-widest mb-8">Visión, Liderazgo y Compromiso</p>
          <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
            <p>
              Con años de experiencia en la práctica clínica y una visión incansable por el posicionamiento de la odontología dominicana, la Dra. Zoila Fernández ha liderado el movimiento de Turismo Dental en el país.
            </p>
            <p>
              Su misión es clara: dotar a los profesionales locales de las herramientas comerciales y estratégicas necesarias para competir en el escenario internacional, garantizando que la calidad dominicana brille en todo el mundo.
            </p>
          </div>
          <div className="mt-10 flex gap-4">
            <a href="https://wa.me/18096881130" target="_blank" className="flex items-center gap-2 text-brand-primary font-bold hover:text-brand-accent transition-colors">
              <MessageCircle className="w-5 h-5" />
              Contactar Directamente
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const RegistrationForm = ({ onShowPolicies }: { onShowPolicies: () => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', clinic: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        // Redirect to payment or show success message
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="registro" className="section-padding bg-brand-primary text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-6xl mb-8 tracking-tight">Asegura tu lugar hoy</h2>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
              No pierdas la oportunidad de ser parte del evento que definirá el futuro de tu clínica.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-brand-accent w-6 h-6" />
                <span className="text-lg">Acceso completo a todas las conferencias</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-brand-accent w-6 h-6" />
                <span className="text-lg">Material de apoyo y estrategias descargables</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-brand-accent w-6 h-6" />
                <span className="text-lg">Certificado de participación internacional</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-brand-accent w-6 h-6" />
                <span className="text-lg">Almuerzo y networking en Hotel Dominican Fiesta</span>
              </div>
            </div>

            <div className="mt-16 p-8 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-sm uppercase tracking-widest text-slate-500 mb-2">Inversión Especial</p>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold text-brand-accent">US$160</span>
                <span className="text-xl text-slate-500 line-through">US$400</span>
              </div>
              <p className="text-sm text-slate-400 mt-4 italic">*Válido por tiempo limitado</p>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <button 
                  type="button"
                  onClick={onShowPolicies}
                  className="text-xs font-bold text-brand-accent hover:text-white transition-colors uppercase tracking-widest hover:underline decoration-brand-accent/30 underline-offset-4"
                >
                  Ver precios y políticas
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 text-slate-900 shadow-2xl">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-serif mb-4">¡Registro Exitoso!</h3>
                  <p className="text-slate-600 mb-8">Te hemos enviado un correo con los detalles. Ahora puedes proceder al pago para confirmar tu cupo.</p>
                  <button className="w-full bg-brand-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-primary transition-all shadow-lg flex items-center justify-center gap-2">
                    PROCEDER AL PAGO (US$160)
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-serif mb-6">Formulario de Inscripción</h3>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Nombre Completo</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                      placeholder="Ej. Dr. Juan Pérez"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Correo Electrónico</label>
                    <input 
                      required
                      type="email" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                      placeholder="ejemplo@correo.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Teléfono / WhatsApp</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                      placeholder="809-000-0000"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Nombre de tu Clínica</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                      placeholder="Nombre de la clínica dental"
                      value={formData.clinic}
                      onChange={e => setFormData({...formData, clinic: e.target.value})}
                    />
                  </div>
                  <button 
                    disabled={status === 'loading'}
                    type="submit" 
                    className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-accent transition-all shadow-lg disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Procesando...' : 'REGISTRARME AHORA'}
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-4">
                    Al registrarte, aceptas recibir comunicaciones sobre el evento.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="footer" className="bg-slate-950 text-white py-20 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <img 
            src="https://lh3.googleusercontent.com/d/1VR7f0ZRQw_gbUEoBATTyOrg0sdKmGPAh" 
            alt="CodontouRD Logo" 
            className="h-10 w-auto brightness-0 invert"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      
      <div>
        <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-brand-accent">Enlaces Rápidos</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
          <li><a href="#detalles" className="hover:text-white transition-colors">Agenda</a></li>
          <li><a href="#organizadora" className="hover:text-white transition-colors">Ponentes</a></li>
          <li><a href="#registro" className="hover:text-white transition-colors">Registro</a></li>
          <li><a href="#footer" className="hover:text-white transition-colors">Contacto</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-brand-accent">Información del Evento</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li>Congreso de Turismo Dental</li>
          <li>República Dominicana</li>
          <li>Año 2026</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-brand-accent">Contacto</h4>
        <ul className="space-y-4 text-slate-400 text-sm mb-8">
          <li className="flex items-start gap-3">
            <Phone className="w-4 h-4 shrink-0 text-brand-accent" />
            <span>809-688-1130 / 809-913-4870</span>
          </li>
          <li className="flex items-start gap-3">
            <Mail className="w-4 h-4 shrink-0 text-brand-accent" />
            <span>drazoilafernandez@gmail.com</span>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="w-4 h-4 shrink-0 text-brand-accent" />
            <span>Av. Independencia 457, Santo Domingo.</span>
          </li>
        </ul>
        <div className="flex gap-4">
          <a href="https://wa.me/18096881130" target="_blank" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-accent transition-all">
            <MessageCircle className="w-5 h-5" />
          </a>
          <a href="mailto:drazoilafernandez@gmail.com" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-accent transition-all">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
      <p>© 2026 CodontouRD. Todos los derechos reservados.</p>
    </div>
  </footer>
);

const WhatsAppFloat = () => (
  <a 
    href="https://wa.me/18096881130" 
    target="_blank" 
    className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
  >
    <MessageCircle className="w-8 h-8" />
    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-lg shadow-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      ¿Tienes dudas? ¡Escríbenos!
    </span>
  </a>
);

export default function App() {
  const [showPolicies, setShowPolicies] = useState(false);

  useEffect(() => {
    const handleOpenPolicies = () => setShowPolicies(true);
    window.addEventListener('open-policies', handleOpenPolicies);
    return () => window.removeEventListener('open-policies', handleOpenPolicies);
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Problem />
      <Presentation />
      <Urgency />
      <EventDetails />
      <PreviousEvent />
      <Organizer />
      <RegistrationForm onShowPolicies={() => setShowPolicies(true)} />
      <Footer />
      <WhatsAppFloat />
      <PoliciesModal isOpen={showPolicies} onClose={() => setShowPolicies(false)} />
    </div>
  );
}
