
import { formatDateTime } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { cookies } from 'next/headers'
import { decrypt } from '@/app/auth/stateless-session'
import DeleteEvent from './DeleteEvent'


const Card = async ({ event, hasOrderLink, hidePrice }) => {

    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);
    
    let userId = "";
    if (session?.userId) {
        userId = session.userId;
    }

    const isEventCreator = userId === event.organizer_id.toString();

    return (
        <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
        <Link 
            href={`/events/${event.id}`}
            style={{backgroundImage: `url(${event.image_url})`}}
            className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
        />

        {isEventCreator && !hidePrice && (
            <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
                <DeleteEvent eventId={event.id}/>
            </div>
        )}

        <div
            className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
        > 
        {!hidePrice && <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
                {event.is_free ? 'FREE' : `$${event.price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
                {event.category_name}
            </p>
            </div>}

            <p className="p-medium-16 p-medium-18 text-grey-500">
                {formatDateTime(event.start_date_time).dateTime}
            </p>

            <Link href={`/events/${event.id}`}>
                <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{event.title}</p>
            </Link>

            <div className="flex-between w-full">
                <p className="p-medium-14 md:p-medium-16 text-grey-600">
                    {event.organizer_name}
                </p>

                {hasOrderLink && (
                    <Link href={`/orders?eventId=${event.id}`} className="flex gap-2">
                        <p className="text-primary-500">Order Details</p>
                        <Image src="/assets/icons/arrow.svg" alt="search" width={10} height={10} />
                    </Link>
                )}
            </div>
        </div>
        </div>
    )
}

export default Card