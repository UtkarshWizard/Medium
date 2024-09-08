import { Link } from "react-router-dom"

interface blogCardProps {
    id: string,
    authorName : string,
    title : string,
    content: string,
    publishedDate : string
}

export const BlogsCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: blogCardProps) => {
    return <Link to={`/blog/${id}`}> <div className="border-b-2 border-gray-200 sm:p-4 p-8 cursor-pointer">
        <div className="flex flex-row items-center">
            <Avatar size={8} name={`${authorName}`} />
            <div className="pl-4 flex justify-center items-center">
                <div className="font-light text-gray-950 pr-2 text-lg">{authorName}</div>
                <div className="font-thin">|</div>
                <div className="pl-2 font-extralight text-slate-500">{publishedDate}</div>
            </div>
        </div>
            <div className="font-bold text-2xl py-2">
                {title} 
            </div>
            <div className="text-md text-slate-600 pb-8">
                {content.length > 100 ? content.slice(0,100) + "..." : content}
            </div>
            <div>
                {`${Math.ceil(content.length / 100)}` + " Minutes"}
            </div>
        
    </div>
    </Link>
}


export function Avatar ({name , size } : {name : string , size: number})  {
    return <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600` } style={{ width: `${size / 4}rem`, height: `${size / 4}rem` }}>
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0] || "A"}</span>
        </div>
}