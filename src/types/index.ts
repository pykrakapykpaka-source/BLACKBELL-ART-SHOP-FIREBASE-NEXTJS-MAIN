export type Product = {
  id: number;
  name: string;
  price: number;
};
export type CustomerInfo = {
  firstName: string;
  lastName: string;
  city: string;
  postalCode: string;
  street: string;
  houseNumber?: string;
  phoneNumber: string;
};

type Alignment =
  | "vertical"
  | "horizontal"
  | "square"
  | "horizontal-thin"
  | "vertical-thin";
export type ArtworkData = {
  tags: string[];
  images: any[];
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions: string;
  price: number;
  isPrint: boolean;
  sections: any[];
  slug?: string;
  description: string;
  alignment: Alignment;
  keywords: string;
  mainImage: string;
  id: string;
  category: string;
};
export type Service = {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  price: string;
  description: {
    h1: string;
    about: string;
    reasons: string[];
    summary: string;
  };
};
export type Tattoo = {
  projectSrc: string;
  workSrc: string;
  title: string;
  description: string;
  meaning: string;
  partsOfTheBody: string[];
  id?: string;
};

export type Post = {
  postId: string;
  title: string;
  sections: Section[];
  intro: string;
  outro: string;
  tags: string[];
  url: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  mainImage: string;
  faq: {
    question: string;
    answer: string;
  }[];
  blogType: string;
  creationTime: number;
};

export type Section = {
  title: string;
  content: any;
  id?: number;
};

export type WebsiteOffer = {
  city: string;
  cityPropperName: string;
  websiteId: string;
  name: string;
  linkName: string;
  price: string;
  seo: {
    title: string;
    description: string;
  };
  description: {
    h1: string;
    about: string;
    features: {
      title: string;
      description: string;
    }[];
  };
  aboutSection: {
    h2: string;
    p: string;
  }[];
  image: {
    src: string;
    alt: string;
  };
};

export type ImageType = {
  src: string;
  alt: string;
};

/**
 * Struktura Post pozwala na przechowywanie informacji o pojedynczym poście na stronie internetowej.
 * Zawiera identyfikator posta, tytuł, sekcje zawierające nagłówek i treść, wstęp, zakończenie,
 * tagi, adres URL prowadzący do posta oraz metadane SEO takie jak meta-tytuł, meta-opis oraz meta-słowa kluczowe.
 *
 * @property {string} postId - Unikalny identyfikator posta.
 * @property {string} title - Tytuł posta.
 * @property {Section[]} sections - Tablica sekcji zawierających nagłówek i treść.
 * @property {string} intro - Wstęp do posta.
 * @property {string} outro - Zakończenie posta.
 * @property {string[]} tags - Tagi przypisane do posta.
 * @property {string} url - Adres URL prowadzący do tego konkretnego posta.
 * @property {string} metaTitle - Meta-tytuł dla celów SEO (opcjonalny).
 * @property {string} metaDescription - Meta-opis dla celów SEO (opcjonalny).
 * @property {string[]} metaKeywords - Lista meta-słów kluczowych dla celów SEO (opcjonalna).
 */

/**
 * Struktura Post pozwala na przechowywanie informacji o pojedynczym poście na stronie internetowej.
 * Zawiera identyfikator posta, tytuł, sekcje zawierające nagłówek i treść, wstęp, zakończenie,
 * tagi, adres URL prowadzący do posta oraz metadane SEO takie jak meta-tytuł, meta-opis oraz meta-słowa kluczowe.
 *
 * @property {string} postId - Unikalny identyfikator posta.
 * @property {string} title - Tytuł posta.
 * @property {Section[]} sections - Tablica sekcji zawierających nagłówek i treść.
 * @property {string} intro - Wstęp do posta.
 * @property {string} outro - Zakończenie posta.
 * @property {string[]} tags - Tagi przypisane do posta.
 * @property {string} url - Adres URL prowadzący do tego konkretnego posta.
 * @property {string} metaTitle - Meta-tytuł dla celów SEO (opcjonalny).
 * @property {string} metaDescription - Meta-opis dla celów SEO (opcjonalny).
 * @property {string[]} metaKeywords - Lista meta-słów kluczowych dla celów SEO (opcjonalna).
 */
