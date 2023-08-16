import { useDebounce } from "usehooks-ts";
import {
  useGetAllTestimonialQuery,
  useGetTestimonialsByQuotedByQuery,
} from "../../redux/api/testimonialApi";
import Spinner from "../Spinner";
import { APIErrorResponse, Testimonial } from "../../redux/api/types";
import TestimonialCard from "./TestimonialCard";
import { useState } from "react";
import Pagination from "../Pagination";

type Props = {
  searchQuery: string;
};

const DisplayAllTestimonial = ({ searchQuery }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [searchPage, setSearchPage] = useState<number>(1);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    data: testimonialResult,
    isLoading: isTestimonialLoading,
    isFetching: isTestimonialFetching,
    error: testimonialError,
    isError: isTestimonialError,
  } = useGetAllTestimonialQuery(page);

  const {
    data: testimonialByQuotedByResult,
    isLoading: isTestimonialByQuotedByLoading,
    isFetching: isTestimonialByQuotedByFetching,
    error: testimonialByQuotedByError,
    isError: isTestimonialByQuotedByError,
  } = useGetTestimonialsByQuotedByQuery(
    { quotedBy: debouncedSearchQuery, page: searchPage },
    {
      skip: debouncedSearchQuery === "",
    }
  );

  if (isTestimonialError || isTestimonialByQuotedByError) {
    return (
      <div className="flex justify-center items-center bg-red-100 py-2">
        <span className="text-red-500 font-bold">
          {(
            (testimonialError as APIErrorResponse) ||
            (testimonialByQuotedByError as APIErrorResponse)
          ).data.message || "Please enter valid search term"}
        </span>
      </div>
    );
  }

  return (
    <>
      {isTestimonialLoading ||
      isTestimonialFetching ||
      isTestimonialByQuotedByLoading ||
      isTestimonialByQuotedByFetching ? (
        <Spinner />
      ) : (
        <>
          <Pagination
            page={
              testimonialByQuotedByResult !== undefined && searchQuery !== ""
                ? searchPage
                : page
            }
            pages={
              testimonialByQuotedByResult !== undefined && searchQuery !== ""
                ? testimonialByQuotedByResult!.pages
                : testimonialResult!.pages
            }
            changePage={
              testimonialByQuotedByResult !== undefined && searchQuery !== ""
                ? setSearchPage
                : setPage
            }
          />
          <div className="flex flex-wrap justify-center md:justify-start p-2 gap-2">
            {testimonialByQuotedByResult !== undefined && searchQuery !== ""
              ? testimonialByQuotedByResult.testimonials.map(
                  (testimonial: Testimonial) => (
                    <TestimonialCard
                      key={testimonial.id}
                      testimonial={testimonial}
                    />
                  )
                )
              : testimonialResult?.testimonials.map(
                  (testimonial: Testimonial) => (
                    <TestimonialCard
                      key={testimonial.id}
                      testimonial={testimonial}
                    />
                  )
                )}
          </div>
        </>
      )}
    </>
  );
};

export default DisplayAllTestimonial;
