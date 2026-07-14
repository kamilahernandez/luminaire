import { AnnouncementBar } from "@/components/navigation/AnnouncementBar";
import { NavBar } from "@/components/navigation/NavBar";
import { Footer } from "@/components/navigation/Footer";
import { NewsletterPopupProvider } from "@/components/marketing/NewsletterPopupProvider";
import { NewsletterTab } from "@/components/marketing/NewsletterTab";
import { NewsletterModal } from "@/components/marketing/NewsletterModal";
import { CookieBanner } from "@/components/marketing/CookieBanner";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <NewsletterPopupProvider>
      <div className="sticky top-0 z-50">
        <AnnouncementBar />
        <NavBar />
      </div>
      {children}
      <Footer />
      <NewsletterTab />
      <NewsletterModal />
      <CookieBanner />
    </NewsletterPopupProvider>
  );
}
