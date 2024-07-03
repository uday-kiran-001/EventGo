
import { decrypt } from "@/app/auth/stateless-session";
import EventForm from "@/components/common/EventForm";

const CreateEvent = async () => {
  // const cookie = cookies().get('session')?.value;
  // const session = await decrypt(cookie);

  // if (!session?.userId) {
  //   redirect('/login');
  // }

  return (
    <>
      <section className="bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <h3 className="wrapper h3-bold text-center sm:text-left">Create</h3>
      </section>

      <div className="wrapper my-8">
          <EventForm />
      </div>
    </>
  )
}

export default CreateEvent
