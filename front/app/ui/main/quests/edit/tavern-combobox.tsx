import { useState, Fragment, useEffect, Dispatch } from 'react';
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { TavernSelect } from '@/app/types/TavernSelect';
import { fetchTavernsList } from '@/app/api-actions/taverns';
  
export default function TavernCombobox({tavern, setTavern}: {tavern: TavernSelect, setTavern: Dispatch<TavernSelect>}) {
    const [selected, setSelected] = useState<TavernSelect>(tavern);
    const [taverns, setTaverns] = useState<TavernSelect[]>([]);
    const [query, setQuery] = useState('');

    const load = async (signal: AbortSignal) => {
        const hydra = await fetchTavernsList(signal);
        if(!hydra)
            return;

        const member = hydra?.["hydra:member"] ?? [];
        if(!member)
          return;

        setTaverns(member);

        let found = member.find(obj => {return obj["@id"] === tavern["@id"]});
        if(found) {
            setSelected(found);
        }

    };

    const controller = new AbortController();
    const signal = controller.signal;

    let once = false;
    useEffect(() => {
        if(once)
            return;

        load(signal);
        
        once = true;
    }, []);

    const filteredTavern=
        query === ''
        ? taverns
        : taverns.filter((obj) => {
        return obj.name.toLowerCase().includes(query.toLowerCase());
    });

    function onChange(value: any) {
        setSelected(value);
        setTavern(value);
    }

    return (
        <div className="flex justify-center items-center">
            <Combobox value={selected} onChange={onChange}>
            <div className="relative">
                <Combobox.Input
                    className="w-full h-full border-none py-1 text-lg text-start focus:ring-0 rounded-md placeholder:text-gray-500"
                    displayValue={(game: TavernSelect) => game?.name}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder='Select Tavern'
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                    />
                </Combobox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {filteredTavern.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                        Nothing found.
                    </div>
                    ) : (
                        filteredTavern.map((tavern) => (
                        <Combobox.Option
                        key={tavern.id}
                        className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-blue-600 text-white' : 'text-gray-900'
                            }`
                        }
                        value={tavern}
                        >
                        {({ selected, active }) => (
                            <>
                            <span
                                className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                                {tavern.name}
                            </span>
                            {selected ? (
                                <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-blue-600'
                                }`}
                                >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                            ) : null}
                            </>
                        )}
                        </Combobox.Option>
                    ))
                    )}
                </Combobox.Options>
                </Transition>
            </div>
            </Combobox>
        </div>
    );
}