import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ReviewPage from "@/components/ReviewPage";

export default async function Page({ params }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: movieName } = await supabase
    .from("Movie")
    .select("name")
    .eq("id", params.id);
  const { data: reviews } = await supabase
    .from("Reviews")
    .select("*")
    .eq("movie_id", params.id);

  const { data: rating } = await supabase
    .from("Reviews")
    .select("rating")
    .eq("movie_id", params.id);
  
  const ratingArray = rating?.map((obj) => obj.rating);  
  const averageRating = (ratingArray?.reduce((a, b) => a + b, 0)/ratingArray?.length).toFixed(1);

  return (
    <>
      <ReviewPage reviews={reviews} movieName={movieName} averageRating={averageRating} />
    </>
  );
}
