import { Columns, List } from "@phosphor-icons/react";
import { TypeView } from "../PorductCard";

interface TabItemProps {
  view: TypeView;
  onChange: (view: TypeView) => void;
}

export function TabView({ view, onChange }: TabItemProps) {
  return (
    <div className="h-8 w-15 w-fit p-1 bg-[#242424] border border-black-light rounded-xl flex items-center gap-2">
      <button
        data-state={view}
        className="text-gray-primary  data-[state=column]:text-white data-[state=column]:bg-black-light data-[state=column]:p-1 data-[state=column]:rounded"
        onClick={() => onChange(TypeView.COLUMN)}
      >
        <Columns size={16} />
      </button>
      <button
        data-state={view}
        className="text-gray-primary data-[state=row]:text-white data-[state=row]:bg-black-light data-[state=row]:p-1 data-[state=row]:rounded"
        onClick={() => onChange(TypeView.ROW)}
      >
        <List size={16} />
      </button>
    </div>
  );
}
