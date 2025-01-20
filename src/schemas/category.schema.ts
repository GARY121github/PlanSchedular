import zod from 'zod';

const categorySchema = zod.object({
    name: zod
        .string()
        .min(2, "Name should be atleast 2 characters long")
        .max(100, "Name should be atmost 100 characters long"),
    description: zod
        .string()
        .min(2, "Description should be atleast 2 characters long")
        .max(500, "Description should be atmost 500 characters long")
});

export type Category = zod.infer<typeof categorySchema>;

export default categorySchema;