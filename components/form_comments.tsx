import React from "react";

interface Fkit {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  textComment: string;
  setTextComment: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export default function Form({ onSubmit, textComment, setTextComment }: Fkit) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200">
        <div className="py-2 px-4 bg-white rounded-t-lg]">
          <label className="sr-only">Your comment</label>
          <textarea
            id="comment"
            rows={4}
            className="px-1 w-full text-sm text-gray-900 bg-white border-0 focus:ring-0"
            placeholder="Write a comment..."
            required
            value={textComment}
            onChange={setTextComment}
          ></textarea>
        </div>
        <div className="flex justify-between items-center py-2 px-3 border-t">
          <button
            type={"submit"}
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200"
          >
            Post comment
          </button>
        </div>
      </div>
    </form>
  );
}
