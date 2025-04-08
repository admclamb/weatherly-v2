import { api, HydrateClient } from "~/trpc/server";
import Landing from "./_features/landing/landing";

export default async function HomePage() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <Landing />
    </HydrateClient>
  );
}
