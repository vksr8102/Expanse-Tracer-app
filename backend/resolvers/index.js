import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.reslover.js";
import transactionResolver from "./transaction.resolver.js";

const mergedResolvers = mergeResolvers([userResolver,transactionResolver]);

export default mergedResolvers;