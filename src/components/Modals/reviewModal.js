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

export default function ReviewModal({ edit, review, movies }) {
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
      const { data: updateReview, error } = await supabase
        .from("Reviews")
        .update({
          reviewer_name: data.reviewer_name,
          review_comment: data.review_comment,
          rating: data.rating,
        })
        .eq("id", review.id)
        .select();
      if (!error) {
        window.location.reload();
      } else {
        console.log(error);
      }
    } else {
      const { data: newReview, error } = await supabase
        .from("Reviews")
        .insert([{ ...data, movie_id: data.movie_id }])
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
            Add new review
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            {edit ? "Edit review" : "Add new review"}
          </DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {movies && (
            <select
              id="movie_id"
              name="movie_id"
              placeholder="Select a movie"
              {...register("movie_id", { required: true })}
              className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-violet-600 sm:text-sm sm:leading-6"
            >
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.name}
                </option>
              ))}
            </select>
          )}
          <input
            type="text"
            placeholder="Your Name"
            defaultValue={review?.reviewer_name}
            name="reviewer_name"
            id="reviewer_name"
            onClick={(event) => event.stopPropagation()}
            {...register("reviewer_name", {
              required: {
                value: true,
                message: "Your Name is required!",
              },
            })}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-400 sm:text-sm sm:leading-6"
          />
          <input
            type="number"
            placeholder="Rating out of 10"
            defaultValue={review?.rating}
            name="rating"
            id="rating"
            onClick={(event) => event.stopPropagation()}
            {...register("rating", {
              required: {
                value: true,
                message: "Rating is required!",
              },
            })}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-400 sm:text-sm sm:leading-6"
          />
          <textarea
            placeholder="Review Comments"
            defaultValue={review?.review_comment}
            name="review_comment"
            id="review_comment"
            onClick={(event) => event.stopPropagation()}
            {...register("review_comment", {
              required: {
                value: true,
                message: "Review Comments is required!",
              },
            })}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-400 sm:text-sm sm:leading-6"
          />
          <button
            type="submit"
            className="border-2 rounded-sm px-3 py-1 bg-indigo-500 text-white border-indigo-500 self-end"
          >
            {edit ? "Edit Review" : "Add Review"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
