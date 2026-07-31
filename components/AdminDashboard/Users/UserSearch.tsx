import { Search } from "lucide-react";

interface UserSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const UserSearch = ({
  search,
  onSearchChange,
}: UserSearchProps) => {
  return (
    <div className="mb-6">
      <div className="relative max-w-xl">
        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search by name, email, role or status..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
        />
      </div>
    </div>
  );
};

export default UserSearch;