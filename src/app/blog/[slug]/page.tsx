import { getDocuments, getDocument } from "@/firebase";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postsData: any = await getDocuments("blog");
  const posts: Post[] = postsData || [];
  const post = posts.find((p: Post) => p.url === slug || p.postId === slug);

  if (!post) {
    return {
      title: "Post nie znaleziony",
      description: "Nie można znaleźć żądanego postu",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.intro,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.intro,
      images: [post.mainImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const postsData: any = await getDocuments("blog");
  const posts: Post[] = postsData || [];
  const post = posts.find((p: Post) => p.url === slug || p.postId === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white flex flex-col justify-center w-full">
      {/* Hero Section */}
      <div className="mt-[76px] flex flex-col items-center justify-end overflow-hidden">
        <div className="relative h-[50vh] mt-12 flex flex-col justify-center items-center text-center w-full">
          <div className="absolute w-[95%] left-1/2 -translate-x-1/2 lg:left-0 lg:-translate-x-0 lg:w-full top-0 rounded-b-full bg-gradient-to-b from-transparent to-black/10 h-[65%] lg:h-[70%]"></div>
          <h1 className="flex flex-col justify-center items-center font-cardo text-3xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 w-max max-w-full leading-tight">
            {post.title}
            <span className="block text-center my-6 text-lg sm:text-xl text-gray-700">
              {post.blogType || "art"} •{" "}
              {new Date(post.creationTime).toLocaleDateString("pl-PL")}
            </span>
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-5 lg:mx-[8vw] xl:mx-[12vw]">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-black transition-colors font-medium"
          >
            <svg
              className="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Powrót do bloga
          </Link>
        </div>

        {/* Featured Image */}
        {post.mainImage && (
          <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
            <Image
              src={post.mainImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="max-w-4xl mx-auto">
          {/* Intro */}
          <div className="mb-12">
            <p className="text-xl text-gray-600 leading-relaxed font-cardo">
              {post.intro}
            </p>
          </div>

          {/* Sections */}
          {post.sections && post.sections.length > 0 && (
            <div className="mb-12 space-y-12">
              {post.sections.map((section, index) => (
                <section key={index} className="border-t pt-8">
                  <h2 className="text-2xl font-bold text-zinc-900 mb-6 font-cardo">
                    {section.title}
                  </h2>
                  <div
                    className="text-gray-700 leading-relaxed prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </section>
              ))}
            </div>
          )}

          {/* FAQ */}
          {post.faq && post.faq.length > 0 && (
            <div className="mb-12 border-t pt-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-8 font-cardo">
                Często zadawane pytania
              </h2>
              <div className="space-y-6">
                {post.faq.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                  >
                    <h3 className="text-lg font-semibold text-zinc-900 mb-3 font-cardo">
                      {item.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Outro */}
          {post.outro && (
            <div className="mb-12 border-t pt-8">
              <p className="text-xl text-gray-600 leading-relaxed font-cardo">
                {post.outro}
              </p>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="border-t pt-8 mb-12">
              <h3 className="text-lg font-semibold text-zinc-900 mb-4 font-cardo">
                Tagi
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Related Posts */}
        <div className="border-t pt-12 mt-12">
          <h2 className="text-2xl font-bold text-zinc-900 mb-8 font-cardo">
            Podobne artykuły
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts
              .filter((p: Post) => p.postId !== post.postId)
              .slice(0, 3)
              .map((relatedPost: Post) => (
                <Link
                  key={relatedPost.postId}
                  href={`/blog/${relatedPost.url || relatedPost.postId}`}
                  className="group block transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={relatedPost.mainImage || "/images/bg.png"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                          {relatedPost.blogType || "art"}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-semibold text-zinc-900 mb-2 line-clamp-2 font-cardo">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedPost.intro}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 font-cardo mb-4">
            Zainteresowany moimi usługami?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Sprawdź moje produkty i znajdź coś wyjątkowego dla siebie
          </p>
          <Link
            href="/"
            className="inline-flex items-center bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Przejdź do sklepu
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
