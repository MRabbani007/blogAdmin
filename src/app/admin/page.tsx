import React from "react";

const items = [
  { label: "Total Blogs", quantity: 10, bgColor: "bg-purple-700" },
  { label: "Total Topics", quantity: 5, bgColor: "bg-rose-700" },
  { label: "Total Tags", quantity: 12, bgColor: "bg-yellow-700" },
  { label: "Draft", quantity: 2, bgColor: "bg-sky-700" },
];

const categories = [
  { title: "HTML, CSS, JS", quantity: 10 },
  { title: "ReactJS, NextJS", quantity: 10 },
  { title: "Tailwind", quantity: 10 },
];

export default async function AdminDashboard() {
  return (
    <main className="p-4 flex-1 flex flex-col gap-4">
      <div className="">
        <p className="nunito-sans text-3xl">
          <span>Blogs </span>
          <span className="text-accent font-semibold">Dashboard</span>
        </p>
        <p className="text-accent/80 font-extralight text-xl">Admin Panel</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {items?.map((item, index) => (
          <div
            className={
              "w-[200px] h-[100px] flex-1 rounded-xl flex flex-col items-center justify-center  " +
              item?.bgColor
            }
            key={index}
          >
            <span className="flex-1 mt-4">{item.label}</span>
            <span className={`py-2 px-4 bg-primary-foreground/20 rounded-t-lg`}>
              {item?.quantity}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <div className="bg-primary-foreground p-4 rounded-xl flex-1">
          <div className="flex items-center justify-between">
            <div>Publication Report</div>
            <div>
              <p>5 / 10</p>
              <p>Total Published</p>
            </div>
          </div>
          <div className="flex-1 bg-zinc-800"></div>
        </div>
        {/* <div>
          <div className="bg-zinc-900 p-4 rounded-xl ">Blogs by Category</div>
          <div className="space-y-2 pt-2">
            {categories.map((item, index) => (
              <div key={index} className="flex items-center justify-between gap-2 p-2 bg-zinc-800 rounded-xl">
                <span>{item.title}</span>
                <span>{item.quantity}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </main>
  );
}
