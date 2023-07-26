import db from "../../utils/db.server";

export const getAllTestimonials = async () => {
  return db.testimonial.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
    include: {
      media: true,
    },
  });
};

export const getTestimonialById = async (testimonialId: string) => {
  return db.testimonial.findUnique({
    where: {
      id: parseInt(testimonialId),
    },
    include: {
      media: true,
    },
  });
};
