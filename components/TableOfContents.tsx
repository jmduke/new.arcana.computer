import Link from "next/link";

import Widget from "./Widget";

type Status = "placeholder" | "draft" | "published";

type Link = {
  title: string;
  href: string;
  status: Status;
};

type Section = {
  title: string;
  items: Link[];
};

const LINKS: Section[] = [
  {
    title: "Catalogs",
    items: [
      {
        title: "Books",
        href: "/catalogs/books",
        status: "published",
      },
      {
        title: "Movies",
        href: "/catalogs/movies",
        status: "published",
      },
      {
        title: "Games",
        href: "/catalogs/games",
        status: "published",
      },
      {
        title: "Television",
        href: "/catalogs/television",
        status: "published",
      },
      {
        title: "Investments",
        href: "/catalogs/investments",
        status: "published",
      },
      {
        title: "Music",
        href: "/catalogs/music",
        status: "published",
      },
      {
        title: "Quotes & highlights",
        href: "/catalogs/quotes",
        status: "published",
      },
      {
        title: "Project ideas",
        href: "/catalogs/project-ideas",
        status: "published",
      },
      {
        title: "Press",
        href: "/catalogs/press",
        status: "placeholder",
      },
      {
        title: "Blog",
        href: "/blog",
        status: "published",
      },
      {
        title: "Veuve Clicquot",
        href: "/catalogs/veuve",
        status: "published",
      },
      {
        title: "Words",
        href: "/catalogs/words",
        status: "placeholder",
      },
      {
        title: "Years in review",
        href: "/years",
        status: "placeholder",
      },
    ],
  },
  {
    title: "My projects",
    items: [
      {
        title: "Barback",
        href: "/projects/barback",
        status: "placeholder",
      },
      {
        title: "Buttondown",
        href: "/projects/buttondown",
        status: "placeholder",
      },
      {
        title: "Spoonbill",
        href: "/projects/spoonbill",
        status: "placeholder",
      },
      {
        title: "Floradora",
        href: "/projects/floradora",
        status: "placeholder",
      },
    ],
  },
  {
    title: "Engineering",
    items: [
      {
        title: "Writing and landing pull requests",
        href: "/engineering/pull-requests",
        status: "placeholder",
      },
      {
        title: "Test-ish driven development",
        href: "/engineering/testish-driven-development",
        status: "placeholder",
      },
    ],
  },
  {
    title: "Miscellany",
    items: [
      {
        title: "About this site",
        href: "/about-this-site",
        status: "published",
      },
    ],
  },
  {
    title: "Product",
    items: [
      {
        title: "Customer service",
        href: "/product/customer-service",
        status: "placeholder",
      },
      {
        title: "Choosing an idea",
        href: "/product/choosing-an-idea",
        status: "placeholder",
      },
      {
        title: "Choosing a stack",
        href: "/product/choosing-a-stack",
        status: "placeholder",
      },
    ],
  },
  {
    title: "Industry",
    items: [
      {
        title: "Advice to new grads",
        href: "/industry/advice-to-new-grads",
        status: "published",
      },
      {
        title: "Getting a job",
        href: "/industry/getting-a-job",
        status: "draft",
      },
      {
        title: "Being productive",
        href: "/industry/being-productive",
        status: "draft",
      },
    ],
  },
];

const TableOfContents = () => (
  <div className="grid grid-cols-2 grid-flow-rows-dense gap-4 lg:gap-8 my-4">
    {[
      [0, 2],
      [2, 6],
    ].map(([start, end]) => (
      <div key={start}>
        {LINKS.slice(start, end).map((section) => (
          <Widget
            label={section.title}
            key={section.title}
            items={section.items.map((item) => {
              return {
                left: (
                  <div
                    className={
                      {
                        placeholder: "text-gray-500",
                        published: "underline",
                        draft: "text-gray-500 underline",
                      }[item.status]
                    }
                    key={item.title}
                  >
                    <Link href={item.href}>
                      <a href={item.href}>{item.title}</a>
                    </Link>
                  </div>
                ),
              };
            })}
          />
        ))}
      </div>
    ))}
  </div>
);

export default TableOfContents;
