import { Listbox } from "@headlessui/react";

export type Props = {
  value: string;
  handler: (value: string) => void;
  values: {
    id: string;
    label: string;
    icon: React.ReactNode;
  }[];
};

const Dropdown = ({ value, handler, values }: Props) => {
  return (
    <div className="relative">
      <Listbox value={value} onChange={handler}>
        <Listbox.Button>
          <div className="flex hover:bg-subtler relativeflex items-center space-x-2 capitalize border border-subtler border-solid px-3 py-1 rounded-lg">
            {values.find((m) => m.id === value)?.icon}
            <div className="flex-1 text-center">
              {" "}
              {values.find((m) => m.id === value)?.label}
            </div>
          </div>
        </Listbox.Button>
        <Listbox.Options className="min-w-full max-w-48 absolute mt-2 overflow-auto bg-subtle border border-subtler border-solid px-2 py-1 rounded-lg z-10">
          {values.map((dm) => (
            <Listbox.Option key={dm.id} value={dm.id}>
              <div className="flex items-center space-x-2 capitalize cursor-pointer hover:bg-subtler rounded-lg px-2 whitespace-nowrap">
                <div>{dm.icon}</div>
                <div className="flex-1">{dm.label}</div>
              </div>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default Dropdown;
