import Link from "next/link";
import { LEFTHAND_COLUMN_SIZE } from "lib/constants";

export const Header = () => {
  return (
    <div className="border-brand border-solid border-t-4 mb-8 sticky top-0 z-10">
      <div className="max-w-prose mx-auto">
        <Link href="/">
          <div
            className="inline-block bg-brand text-white font-black rounded-b-lg px-3 py-2 text-center cursor-pointer"
            style={{ width: LEFTHAND_COLUMN_SIZE }}
          >
            arcana.computer
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
