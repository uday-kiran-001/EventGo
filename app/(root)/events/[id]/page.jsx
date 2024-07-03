

import TickectButton from "@/components/common/TickectButton";
import { getEventById } from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";

const EventDetails = async ({ params: { id }, searchParams }) => {


  // const router = useRouter();
  // console.log(router.query.id);
  console.log("event_id: ",id);
  const details = await getEventById(id);
  console.log("details: ",details);

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image 
            src={details.image_url}
            alt="event image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className='h2-bold'>{details.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {details.is_free ? 'FREE' : `$${details.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {details.category_name}
                  </p>
                </div>

                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{' '}
                  <span className="text-primary-500">{details.organizer_name}</span>
                </p>
              </div>
            </div>

            <TickectButton />

            <div className="flex flex-col gap-5">
              <div className='flex gap-2 md:gap-3'>
                <Image src="/assets/icons/calendar.png" alt="calendar" width={32} height={32} />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                  <p>
                    {formatDateTime(details.start_date_time).dateOnly} - {' '}
                    {formatDateTime(details.start_date_time).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(details.end_date_time).dateOnly} -  {' '}
                    {formatDateTime(details.end_date_time).timeOnly}
                  </p>
                </div>
              </div>

              <div className="p-regular-20 flex items-center gap-3">
                <Image src="/assets/icons/location.png" alt="location" width={32} height={32} />
                <p className="p-medium-16 lg:p-regular-20">{details.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">More:</p>
              <p className="p-medium-16 lg:p-regular-18">{details.description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default EventDetails