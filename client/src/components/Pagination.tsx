import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

type Props = {
  page: number;
  pages: number;
  changePage: Function;
};

const Pagination = ({ page, pages, changePage }: Props) => {
  let middlePagination;

  if (pages <= 2) {
    middlePagination = [...Array(pages)].map((_, idx) => (
      <button
        className="w-10 h-10 text-sm font-bold flex justify-center items-center p-1.5 border border-custom-600 rounded-md disabled:bg-custom-800 disabled:text-custom-50 disabled:cursor-not-allowed"
        key={idx + 1}
        onClick={() => changePage(idx + 1)}
        disabled={page === idx + 1}
      >
        {idx + 1}
      </button>
    ));
  } else {
    const startValue = Math.floor((page - 1) / 2) * 2;

    middlePagination = (
      <>
        {[...Array(2)].map((_, idx) => (
          <button
            className="w-10 h-10 text-sm font-bold flex justify-center items-center p-1.5 border border-custom-600 rounded-md disabled:bg-custom-800 disabled:text-custom-50 disabled:cursor-not-allowed"
            key={startValue + idx + 1}
            disabled={page === startValue + idx + 1}
            onClick={() => changePage(startValue + idx + 1)}
          >
            {startValue + idx + 1}
          </button>
        ))}

        <button className="w-10 h-10 text-sm font-bold flex justify-center items-center p-1.5 border border-custom-600 rounded-md disabled:bg-custom-800 disabled:text-custom-50 disabled:cursor-not-allowed">
          ...
        </button>
        <button
          className="w-10 h-10 text-sm font-bold flex justify-center items-center p-1.5 border border-custom-600 rounded-md disabled:bg-custom-800 disabled:text-custom-50 disabled:cursor-not-allowed"
          onClick={() => changePage(pages)}
        >
          {pages}
        </button>
      </>
    );

    if (page > 2) {
      if (pages - page >= 2) {
        middlePagination = (
          <>
            <button
              className="w-10 h-10 text-sm font-bold flex justify-center items-center p-1.5 border border-custom-600 rounded-md disabled:bg-custom-800 disabled:text-custom-50 disabled:cursor-not-allowed"
              onClick={() => changePage(1)}
            >
              1
            </button>
            <button className="w-10 h-10 text-sm font-bold flex justify-center items-center p-1.5 border border-custom-600 rounded-md disabled:bg-custom-800 disabled:text-custom-50 disabled:cursor-not-allowed">
              ...
            </button>
            <button
              className="w-10 h-10 text-sm font-bold flex justify-center items-center p-1.5 border border-custom-600 rounded-md disabled:bg-custom-800 disabled:text-custom-50 disabled:cursor-not-allowed"
              onClick={() => changePage(startValue)}
            >
              {startValue}
            </button>
            {[...Array(2)].map((_, idx) => (
              <button
                className="w-10 h-10 text-sm font-bold flex justify-center items-center p-1.5 border border-custom-600 rounded-md disabled:bg-custom-800 disabled:text-custom-50 disabled:cursor-not-allowed"
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                onClick={() => changePage(startValue + idx + 1)}
              >
                {startValue + idx + 1}
              </button>
            ))}

            <button className="w-10 h-10 text-sm font-bold flex justify-center items-center p-1.5 border border-custom-600 rounded-md disabled:bg-custom-800 disabled:text-custom-50 disabled:cursor-not-allowed">
              ...
            </button>
            <button
              className="w-10 h-10 text-sm font-bold flex justify-center items-center p-1.5 border border-custom-600 rounded-md disabled:bg-custom-800 disabled:text-custom-50 disabled:cursor-not-allowed"
              onClick={() => changePage(pages)}
            >
              {pages}
            </button>
          </>
        );
      } else {
        let amountLeft = pages - page + 2;
        middlePagination = (
          <>
            <button
              className="w-10 h-10 text-sm font-bold flex justify-center items-center p-1.5 border border-custom-600 rounded-md disabled:bg-custom-800 disabled:text-custom-50 disabled:cursor-not-allowed"
              onClick={() => changePage(1)}
            >
              1
            </button>
            <button className="w-10 h-10 text-sm font-bold flex justify-center items-center p-1.5 border border-custom-600 rounded-md disabled:bg-custom-800 disabled:text-custom-50 disabled:cursor-not-allowed">
              ...
            </button>
            <button
              className="w-10 h-10 text-sm font-bold flex justify-center items-center p-1.5 border border-custom-600 rounded-md disabled:bg-custom-800 disabled:text-custom-50 disabled:cursor-not-allowed"
              onClick={() => changePage(startValue)}
            >
              {startValue}
            </button>
            {[...Array(amountLeft)].map((_, idx) => (
              <button
                className={`${
                  pages < startValue + idx + 1 ? "hidden" : ""
                } w-10 h-10 text-sm font-bold flex justify-center items-center p-1.5 border border-custom-600 rounded-md disabled:bg-custom-800 disabled:text-custom-50 disabled:cursor-not-allowed`}
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                onClick={() => changePage(startValue + idx + 1)}
              >
                {startValue + idx + 1}
              </button>
            ))}
          </>
        );
      }
    }
  }

  return (
    pages > 1 && (
      <>
        <div className="mx-2 flex justify-center items-center gap-2">
          <button
            className="w-10 h-10 text-sm font-bold flex justify-center items-center p-1.5 border border-custom-600 rounded-md disabled:bg-custom-800 disabled:text-custom-50 disabled:cursor-not-allowed"
            onClick={() => changePage((page: number) => page - 1)}
            disabled={page === 1}
          >
            <BiLeftArrow />
          </button>
          {middlePagination}
          <button
            className="w-10 h-10 text-sm font-bold flex justify-center items-center p-1.5 border border-custom-600 rounded-md disabled:bg-custom-800 disabled:text-custom-50 disabled:cursor-not-allowed"
            onClick={() => changePage((page: number) => page + 1)}
            disabled={page === pages}
          >
            <BiRightArrow />
          </button>
        </div>
      </>
    )
  );
};

export default Pagination;
