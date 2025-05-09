import TabBar from "@/components/tab-bar";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {children}
      <TabBar />
    </section>
  );
}
