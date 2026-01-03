import { getDocumentsWithIds } from "@/firebase";
import EditPostPage from "./EditPostPage";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Always fetch fresh data for admin pages

export default async function Page() {
  let posts: any = [];
  try {
    posts = await getDocumentsWithIds("blog");
    if (!Array.isArray(posts)) {
      console.error("[Admin Blog Edit] Posts is not an array:", posts);
      posts = [];
    }
  } catch (error) {
    console.error("[Admin Blog Edit] Error fetching posts:", error);
    posts = [];
  }
  return <EditPostPage posts={posts} />;
}
