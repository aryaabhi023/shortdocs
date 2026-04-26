import { Suspense } from "react";
import Read from "./read";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Read />
    </Suspense>
  );
}
