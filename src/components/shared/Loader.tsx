const Loader = () => (
  <div className="flex items-center justify-center h-32">
    <div className="flex space-x-2">
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-200"></div>
      <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce delay-400"></div>
    </div>
  </div>
);

export default Loader;
