import Search from "../_features/search/search";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default function SearchPage({ searchParams }: PageProps) {
  return <Search searchParams={searchParams} />;
}
