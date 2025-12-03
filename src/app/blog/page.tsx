import { getDocuments } from "@/firebase";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";

export default async function BlogPage() {
  const postsData: any = await getDocuments("blog");
  const posts: Post[] = postsData || [];

  return (
    <div className="bg-white flex flex-col justify-center w-full">
      {/* Hero Section */}
      <div className="mt-[76px] flex flex-col items-center justify-end overflow-hidden">
        <div className="relative h-[60vh] mt-12 flex flex-col justify-center items-center text-center w-full">
          <div className="absolute w-[95%] left-1/2 -translate-x-1/2 lg:left-0 lg:-translate-x-0 lg:w-full top-0 rounded-b-full bg-gradient-to-b from-transparent to-black/10 h-[65%] lg:h-[70%]"></div>
          <h1 className="flex flex-col justify-center items-center font-cardo text-4xl sm:text-6xl lg:text-7xl font-bold text-zinc-900 w-max max-w-full leading-tight">
            Blog
            <span className="block text-center my-6 text-lg sm:text-xl text-gray-700">
              Odkryj inspirujące artykuły o sztuce, tatuażach i designie
            </span>
          </h1>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="mx-5 lg:mx-[8vw] xl:mx-[12vw]">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-gray-500 text-xl font-cardo">Brak postów</div>
            <p className="text-gray-400 mt-2">Sprawdź ponownie wkrótce</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {posts.map((post) => (
              <article
                key={post.postId}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={post.mainImage || "/images/bg.png"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                        {post.blogType || "art"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 bg-white">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <time
                        dateTime={new Date(post.creationTime).toISOString()}
                      >
                        {new Date(post.creationTime).toLocaleDateString(
                          "pl-PL"
                        )}
                      </time>
                    </div>

                    <h2 className="text-xl font-bold text-zinc-900 mb-3 line-clamp-2 font-cardo">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {post.intro}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-gray-500 text-xs">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <Link
                      href={`/blog/${post.url || post.postId}`}
                      className="inline-flex items-center text-black hover:text-gray-700 font-medium text-sm transition-colors group/link"
                    >
                      Czytaj więcej
                      <svg
                        className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="mx-5 lg:mx-[8vw] xl:mx-[12vw] mt-24 mb-12">
        <div className="text-center">
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
