"use client";
import { useEffect } from "react";
import { addDocument } from "@/firebase";
import { v4 as uuidv4 } from "uuid";

export default function TrackUniqueVisit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const today = new Date().toDateString();
    const storageKey = `visit_${today}`;
    const hasVisitedToday = localStorage.getItem(storageKey);

    if (!hasVisitedToday) {
      // Mark as visited today
      localStorage.setItem(storageKey, "true");
      
      // Track the visit in Firebase
      addDocument("page-views", uuidv4(), {
        date: Date.now(),
        page: "shop",
        unique: true,
      });
    }
  }, []);

  return null;
}


