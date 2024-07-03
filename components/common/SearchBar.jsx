'use client'

import Image from "next/image";
import { useEffect, useState } from "react"
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";


const SearchBar = ({placeholder}) => {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const delayDebounce = setTimeout(()=>{
            let newURL = '';
            if(query){
                newURL = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'query',
                    value: query
                })
            }else{
                newURL = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['query']
                })
            }
            router.push(newURL, {scroll: false});
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [query, searchParams, router]);

    return (
        <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-gray-50">
            <Image src="/assets/icons/search.png" alt="search" width={24} height={24} />
            <Input 
                type="text"
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
                className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
        </div>
    )
}

export default SearchBar