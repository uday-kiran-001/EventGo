import CategoryFilter from "@/components/common/CategoryFilter";
import EventGallery from "@/components/common/EventGallery";
import SearchBar from "@/components/common/SearchBar";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import Image from "next/image";
import Link from "next/link";

const Home = async ({searchParams}) => {

  const page = (searchParams?.page) || 1;
  const searchQuery = (searchParams?.query)?.toString() || '';
  const category = (searchParams?.category)?.toString() || '';
  const pageLimit = 6;
  
  const {allEvents, totalPages} = await getAllEvents({
    searchQuery,
    category,
    page,
    pageLimit,
  });

  return (
    <>
      <section className=" bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Creating Moments, Crafting Memories.
            </h1>
            <p className="p-regular-20 md:p-regualr-24 flex flex-col gap-5">
              Experience the future of event planning with our innovative and user-friendly platform.
              <Button size="lg" className="button w-full">
                <Link href="/events">
                  Explore
                </Link>
              </Button>
            </p>
          </div>
          <Image src="/assets/images/home.png" width={1000} height={1000} 
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]" />
        </div>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-89 md:gap-12">
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <SearchBar />
          <CategoryFilter />
        </div>

        <EventGallery 
          data={allEvents}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={pageLimit}
          page={page}
          totalPages={totalPages}
        />
      </section>
    </>

  );
}

export default Home;