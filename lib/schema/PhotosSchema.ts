import { z } from "zod";

const PhotosSchema = z.object({ id: z.number(), url: z.string() });

export default PhotosSchema;
