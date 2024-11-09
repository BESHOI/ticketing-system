import TicketList from "@/components/ticket-list";

export default function Home() {
  return (
    <div className="min-h-screen p-4 pb-16 sm:p-16 font-[family-name:var(--font-geist-sans)]">
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Tickets List</h1>
        <TicketList />
      </main>
    </div>
  );
}
