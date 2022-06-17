import Link from "next/link";

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
        href: "/catalog/project-ideas",
        status: "placeholder",
      },
      {
        title: "Press",
        href: "/catalogs/press",
        status: "placeholder",
      },
      {
        title: "Microblog",
        href: "/catalogs/snippets",
        status: "placeholder",
      },
      {
        title: "Veuve Clicquot",
        href: "/catalogs/veuve",
        status: "placeholder",
      },
      {
        title: "Words",
        href: "/catalogs/words",
        status: "placeholder",
      },
      {
        title: "Years in review",
        href: "/catalogs/years",
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
    title: "Miscellany",
    items: [
      {
        title: "About",
        href: "/about",
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
];

const TableOfContents = () => (
  <div className="grid grid-cols-2 gap-8 my-8">
    {LINKS.map((section) => (
      <div
        key={section.title}
        className="bg-subtle rounded-lg p-3 border border-solid border-gray-400"
      >
        <div className="font-bold">{section.title}</div>
        {section.items.map((item) => (
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
            <Link href={item.href}>{item.title}</Link>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default TableOfContents;
