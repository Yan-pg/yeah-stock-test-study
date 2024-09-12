interface TabItemProps {
  id: string;
  title: string;
}

interface TabProps {
  tabs: TabItemProps[];
  active: string;
  onChange: (id: string) => void;
}

export function Tab({ tabs, active, onChange }: TabProps) {
  return (
    <div className="flex items-center gap-7">
      {tabs.map((tab) => (
        <button
          data-state={active === tab.id ? "active" : "inactive"}
          key={tab.id}
          className="text-gray-primary data-[state=active]:text-blue-dark data-[state=active]:border-b-2 data-[state=active]:border-blue-dark"
          onClick={onChange.bind(null, tab.id)}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
}
