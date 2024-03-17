import MovieModal from "../Modals/movieModal";
import ReviewModal from "../Modals/reviewModal";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
export default async function Navbar() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: movies } = await supabase.from("Movie").select("*");
  return (
    <div className="px-8 py-4 bg-gray-200">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center">
        <a className="tracking-wide font-medium" href="/">MOVIERITIC</a>
        <div className="flex gap-3">
          <MovieModal />
          <ReviewModal movies={movies} />
        </div>
      </div>
    </div>
  );
}
