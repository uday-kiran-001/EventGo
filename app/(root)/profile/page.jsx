
import EventGallery from '@/components/common/EventGallery';
import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link';
import { getAllEvents } from '@/lib/actions/event.actions';
import { verifySession } from '@/app/auth/stateless-session';

const page = async ({searchParams}) => {

    const { isAuth, user_id } = await verifySession();

    const page = (searchParams?.page) || 1;
    const pageLimit = 6;

    const {allEvents, totalPages} = await getAllEvents({user_id, page, pageLimit});
    
    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
                <Button asChild size="lg" className="button hidden sm:flex">
                    <Link href="/events/create">
                    Create New Event
                    </Link>
                </Button>
                </div>
            </section>

            <section className="wrapper my-8">
                <EventGallery 
                    data={allEvents}
                    emptyTitle="No events have been created yet"
                    emptyStateSubtext="Go create some now"
                    collectionType="Events_Organized"
                    limit={pageLimit}
                    page={page}
                    urlParamName="eventsPage"
                    totalPages={totalPages}
                />
            </section>
        </>
    )
}

export default page