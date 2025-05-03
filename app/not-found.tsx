import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Edge of Knowledge Reached</h2>
      <p className="text-lg mb-8 max-w-md">
        Even our AI couldn&apos;t find this page. It seems you&apos;ve ventured beyond the edge of our digital realm.
      </p>
      <div className="bg-secondary/30 p-6 rounded-lg mb-8 max-w-md">
        <p className="text-md italic">
          &quot;The only true wisdom is in knowing you know nothing about this page.&quot;
          <br />- Socrates (if he used the internet)
        </p>
      </div>
      <Link 
        href="/" 
        className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Return to Safer Territory
      </Link>
    </div>
  );
}
