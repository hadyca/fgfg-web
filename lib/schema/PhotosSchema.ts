import { z } from "zod";

const PhotosSchema = z.object({
  fileUrlOrder: z.number(),
  fileUrl: z.string(),
});

export default PhotosSchema;
