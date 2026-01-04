export interface SocialLink {
  id: number
  title: string
  url: string
  icon: string
}

export const links: SocialLink[] = [
  {
    id: 1,
    title: "Form Pendaftaran Lomba",
    url: "https://forms.gle/your-form-link",
    icon: "📝",
  },
  {
    id: 2,
    title: "Juklak & Juknis",
    url: "https://drive.google.com/your-juklak-juknis",
    icon: "📘",
  },
  {
    id: 3,
    title: "Aturan Twibbon",
    url: "https://drive.google.com/aturan-twibbon",
    icon: "📌",
  },
  {
    id: 4,
    title: "Twibbonize",
    url: "https://www.twibbonize.com/your-event",
    icon: "🖼️",
  },
  {
    id: 5,
    title: "Proposal Kegiatan",
    url: "https://drive.google.com/proposal",
    icon: "📄",
  },
]
