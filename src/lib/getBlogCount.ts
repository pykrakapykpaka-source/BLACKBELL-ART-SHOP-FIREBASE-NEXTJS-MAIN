"use server";

import { getDocuments } from "@/firebase";

export async function getBlogCount(): Promise<number> {
  try {
    const posts: any = await getDocuments("blog");
    return posts?.length || 0;
  } catch (error) {
    console.error("Error fetching blog count:", error);
    return 0;
  }
}

