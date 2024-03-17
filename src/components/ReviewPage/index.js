"use client";
import ReviewModal from "../Modals/reviewModal";
import { MdDelete } from "react-icons/md";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ReviewPage({ reviews, movieName, averageRating }) {
  const supabase = createClientComponentClient();
  const handleDelete = async (id) => {
    const { error } = await supabase.from("Reviews").delete().eq("id", id);
    if (!error) {
      window.location.reload();
    } else {
      console.log(error);
    }
  };
  return (
    <div className="max-w-[1300px] mx-auto px-10">
      <div className="sm:flex-row flex flex-col justify-between items-center text-5xl font-semibold py-10">
        <h1>{movieName && movieName[0].name}</h1>
        {averageRating > 0 && (
          <p className="text-violet-500">{averageRating}/10</p>
        )}
      </div>
      <div className="flex flex-col gap-8">
        {reviews?.map((review) => (
          <div
            key={review.id}
            className="px-5 py-5 w-full border-2 border-gray-300"
          >
            <div className="flex justify-between pb-10 text-xl items-center">
              <p className="font-medium">{review.review_comment}</p>
              <p className="text-violet-500 font-semibold">
                {review.rating}/10
              </p>
            </div>
            <div className="flex justify-between text-lg items-center">
              <p className="italic">By {review.reviewer_name}</p>
              <div className="flex gap-3 text-lg text-gray-500">
                <ReviewModal edit={true} review={review} />
                <MdDelete onClick={() => handleDelete(review.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
