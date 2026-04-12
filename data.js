const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Application e-commerce complète avec panier, paiement Stripe, gestion des commandes et tableau de bord admin.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    demo: "https://demo.exemple.com/ecommerce",
    github: "https://github.com/votre-username/ecommerce",
    color: "from-blue-500 to-cyan-500",
  },
  
  {
    id: 2,
    title: "Application Météo",
    description: "Application météo avec géolocalisation, prévisions sur 7 jours, alertes météo et interface animée selon les conditions.",
    image: "https://images.unsplash.com/photo-1504608524841-42584120d693?w=800&q=80",
    tags: ["JavaScript", "API OpenWeather", "CSS3", "HTML5"],
    demo: "https://demo.exemple.com/meteo",
    github: "https://github.com/votre-username/meteo-app",
    color: "from-cyan-500 to-blue-500",
  },
 
  {
    id: 3,
    title: "Portfolio",
    description: "Vous le visitez actuellement.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    tags: ["React", "Tailwind CSS"],
    demo: "https://demo.exemple.com/cms",
    github: "https://github.com/votre-username/portfolio-cms",
    color: "from-green-500 to-teal-500",
  },
 
];

const SKILLS = [
  { name: "HTML / CSS", icon: "fa-brands fa-html5", color: "#e34f26", level: 85 },
  { name: "JavaScript", icon: "fa-brands fa-js",    color: "#f7df1e", level: 90 },
  // { name: "React",      icon: "fa-brands fa-react", color: "#61dafb", level: 85 },
  { name: "PHP",        icon: "fa-brands fa-php",   color: "#777bb4", level: 75 },
  { name: "Laravel",    icon: "fa-brands fa-laravel", color: "#FF0000 ", level: 80 },
  { name: "Git",        icon: "fa-brands fa-git-alt",  color: "#f05032", level: 85 },
  { name: "Tailwind",   icon: "fa-solid fa-wind",       color: "#06b6d4", level: 88 },
  { name: "SQL",        icon: "fa-solid fa-database",   color: "#00758f", level: 80 },
];

const NAV_LINKS = [
  { label: "Accueil",      href: "#accueil"     },
  { label: "Projets",      href: "#projets"     },
  { label: "Compétences",  href: "#competences" },
  { label: "Contact",      href: "#contact"     },
];