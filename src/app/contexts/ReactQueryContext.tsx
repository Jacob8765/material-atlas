"use client";
import { QueryClient, QueryClientProvider } from "react-query";

export default function ReactQueryContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
}
