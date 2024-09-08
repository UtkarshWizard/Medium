import axios from "axios";
import { AppBar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <AppBar/>
      <div className="flex justify-center flex-col sm:mx-8 mx-4">
        <div className="sm:text-6xl text-2xl font-bold w-full mt-16 flex justify-center">
          Publish Your Blog
        </div>
        <div className="flex justify-center max-w-screen-2xl">
          <div className="sm:mx-16 mx-8 w-full">
            <label className="block mt-8 mb-2 sm:text-2xl text-base font-medium text-gray-900">
              Title
            </label>
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-200 text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="w-full flex justify-center flex-col">
          <TextArea
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <div className="flex justify-center p-4">
            <button
              onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                  title,
                  content,
                } , {
                  headers: {
                    Authorization: localStorage.getItem("token")
                  }
                });
                navigate(`/blog/${response.data.id}`)
              }}
              type="submit"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200"
            >
              Publish post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function TextArea({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <div className="flex justify-center max-w-screen-2xl">
        <div className="sm:mx-8 mx-4 w-full">
            <label className="block mt-8 mb-2 sm:text-2xl text-base font-medium text-gray-900">
              Content
            </label>
            <textarea
              onChange={onChange}
              id="editor"
              rows={8}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-200 text-base focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write an article..."
              required
            ></textarea>
          </div>
        </div>
      </div>
  );
}
