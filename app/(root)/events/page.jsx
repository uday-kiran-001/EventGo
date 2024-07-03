import CategoryFilter from "@/components/common/CategoryFilter";
import EventGallery from "@/components/common/EventGallery";
import SearchBar from "@/components/common/SearchBar";
import { getAllEvents } from "@/lib/actions/event.actions";

const Events = async ({searchParams}) => {

  const page = (searchParams?.page) || 1;
  const searchQuery = (searchParams?.query)?.toString() || '';
  const category = (searchParams?.category)?.toString() || '';
  const pageLimit = 9;
  
  const {allEvents, totalPages} = await getAllEvents({
    searchQuery,
    category,
    page,
    pageLimit,
  });

  return (
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
  );
}

export default Events;