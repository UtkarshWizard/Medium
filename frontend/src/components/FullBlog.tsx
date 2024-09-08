import { Blog } from "../hooks";
import { AppBar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
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
        <div className="grid grid-cols-12 px-16 w-full pt-16 max-w-screen-2xl">
          <div className="sm:col-span-8 col-span-12">
            <div className=" sm:font-extrabold font-bold sm:text-4xl text-3xl pb-4">{blog.title}</div>
            <div className="sm:text-base text-sm font-light text-slate-700">Posted on - {formatDate(blog.publishedDate) || "4/7/2004"}</div>
            <div className="grid-cols-8 sm:text-lg text-base text-gray-500">{blog.content}</div>
          </div>
          <div className="sm:col-span-4 col-span-12 px-8 pt-8">
            <div className="pb-4 text-gray-700 sm:font-medium font-normal">Author</div>
            <div className="flex items-center mb-8">
              <Avatar size={10} name={blog.author.name || "A"} />
              <div className="sm:pl-4 pl-2 sm:text-xl text-sm font-medium ">{blog.author.name || "Anonymous"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
