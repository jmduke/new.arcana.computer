import { LEFTHAND_COLUMN_SIZE } from "lib/constants";
import Link from "next/link";

type Breadcrumb = {
  text: string;
  href: string;
};

const BreadcrumbLink = ({ breadcrumb, children }) => (
  <Link href={breadcrumb.href}>
    <div className="block bg-subtler text-sm text-white px-3 py-2 text-center rounded-lg mt-2">
      {breadcrumb.text}
      {children}
    </div>
  </Link>
);

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => (
  <BreadcrumbLink breadcrumb={breadcrumbs[0]}>
    {breadcrumbs.length > 1 && (
      <Breadcrumbs breadcrumbs={breadcrumbs.slice(1)} />
    )}
  </BreadcrumbLink>
);

export const Header = ({ breadcrumbs }) => {
  return (
    <div className="border-brand border-solid border-t-4 mb-8 sticky -top-20 z-10 hover:top-0 transition-all">
      <div className="max-w-scaffold mx-4 md:mx-auto">
        <Link href="/">
          <a href="/">
            <div
              className="inline-block bg-brand text-white font-black rounded-b-lg px-3 py-2 text-center cursor-pointer"
              style={{ width: LEFTHAND_COLUMN_SIZE }}
            >
              arcana.computer
              {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
