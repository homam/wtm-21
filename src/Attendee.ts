export type Attendee = {
  name: string;
  company: string;
  job_title: string;
  country: string;
  business_category: string[];
  services: string[];
  markets: string[];
  address: string;
  phone: string;
  online: Online[];
  bio: string;
  photo_url: string;
};

export type Online = {
  site: Site;
  address: string;
};

export enum Site {
  Facebook = "facebook",
  Globe = "globe",
  Linkedin = "linkedin",
  Twitter = "twitter"
}
