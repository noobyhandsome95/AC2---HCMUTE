import { CardBlog } from "../../forms/CardBlog"
import type { BlogType } from "../../Types"

interface BlogsListComponentProps {
    blogs: BlogType[];
    loading?: boolean;
}

export const BlogsListComponent = ({ blogs, loading }: BlogsListComponentProps) => {

  if (loading) {
    return <div className="text-white text-center mt-10">Loading blogs...</div>;
  }

  return (
    <div className="w-full mt-4 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <CardBlog
            key={blog._id}
            bgColor="bg-primary-dark/40"
            currentWidth="w-full"
            title={blog.title}
            author={blog.author?.displayName || "Unknown Author"}
            tags={blog.tags}
            duration={blog.readTime || "5 minutes"}
            views={blog.views || 0}
            logoURL={blog.coverImage || "/card-default.jpg"}
          />
        ))
      ) : (
        <div className="text-white/60 col-span-3 text-center">
          No blogs found. Be the first to write one!
        </div>
      )}
    </div>
  )
}
