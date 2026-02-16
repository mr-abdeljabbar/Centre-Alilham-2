import { LucideIcon } from "lucide-react";

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface TestimonialItem {
  name: string;
  text: string;
  rating: number;
}

export interface ContactInfo {
  address: string;
  phoneFixed: string;
  phoneEmergency: string;
  email: string;
  mapEmbedUrl: string;
}

export interface NavLink {
  label: string;
  href: string;
}