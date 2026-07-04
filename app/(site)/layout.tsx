import { AnnouncementBar } from "@/components/navigation/AnnouncementBar";
import { NavBar } from "@/components/navigation/NavBar";
import { Footer } from "@/components/navigation/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <AnnouncementBar />
        <NavBar />
      </div>
      {children}
      <Footer />
    </>
  );
}
