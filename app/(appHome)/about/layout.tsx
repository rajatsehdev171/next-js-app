import React from "react";

function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src="/next.svg"
              alt="Modern building architecture"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Lorem Ipsum Company 
            </div>
            <a
              href="#"
              className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >
             Lorem Ipsum
            </a>
            <p className="mt-2 text-slate-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum est
              nostrum, saepe reprehenderit numquam quaerat magnam excepturi enim
              eum architecto error minus quis fuga rem. Nisi debitis minus earum
              fugiat!.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutLayout;
