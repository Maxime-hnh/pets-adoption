import { Prisma } from '@prisma/client';

// On utilise un type générique pour éviter les erreurs de typage
export const softDeleteExtension = Prisma.defineExtension((client: any) => {
  return client.$extends({
    query: {
      animal: {
        delete: async ({ args, query }) => {
          return query.update({
            where: args.where,
            data: { deletedAt: new Date() }
          });
        }
      }
    }
  });
});
