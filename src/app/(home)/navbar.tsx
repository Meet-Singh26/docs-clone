import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "./search-input";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { ThemeSwitcher } from "@/components/theme-switcher";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image src={"/logo.svg"} alt="Logo" width={36} height={36} />
        </Link>
        <h3 className="text-xl hidden sm:block">NexDocs</h3>
      </div>
      <div className="hidden md:flex flex-1">
        <SearchInput />
      </div>
      <div className="flex gap-3 items-center pl-6">
        <ThemeSwitcher />
        <div className="hidden sm:block">
          <OrganizationSwitcher
            afterCreateOrganizationUrl="/"
            afterLeaveOrganizationUrl="/"
            afterSelectOrganizationUrl="/"
            afterSelectPersonalUrl="/"
          />
        </div>
        <UserButton />
      </div>
    </nav>
  );
};
