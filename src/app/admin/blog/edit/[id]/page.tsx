import { getDocument } from "@/firebase";
import EditPostForm from "./EditPostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post: any = await getDocument("blog", id);

  if (!post) {
    return (
      <div className="p-12">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">
            Post nie został znaleziony
          </h1>
          <a href="/admin/blog" className="text-blue-400 hover:text-blue-300">
            Powrót do listy postów
          </a>
        </div>
      </div>
    );
  }

  return <EditPostForm post={post} />;
}
