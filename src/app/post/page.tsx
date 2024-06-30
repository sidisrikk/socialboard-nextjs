// post detail page with comments,title,content,author,createdAt
export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 space-y-4">
        <h1 className="text-2xl font-semibold text-center">Post Detail</h1>
        <div className="w-96 bg-white shadow rounded">
          <h2 className="text-xl font-semibold text-center">Title</h2>
          <p className="text-center">Content</p>
          <p className="text-center">Author</p>
          <p className="text-center">createdAt</p>
        </div>
        <div className="w-96 bg-white shadow rounded">
          <h2 className="text-xl font-semibold text-center">Comments</h2>
          <div className="w-96 bg-white shadow rounded">
            <p className="text-center">Comment</p>
            <p className="text-center">Author</p>
            <p className="text-center">createdAt</p>
          </div>
        </div>
      </div>
    </div>
  );
}
