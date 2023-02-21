export const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-800">
      <div className="w-full max-w-lg rounded-lg bg-white py-10 text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form className="mt-5 flex flex-col px-5">
          <input
            placeholder="Email"
            className="mb-3 rounded-lg border-2 border-green-600 border-opacity-50 bg-gray-100 px-3 py-2 shadow-inner focus:outline-none"
          />
          <input
            placeholder="Password"
            className="rounded-lg border-2 border-green-600 border-opacity-50 bg-gray-100 px-3 py-2 shadow-inner focus:outline-none"
          />
          <button className="mt-3 rounded-lg bg-gray-800 py-3 px-5 text-lg text-white focus:outline-none hover:opacity-90">Log In</button>
        </form>
      </div>
    </div>
  );
};
