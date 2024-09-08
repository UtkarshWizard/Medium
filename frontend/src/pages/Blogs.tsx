import { AppBar } from "../components/Appbar";
import { BlogsCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const {loading , blogs} = useBlogs();

  // skeleton loading
  if (loading) {
    return (<div>
      <AppBar />
      <div className="flex items-center justify-center h-screen">
        <div className="mt-96px w-full">
          {/* Repeat this block for multiple loaders */}
          {[...Array(4)].map((_, index) => (
            <div role="status" className="animate-pulse mb-10" key={index}>
              <div className="flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-200 dark:text-gray-700 me-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
                <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
              <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
              
            </div>
          ))}
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      </div>
    );
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className=" max-w-xl">
          {blogs.map( blog => <BlogsCard
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={
              blog.content
            }
            publishedDate={formatDate(blog.publishedDate)}
          />)}
          
          
        </div>
      </div>
    </div>
  );
};
