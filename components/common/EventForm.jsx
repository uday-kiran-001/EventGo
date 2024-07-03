'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { EventFormSchema } from "@/app/auth/validation";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox";
import { uploadImage } from "@/lib/actions/upload.actions";
import { createEvent } from "@/lib/actions/event.actions";
import { useRouter } from "next/navigation";
import { handleError } from "@/lib/utils";

const EventForm = () => {
  const [image, setImage] = useState(null);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(EventFormSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      startDateTime: new Date(),
      endDateTime: new Date(),
      categoryId: '',
      price: '0',
      isFree: false,
    },
  });

  const onSubmit = async (values) => {
    console.log("Values: ", values);
  
    if (!image) {
      console.error("No image selected");
      return;
    }
  
    const fileData = new FormData();
    fileData.append('image', image);
  
    try{
      const uploadResult = await uploadImage(fileData);
      // console.log("Upload Result: ",uploadResult);

      const eventData = {...values, imageURL: uploadResult.fileLocation};
      // console.log("EventData: ", eventData);

      const newEvent = await createEvent({eventData: eventData, path:"/"});
      // console.log("NewEvent: ",newEvent);

      if(newEvent) {
        form.reset();
        router.push(`/events/${newEvent.id}`);
      }
    }catch(error){
      handleError(error);
    }
  };
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Event title" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Input
                    id="image"
                    type="file"
                    onChange={(event) => (setImage(event.target.files?.[0]))}
                    alt="Event image"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/location.png"
                      alt="calendar"
                      width={24}
                      height={24}
                    />
                    <Input placeholder="Event location or Online" {...field} className="input-field" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.png"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="dd/MM/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.png"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="dd/MM/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/rupee.png"
                      alt="dollar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Free Ticket
                              </label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree"
                                className="mr-2 h-5 w-5 border-2 border-primary-500"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EventForm;
