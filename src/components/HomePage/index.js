"use client";
import { formatDate } from "@/lib/utils";
import { MdDelete } from "react-icons/md";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import MovieModal from "../Modals/movieModal";
import { useState } from "react";

export default function HomePage({ movies }) {
  const [name, setName] = useState("");
  const [moviesData, setMoviesData] = useState(movies);
  const supabase = createClientComponentClient();
  const handleDelete = async (id) => {
    const { error } = await supabase.from("Movie").delete().eq("id", id);
    if (!error) {
      window.location.reload();
    } else {
      console.log(error);
    }
  };

  const handleSearch = async (name) => {
    const { data } = await supabase
      .from("Movie")
      .select("*")
      .ilike("name", `%${name}%`);
    if (data) {
      setMoviesData(data);
    }
  };

  return (
    <div className="max-w-[1300px] mx-auto px-10 xl:px-0">
      <h1 className="text-3xl font-semibold py-10">
        The best movie reviews site!
      </h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search by Name"
          onChange={(e) =>
            e.target.value ? setName(e.target.value) : setMoviesData(movies)
          }
          name="name"
          id="name"
          className="block w-64 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-400 sm:text-sm sm:leading-6"
        />
        <button
          className="bg-violet-500 text-white px-5 py-2 rounded-sm"
          onClick={() => handleSearch(name)}
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap gap-8 pt-10">
        {moviesData?.map((movie) => (
          <div
            key={movie.id}
            className="bg-violet-200 px-5 py-5 xl:w-[400px] lg:w-[300px] w-full cursor-pointer"
            onClick={() => (window.location.href = `/${movie.id}`)}
          >
            <h2 className="text-2xl font-medium py-5">{movie.name}</h2>
            <p>Released: {formatDate(movie.release_date)}</p>
            <p className="py-5 font-semibold text-base">
              Rating: {movie.averageRating > 0 ? movie.averageRating : "0"}/10
            </p>
            <div className="justify-end flex gap-3 text-lg text-gray-500">
              <MovieModal edit={true} movie={movie} />
              <MdDelete onClick={() => handleDelete(movie.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
