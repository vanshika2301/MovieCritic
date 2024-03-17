"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FaEdit } from "react-icons/fa";

export default function MovieModal({ edit, movie }) {
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    if (edit) {
      const { data: updateMovie, error } = await supabase
        .from("Movie")
        .update({ name: data.name, release_date: data.release_date })
        .eq("id", movie.id)
        .select();
      if (!error) {
        window.location.reload();
      } else {
        console.log(error);
      }
    } else {
      const { data: newMovie, error } = await supabase
        .from("Movie")
        .insert([{ name: data.name, release_date: data.release_date }])
        .select();
      if (!error) {
        window.location.reload();
      } else {
        console.log(error);
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {edit ? (
          <FaEdit onClick={(event) => event.stopPropagation()} />
        ) : (
          <button className="border-2 border-indigo-300 text-indigo-500 rounded-sm px-3 py-1 bg-white hover:bg-indigo-500 hover:text-white hover:border-indigo-500">
            Add new movie
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            {edit ? "Edit movie" : "Add new movie"}
          </DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            defaultValue={movie?.name}
            name="name"
            id="name"
            onClick={(event) => event.stopPropagation()}
            {...register("name", {
              required: {
                value: true,
                message: "Name is required!",
              },
            })}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-400 sm:text-sm sm:leading-6"
          />
          <input
            type="date"
            placeholder="Release Date"
            defaultValue={movie?.release_date}
            name="release_date"
            id="release_date"
            onClick={(event) => event.stopPropagation()}
            {...register("release_date", {
              required: {
                value: true,
                message: "Release Date is required!",
              },
            })}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-400 sm:text-sm sm:leading-6"
          />
          <button
            type="submit"
            className="border-2 rounded-sm px-3 py-1 bg-indigo-500 text-white border-indigo-500 self-end"
          >
            {edit ? "Edit Movie" : "Create Movie"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
