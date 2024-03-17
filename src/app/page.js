import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import HomePage from "@/components/HomePage";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: movies } = await supabase.from("Movie").select("*");
  for (const movie of movies) {
    const { data: rating } = await supabase
      .from("Reviews")
      .select("rating")
      .eq("movie_id", movie.id);

    const ratingArray = rating?.map((obj) => obj.rating);
    const averageRating = (
      ratingArray?.reduce((a, b) => a + b, 0) / ratingArray?.length
    ).toFixed(1);
    movie.averageRating = averageRating;
  }
  return (
    <>
      <HomePage movies={movies} />
    </>
  );
}
