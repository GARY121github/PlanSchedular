import zod from 'zod';

const priorityEnum = zod.enum(["LOW", "MEDIUM", "HIGH"]);

const planSchema = zod.object({
    name : zod
    .string()
    .min(2 , "Name should be atleast 2 characters long")
    .max(100 , "Name should be atmost 100 characters long"),
    description : zod
    .string()
    .max(500 , "Description should be atmost 500 characters long")
    .optional(),
    priority : priorityEnum,
});

export type Plan = zod.infer<typeof planSchema>;
export type Proprity = zod.infer<typeof priorityEnum>;

export default planSchema;