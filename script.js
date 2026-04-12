const { useState, useEffect, useRef } = React;


    function useScrollReveal() {
      useEffect(() => {
        const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
              }
            });
          },
          { threshold: 0.12 }
        );
        elements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
      }, []);
    }

  
    function useProgressBars() {
      useEffect(() => {
        const bars = document.querySelectorAll('.progress-fill');
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const fill = entry.target;
                const target = fill.getAttribute('data-width');
                setTimeout(() => { fill.style.width = target + '%'; }, 300);
              }
            });
          },
          { threshold: 0.3 }
        );
        bars.forEach(bar => observer.observe(bar));
        return () => observer.disconnect();
      }, []);
    }

    function Navbar() {
      const [scrolled, setScrolled] = useState(false);
      const [active,   setActive]   = useState('#accueil');
      const [menuOpen, setMenuOpen] = useState(false);

      useEffect(() => {
        const onScroll = () => {
          setScrolled(window.scrollY > 40);
          const sections = ['accueil','projets','competences','contact'];
          let current = '#accueil';
          sections.forEach(id => {
            const el = document.getElementById(id);
            if (el && window.scrollY >= el.offsetTop - 120) current = '#' + id;
          });
          setActive(current);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
      }, []);

      const scrollTo = (href) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      };

      return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? 'navbar-scrolled' : 'bg-transparent'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
             
              <button onClick={() => scrollTo('#accueil')} className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-sm font-mono">&lt;/&gt;</span>
                </div>
                <span className="font-bold text-white text-lg tracking-tight">
                  <span className="text-blue-400">Portfolio</span>
                </span>
              </button>

              
              <ul className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map(link => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        active === link.href
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => scrollTo('#contact')}
                    className="ml-3 btn-primary px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  >
                    Me contacter
                  </button>
                </li>
              </ul>

            
              <button
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                <span className={`block w-6 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>

           
            <div className={`mobile-menu md:hidden ${menuOpen ? 'open' : ''}`}>
              <div className="py-3 px-2 space-y-1">
                {NAV_LINKS.map(link => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      );
    }

    
    function Hero() {
      const [typed, setTyped] = useState('');
      const titles = ['Développeur Web', 'React Developer', 'Full-Stack Dev', 'UI/UX Enthusiast'];
      const titleRef = useRef({ idx: 0, charIdx: 0, deleting: false });

      useEffect(() => {
        let timeout;
        const type = () => {
          const { idx, charIdx, deleting } = titleRef.current;
          const currentTitle = titles[idx];

          if (!deleting) {
            if (charIdx < currentTitle.length) {
              setTyped(currentTitle.slice(0, charIdx + 1));
              titleRef.current.charIdx++;
              timeout = setTimeout(type, 80);
            } else {
              titleRef.current.deleting = true;
              timeout = setTimeout(type, 1800);
            }
          } else {
            if (charIdx > 0) {
              setTyped(currentTitle.slice(0, charIdx - 1));
              titleRef.current.charIdx--;
              timeout = setTimeout(type, 45);
            } else {
              titleRef.current.deleting = false;
              titleRef.current.idx = (idx + 1) % titles.length;
              timeout = setTimeout(type, 300);
            }
          }
        };
        timeout = setTimeout(type, 600);
        return () => clearTimeout(timeout);
      }, []);

      const scrollToProjects = () => {
        document.getElementById('projets').scrollIntoView({ behavior: 'smooth' });
      };

      return (
        <section id="accueil" className="relative min-h-screen flex items-center justify-center hero-bg dot-grid overflow-hidden">
          
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{animationDelay:'1.5s'}} />
          <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-cyan-600/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{animationDelay:'3s'}} />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex justify-center mb-8 animate-fade-in" style={{animationDelay:'0.3s'}}>
              <div className="avatar-ring">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-5xl border-4 border-slate-900">
                  👨‍💻
                </div>
              </div>
            </div>

           
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-4 animate-fade-in-up" style={{animationDelay:'0.4s'}}>
               <span className="gradient-text">Joseph Eblin</span>
            </h1>

            
            <div className="text-2xl sm:text-3xl font-semibold text-blue-300 mb-6 h-10 animate-fade-in" style={{animationDelay:'0.6s'}}>
              <span className="cursor-blink">{typed}</span>
            </div>

            
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{animationDelay:'0.7s'}}>
              Je conçois des applications web modernes, performantes et accessibles.
              Passionné par l'expérience utilisateur et les nouvelles technologies,
              je transforme vos idées en produits digitaux impactants.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{animationDelay:'0.9s'}}>
              <button onClick={scrollToProjects} className="btn-primary px-8 py-4 rounded-xl font-semibold text-white text-base flex items-center gap-2 shadow-xl">
                <i className="fa-solid fa-rocket" />
                Voir mes projets
              </button>
              <a href="mailto:eblinbj@gmail.com" className="btn-outline px-8 py-4 rounded-xl font-semibold text-blue-300 text-base flex items-center gap-2">
                <i className="fa-solid fa-envelope" />
                Me contacter
              </a>
            </div>

            
            <div className="mt-20 grid grid-cols-3 gap-6 max-w-md mx-auto animate-fade-in" style={{animationDelay:'1.1s'}}>
              {[
                { value: '3+', label: 'Projets réalisés' },
                { value: '3+', label: "Années d'expérience" },
                { value: '100%', label: 'Code propre' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-extrabold gradient-text">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

         
        </section>
      );
    }

   
    function ProjectCard({ project, index }) {
      return (
        <div
          className={`reveal card-hover rounded-2xl overflow-hidden glass border border-white/5 flex flex-col delay-${(index % 3 + 1) * 100}`}
        >
          {/* Image */}
          <div className="relative overflow-hidden h-48">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-30`} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
            
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
              {project.tags.slice(0,2).map(tag => (
                <span key={tag} className="tag-chip text-xs px-2 py-0.5 rounded-full font-medium">{tag}</span>
              ))}
              {project.tags.length > 2 && (
                <span className="tag-chip text-xs px-2 py-0.5 rounded-full font-medium">+{project.tags.length - 2}</span>
              )}
            </div>
          </div>

          
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-4">{project.description}</p>

            
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tags.map(tag => (
                <span key={tag} className="tag-chip text-xs px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>

           
            <div className="flex gap-3 mt-auto">
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-primary px-4 py-2.5 rounded-lg text-sm font-semibold text-white text-center flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-eye text-xs" />
                Voir le projet
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-outline px-4 py-2.5 rounded-lg text-sm font-semibold text-blue-300 text-center flex items-center justify-center gap-2"
              >
                <i className="fa-brands fa-github text-sm" />
                Voir le code
              </a>
            </div>
          </div>
        </div>
      );
    }

   
    function Projects() {
      const [filter, setFilter] = useState('Tous');
      const allTags = ['Tous', ...new Set(PROJECTS.flatMap(p => p.tags))];

      const filtered = filter === 'Tous'
        ? PROJECTS
        : PROJECTS.filter(p => p.tags.includes(filter));

      return (
        <section id="projets" className="py-24 px-4 sm:px-6 relative">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              
              <h2 className="reveal section-title text-4xl sm:text-5xl font-extrabold text-white mb-6">
                Mes Projets
              </h2>
              <p className="reveal text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
                Découvrez une sélection de mes projets récents, alliant design soigné et code de qualité.
              </p>
            </div>

            
            <div className="reveal flex flex-wrap justify-center gap-2 mb-12">
              {allTags.slice(0, 8).map(tag => (
                <button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    filter === tag
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'glass border border-white/5 text-slate-400 hover:text-white hover:border-blue-500/30'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-slate-500">
                <i className="fa-solid fa-folder-open text-5xl mb-4 block opacity-30" />
                Aucun projet pour ce filtre.
              </div>
            )}
          </div>
        </section>
      );
    }

    //compétences
    function Skills() {
      useProgressBars();

      return (
        <section id="competences" className="py-24 px-4 sm:px-6 relative" style={{background:'linear-gradient(180deg, #0f172a 0%, #0d1b2e 100%)'}}>
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
          <div className="max-w-5xl mx-auto relative">
          
            <div className="text-center mb-16">

              <h2 className="reveal section-title text-4xl sm:text-5xl font-extrabold text-white mb-6">
                Compétences
              </h2>
              <p className="reveal text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
                Technologies que je maîtrise et que j'utilise quotidiennement dans mes projets.
              </p>
            </div>

            {/* Badge grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
              {SKILLS.map((skill, i) => (
                <div
                  key={skill.name}
                  className={`reveal skill-badge glass border border-white/5 rounded-2xl p-5 text-center delay-${(i % 4 + 1) * 100}`}
                >
                  <i
                    className={`${skill.icon} text-4xl mb-3 block`}
                    style={{ color: skill.color }}
                  />
                  <p className="text-sm font-semibold text-white">{skill.name}</p>
                </div>
              ))}
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SKILLS.map((skill, i) => (
                <div key={skill.name} className={`reveal delay-${(i % 4 + 1) * 100}`}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-300 flex items-center gap-2">
                      <i className={`${skill.icon} text-sm`} style={{color: skill.color}} />
                      {skill.name}
                    </span>
                    <span className="text-slate-500 font-mono">{skill.level}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      data-width={skill.level}
                    />
                  </div>
                </div>
              ))}
            </div>

      
          </div>
        </section>
      );
    }

    //contact
    function Contact() {
      const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
      const [sending, setSending] = useState(false);
      const [sent, setSent]       = useState(false);
      const [error, setError]     = useState('');

      const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
          setError('Veuillez remplir tous les champs obligatoires.');
          return;
        }
        setSending(true);
        setError('');
        // Simulate sending
        setTimeout(() => {
          setSending(false);
          setSent(true);
          setForm({ name: '', email: '', subject: '', message: '' });
          setTimeout(() => setSent(false), 5000);
        }, 1500);
      };

      const contactInfo = [
        {
          icon: 'fa-solid fa-envelope',
          label: 'Email',
          value: 'eblinbj@gmail.com',
          href: 'mailto:eblinbj@gmail.com',
          color: '#3b82f6',
        },
        {
          icon: 'fa-brands fa-github',
          label: 'GitHub',
          value: 'github.com/JB293',
          href: 'https://github.com/JB293',
          color: '#e2e8f0',
        },
        {
          icon: 'fa-brands fa-linkedin',
          label: 'LinkedIn',
          value: 'linkedin.com/in/bile-joseph-eblin-b8147537b/',
          href: 'https://www.linkedin.com/in/bile-joseph-eblin-b8147537b/',
          color: '#0a66c2',
        },
      ];

      return (
        <section id="contact" className="py-24 px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto">
        
            <div className="text-center mb-16">
              <h2 className="reveal section-title text-4xl sm:text-5xl font-extrabold text-white mb-6">
                Contact
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            
              <div className="lg:col-span-2 space-y-5">
                {contactInfo.map((info, i) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.label !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`reveal delay-${(i + 1) * 100} flex items-center gap-4 glass border border-white/5 rounded-xl p-4 card-hover group`}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: info.color + '22', color: info.color }}
                    >
                      <i className={info.icon} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">{info.label}</p>
                      <p className="text-sm text-slate-200 font-medium group-hover:text-blue-300 transition-colors">{info.value}</p>
                    </div>
                    <i className="fa-solid fa-arrow-right ml-auto text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all text-xs" />
                  </a>
                ))}

                
                
              </div>

           
              <div className="lg:col-span-3 reveal-right">
                <form onSubmit={handleSubmit} className="glass border border-white/5 rounded-2xl p-7 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Nom <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        className="form-input w-full px-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        className="form-input w-full px-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Sujet</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Objet de votre message"
                      className="form-input w-full px-4 py-3 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Je suis..."
                      className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm flex items-center gap-2">
                      <i className="fa-solid fa-circle-exclamation" /> {error}
                    </p>
                  )}

                  {sent && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-3">
                      <i className="fa-solid fa-circle-check text-green-400 text-lg" />
                      <p className="text-green-300 text-sm font-medium">
                        Message envoyé avec succès ! Je vous répondrai rapidement.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <i className="fa-solid fa-circle-notch fa-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      );
    }

    //footer
    function Footer() {
      const year = new Date().getFullYear();
      return (
        <footer className="border-t border-white/5 py-10 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="section-divider mb-8" />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs font-mono">&lt;/&gt;</span>
                </div>
                <span className="text-slate-400 text-sm">
                  © {year} <span className="text-white font-medium">Joseph Eblin</span> – Tous droits réservés
                </span>
              </div>
              <div className="flex items-center gap-4">
                <a href="https://github.com/JB293" target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 glass border border-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/30 transition-all">
                  <i className="fa-brands fa-github text-sm" />
                </a>
                <a href="https://www.linkedin.com/in/bile-joseph-eblin-b8147537b/" target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 glass border border-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all">
                  <i className="fa-brands fa-linkedin text-sm" />
                </a>
                <a href="mailto:eblinbj@gmail.com"
                   className="w-9 h-9 glass border border-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all">
                  <i className="fa-solid fa-envelope text-sm" />
                </a>
              </div>
            </div>
            <p className="text-center text-slate-600 text-xs mt-6 font-mono">
              Conçu  en React & Tailwind CSS
            </p>
          </div>
        </footer>
      );
    }

    
    function ScrollToTop() {
      const [visible, setVisible] = useState(false);

      useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
      }, []);

      return (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-8 right-8 z-50 w-12 h-12 btn-primary rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          aria-label="Retour en haut"
        >
          <i className="fa-solid fa-chevron-up" />
        </button>
      );
    }

  
    function App() {
      useScrollReveal();

      return (
        <>
          <Navbar />
          <main>
            <Hero />
            <div className="section-divider" />
            <Projects />
            <div className="section-divider" />
            <Skills />
            <div className="section-divider" />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
        </>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
