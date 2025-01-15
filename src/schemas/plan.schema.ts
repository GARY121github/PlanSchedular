import zod from 'zod';

const planSchema = zod.object({});

export type Plan = zod.infer<typeof planSchema>;

export default planSchema;