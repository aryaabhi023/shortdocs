"use client";
import { useEffect } from "react";
import { listenToAuthChanges } from "@/config/firbaseAuth";

export default function ClientInit() {
  useEffect(() => {
    const unsub = listenToAuthChanges();
    return () => unsub && unsub();
  }, []);

  return null;
}
