import { 
  Baby, 
  Stethoscope, 
  Scan, 
  Activity, 
  HeartPulse, 
  Microscope, 
  Users, 
  HeartHandshake, 
  ShieldCheck, 
  CalendarClock,
  Ribbon,
  Search
} from 'lucide-react';
import { ServiceItem, TestimonialItem, ContactInfo } from './types';

export const DOCTOR_NAME = "Dr Ilham YASSINE";
export const SPECIALTY = "Spécialiste en Gynécologie Obstétrique";

export const CONTACT_INFO: ContactInfo = {
  address: "Centre Alilham, El Kelâa des Sraghna, 43000, Maroc",
  phoneFixed: "+212524412467",
  phoneEmergency: "+212649130593",
  email: "contact@centrealilham.ma",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.6174!2d-7.4008!3d32.0504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdaf79a2f2f4c22f%3A0x5b6c1a4d2e3f7890!2sCentre%20Alilham!5e0!3m2!1sfr!2sma!4v1700000000000!5m2!1sfr!2sma"
};

export const SERVICES: ServiceItem[] = [
  {
    title: "Suivi de grossesse",
    description: "Accompagnement complet et bienveillant du début de la grossesse jusqu'à l'accouchement.",
    icon: Baby
  },
  {
    title: "Echographie 3D-4D",
    description: "Imagerie de haute technologie pour visualiser votre bébé en détail et dépister les anomalies.",
    icon: Scan
  },
  {
    title: "Stérilité du couple",
    description: "Diagnostic et prise en charge personnalisée pour vous aider à réaliser votre projet parental.",
    icon: Users
  },
  {
    title: "Accouchement",
    description: "Préparation et suivi pour un accouchement en toute sécurité et sérénité.",
    icon: HeartHandshake
  },
  {
    title: "Gynécologie médicale",
    description: "Suivi régulier, contraception, ménopause et prévention des pathologies féminines.",
    icon: Stethoscope
  },
  {
    title: "Chirurgie cœlioscopique",
    description: "Chirurgie mini-invasive pour une récupération rapide et moins de douleurs.",
    icon: Activity
  },
  {
    title: "Hystéroscopie",
    description: "Exploration et traitement des pathologies de l'utérus sans incision.",
    icon: Search
  },
  {
    title: "Chirurgie gynécologique",
    description: "Interventions chirurgicales expertes pour traiter diverses affections.",
    icon: ShieldCheck
  },
  {
    title: "Colposcopie",
    description: "Examen approfondi du col de l'utérus pour le dépistage et la prévention.",
    icon: Microscope
  },
  {
    title: "Troubles sexuels",
    description: "Écoute et solutions médicales pour améliorer votre qualité de vie intime.",
    icon: HeartPulse
  },
  {
    title: "Chirurgie du sein",
    description: "Prise en charge chirurgicale des pathologies mammaires bénignes et malignes.",
    icon: Ribbon
  },
  {
    title: "Chirurgie du cancer",
    description: "Traitement chirurgical oncologique avec une approche humaine et rigoureuse.",
    icon: Activity
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Fatima Z.",
    text: "Dr Yassine est une perle. Elle a suivi ma grossesse difficile avec une patience et une compétence incroyables. Je me suis sentie en sécurité tout le long.",
    rating: 5
  },
  {
    name: "Amina B.",
    text: "Cabinet très propre et moderne. L'échographie 3D était un moment magique. Merci au Dr Ilham pour ses explications claires.",
    rating: 5
  },
  {
    name: "M. et Mme T.",
    text: "Après des années d'attente, grâce au traitement de fertilité du Dr Yassine, nous sommes enfin parents. Une expertise rare à El Kelâa.",
    rating: 5
  }
];

export const DIPLOMAS = [
  "Échographie gynécologique obstétrique – Brest, France",
  "Chirurgie cœlioscopique – Clermont-Ferrand, France",
  "Stérilité du couple – Rennes, France",
  "Chirurgie vaginale – Montpellier, France"
];